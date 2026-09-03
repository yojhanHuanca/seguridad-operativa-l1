import type { Request, Response } from "express";
import { ZodError } from "zod";
import { CaseService, PlanAjenoError } from "./case.service.js";
import { TransicionInvalidaError } from "./case.workflow.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { AuditoriaService } from "../auditoria/auditoria.service.js";

function handleError(res: Response, error: unknown, fallback: string) {
  if (error instanceof ZodError) {
    return res.status(400).json(ApiResponse.error("Datos inválidos", error.flatten().fieldErrors));
  }
  // 409: la acción es válida, pero el caso no está en la etapa que la admite.
  if (error instanceof TransicionInvalidaError) {
    return res.status(409).json(ApiResponse.error(error.message));
  }
  // 403: el plan existe, pero es de otra área.
  if (error instanceof PlanAjenoError) {
    return res.status(403).json(ApiResponse.error(error.message));
  }
  return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : fallback, error));
}

/**
 * Deja el rastro de una acción sobre un caso o un plan de acción. Va acá y
 * no en `CaseService` porque ese archivo ya demostró ser el que más se
 * revierte en esta rama — mientras tanto, un cambio en el controlador no se
 * pierde si vuelve a pasar. `id_registro` es opcional: no todas las
 * respuestas exponen el id numérico (algunas solo el código).
 */
async function auditarCaso(req: Request, tabla: "casos_sop" | "planes_accion", descripcion: string, id_registro?: number) {
  const actor = (req as AuthenticatedRequest).user;
  if (!actor) return;
  await AuditoriaService.registrar({
    tabla,
    ...(id_registro != null ? { id_registro } : {}),
    accion: "editar",
    descripcion,
    usuario: actor.id_usuario,
    ip: req.ip,
    user_agent: req.headers["user-agent"],
  });
}

function param(req: Request, name: string): string {
  const value = req.params[name];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Parámetro de ruta inválido: ${name}`);
  }
  return value;
}

export class CaseController {
  static async getAll(req: Request, res: Response) {
    try {
      const { data, total } = await CaseService.list(req.query as Record<string, string>, (req as AuthenticatedRequest).user);
      const body = ApiResponse.success("Casos obtenidos correctamente", data);
      // `total` solo viene cuando la petición mandó page+limit; si no, la
      // respuesta es idéntica a la de siempre (sin este campo de más).
      return res.json(total !== undefined ? { ...body, meta: { total } } : body);
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los casos", error));
    }
  }

  static async getCounts(req: Request, res: Response) {
    try {
      const counts = await CaseService.counts(req.query as Record<string, string>, (req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Conteos obtenidos correctamente", counts));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los conteos", error));
    }
  }

  static async getPlans(req: Request, res: Response) {
    try {
      const planes = await CaseService.listPlans(req.query as Record<string, string>, (req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Planes obtenidos correctamente", planes));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los planes", error));
    }
  }

  static async getByCodigo(req: Request, res: Response) {
    try {
      const caso = await CaseService.getByCodigo(param(req, "codigo"), (req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Caso obtenido correctamente", caso));
    } catch (error) {
      return res.status(404).json(ApiResponse.error(error instanceof Error ? error.message : "Caso no encontrado", error));
    }
  }

  static async approve(req: Request, res: Response) {
    try {
      const caso = await CaseService.approve(param(req, "codigo"));
      await auditarCaso(req, "casos_sop", `Aprobó el reporte ${caso.codigo_sop}, pasó a Evaluación`, caso.id_caso);
      return res.json(ApiResponse.success("Reporte aprobado, pasó a Evaluación", caso));
    } catch (error) {
      return handleError(res, error, "Error al aprobar el reporte");
    }
  }

  static async addObservation(req: Request, res: Response) {
    try {
      const caso = await CaseService.addObservation(param(req, "codigo"), req.body);
      return res.status(201).json(ApiResponse.success("Observación registrada", caso));
    } catch (error) {
      return handleError(res, error, "Error al registrar la observación");
    }
  }

  static async updateTipo(req: Request, res: Response) {
    try {
      const caso = await CaseService.updateTipo(param(req, "codigo"), req.body, (req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Tipo de reporte actualizado", caso));
    } catch (error) {
      return handleError(res, error, "Error al actualizar el tipo de reporte");
    }
  }

  static async evaluate(req: Request, res: Response) {
    try {
      const caso = await CaseService.evaluate(param(req, "codigo"), req.body);
      await auditarCaso(req, "casos_sop", `Evaluó el caso ${caso.codigo_sop} (riesgo, clasificación)`, caso.id_caso);
      return res.json(ApiResponse.success("Caso evaluado correctamente", caso));
    } catch (error) {
      return handleError(res, error, "Error al evaluar el caso");
    }
  }

  static async reject(req: Request, res: Response) {
    try {
      const caso = await CaseService.reject(param(req, "codigo"), req.body);
      await auditarCaso(req, "casos_sop", `Rechazó el caso ${caso.codigo_sop}`, caso.id_caso);
      return res.json(ApiResponse.success("Caso rechazado", caso));
    } catch (error) {
      return handleError(res, error, "Error al rechazar el caso");
    }
  }

  static async requestInfo(req: Request, res: Response) {
    try {
      const solicitud = await CaseService.requestInfo(param(req, "codigo"), req.body);
      return res.status(201).json(ApiResponse.success("Solicitud de información enviada", solicitud));
    } catch (error) {
      return handleError(res, error, "Error al solicitar información");
    }
  }

  static async respondInfo(req: Request, res: Response) {
    try {
      const solicitud = await CaseService.respondInfo(param(req, "codigo"), param(req, "idSolicitud"), req.body);
      return res.json(ApiResponse.success("Solicitud respondida", solicitud));
    } catch (error) {
      return handleError(res, error, "Error al responder la solicitud");
    }
  }

  static async saveInvestigation(req: Request, res: Response) {
    try {
      const codigo = param(req, "codigo");
      const investigacion = await CaseService.saveInvestigation(codigo, req.body);
      await auditarCaso(req, "casos_sop", `Guardó la investigación del caso ${codigo}`, investigacion.id_caso);
      return res.json(ApiResponse.success("Investigación guardada, caso pasó a Plan de Acción", investigacion));
    } catch (error) {
      return handleError(res, error, "Error al guardar la investigación");
    }
  }

  static async createPlan(req: Request, res: Response) {
    try {
      const plan = await CaseService.createPlan(param(req, "codigo"), req.body);
      return res.status(201).json(ApiResponse.success("Plan de acción creado y enviado", plan));
    } catch (error) {
      return handleError(res, error, "Error al crear el plan de acción");
    }
  }

  static async createPlans(req: Request, res: Response) {
    try {
      const codigo = param(req, "codigo");
      const planes = await CaseService.createPlans(codigo, req.body);
      await auditarCaso(req, "planes_accion", `Creó ${planes.length} plan(es) de acción para el caso ${codigo}`, planes[0]?.id_caso);
      return res.status(201).json(ApiResponse.success("Planes de acción creados y enviados", planes));
    } catch (error) {
      return handleError(res, error, "Error al crear los planes de acción");
    }
  }

  static async close(req: Request, res: Response) {
    try {
      const caso = await CaseService.closeCase(param(req, "codigo"), req.body);
      await auditarCaso(req, "casos_sop", `Cerró el caso ${caso.codigo_sop}`, caso.id_caso);
      return res.json(ApiResponse.success("Caso cerrado correctamente", caso));
    } catch (error) {
      return handleError(res, error, "Error al cerrar el caso");
    }
  }

  static async acceptPlanById(req: Request, res: Response) {
    try {
      const idPlan = param(req, "idPlan");
      const plan = await CaseService.acceptPlanById(idPlan, req.body, (req as AuthenticatedRequest).user);
      await auditarCaso(req, "planes_accion", `Aceptó el plan ${plan.codigo_plan ?? idPlan}, inició la ejecución`, plan.id_plan);
      return res.json(ApiResponse.success("Plan aceptado, la ejecución ha iniciado", plan));
    } catch (error) {
      return handleError(res, error, "Error al aceptar el plan");
    }
  }

  static async completeExecutionByPlan(req: Request, res: Response) {
    try {
      const idPlan = param(req, "idPlan");
      const plan = await CaseService.completeExecutionByPlan(idPlan, req.body, (req as AuthenticatedRequest).user);
      await auditarCaso(req, "planes_accion", `Cerró la ejecución del plan ${plan?.codigo_plan ?? idPlan}`, plan?.id_plan);
      return res.json(ApiResponse.success("Plan completado correctamente", plan));
    } catch (error) {
      return handleError(res, error, "Error al completar el plan");
    }
  }

  static async reviewFinalPlanById(req: Request, res: Response) {
    try {
      const idPlan = param(req, "idPlan");
      const plan = await CaseService.reviewFinalPlanById(idPlan, req.body);
      const decision = (req.body as { decision?: string })?.decision ?? "";
      await auditarCaso(req, "planes_accion", `Revisión final del plan ${plan.codigo_plan ?? idPlan}: ${decision}`, plan.id_plan);
      return res.json(ApiResponse.success("Revisión final del plan registrada", plan));
    } catch (error) {
      return handleError(res, error, "Error al revisar el plan");
    }
  }

  static async requestExtensionByPlan(req: Request, res: Response) {
    try {
      const idPlan = param(req, "idPlan");
      const plan = await CaseService.requestExtensionByPlan(idPlan, req.body, (req as AuthenticatedRequest).user);
      await auditarCaso(req, "planes_accion", `Solicitó ampliación de plazo para el plan ${plan.codigo_plan ?? idPlan}`, plan.id_plan);
      return res.status(201).json(ApiResponse.success("Ampliación de plazo solicitada", plan));
    } catch (error) {
      return handleError(res, error, "Error al solicitar la ampliación");
    }
  }

  static async reviewExtensionByPlan(req: Request, res: Response) {
    try {
      const idPlan = param(req, "idPlan");
      const plan = await CaseService.reviewExtensionByPlan(idPlan, req.body);
      const decision = (req.body as { decision?: string })?.decision ?? "";
      await auditarCaso(req, "planes_accion", `Resolvió la ampliación de plazo del plan ${plan.codigo_plan ?? idPlan}: ${decision}`, plan.id_plan);
      return res.json(ApiResponse.success("Solicitud de ampliación del plan resuelta", plan));
    } catch (error) {
      return handleError(res, error, "Error al resolver la ampliación del plan");
    }
  }

  static async startExecution(req: Request, res: Response) {
    try {
      const caso = await CaseService.startExecution(param(req, "codigo"));
      return res.json(ApiResponse.success("El caso pasó a Ejecución", caso));
    } catch (error) {
      return handleError(res, error, "Error al iniciar la ejecución del caso");
    }
  }

  static async sendToVerification(req: Request, res: Response) {
    try {
      const caso = await CaseService.sendToVerification(param(req, "codigo"));
      return res.json(ApiResponse.success("Expediente enviado a Verificación", caso));
    } catch (error) {
      return handleError(res, error, "Error al enviar el expediente a Verificación");
    }
  }

  static async keepPending(req: Request, res: Response) {
    try {
      const caso = await CaseService.keepPending(param(req, "codigo"), req.body);
      return res.json(ApiResponse.success("Caso mantenido pendiente en Verificación", caso));
    } catch (error) {
      return handleError(res, error, "Error al mantener el caso pendiente");
    }
  }

  static async reopen(req: Request, res: Response) {
    try {
      const caso = await CaseService.reopenCase(param(req, "codigo"), req.body);
      await auditarCaso(req, "casos_sop", `Reabrió el caso ${caso.codigo_sop}`, caso.id_caso);
      return res.json(ApiResponse.success("Caso reabierto", caso));
    } catch (error) {
      return handleError(res, error, "Error al reabrir el caso");
    }
  }

  static async rollbackStage(req: Request, res: Response) {
    try {
      const codigo = param(req, "codigo");
      const caso = await CaseService.rollbackStage(codigo, req.body);
      const motivo = (req.body as { motivo?: string })?.motivo ?? "";
      await auditarCaso(req, "casos_sop", `Retrocedió de etapa el caso ${codigo}: ${motivo}`, caso.id_caso);
      return res.json(ApiResponse.success("Caso retrocedido de etapa", caso));
    } catch (error) {
      return handleError(res, error, "Error al retroceder el caso");
    }
  }

  static async updatePlan(req: Request, res: Response) {
    try {
      const plan = await CaseService.updatePlan(param(req, "idPlan"), req.body);
      return res.json(ApiResponse.success("Plan de acción actualizado", plan));
    } catch (error) {
      return handleError(res, error, "Error al actualizar el plan");
    }
  }

  static async updateActivity(req: Request, res: Response) {
    try {
      const actividad = await CaseService.updateActivity(param(req, "idActividad"), req.body, (req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Actividad actualizada", actividad));
    } catch (error) {
      return handleError(res, error, "Error al actualizar la actividad");
    }
  }

  static async reviewExtension(req: Request, res: Response) {
    try {
      const caso = await CaseService.reviewExtension(param(req, "codigo"), req.body);
      return res.json(ApiResponse.success("Solicitud de ampliación resuelta", caso));
    } catch (error) {
      return handleError(res, error, "Error al resolver la ampliación");
    }
  }

  static async addComment(req: Request, res: Response) {
    try {
      const timeline = await CaseService.addComment(param(req, "codigo"), req.body);
      return res.status(201).json(ApiResponse.success("Comentario agregado", timeline));
    } catch (error) {
      return handleError(res, error, "Error al agregar el comentario");
    }
  }

  static async removePlanEvidence(req: Request, res: Response) {
    try {
      const r = await CaseService.removePlanEvidence(param(req, "idPlan"), param(req, "idAnexo"), req.body, (req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Evidencia eliminada", r));
    } catch (error) {
      return handleError(res, error, "Error al eliminar la evidencia");
    }
  }

  static async addPlanComment(req: Request, res: Response) {
    try {
      const timeline = await CaseService.addPlanComment(param(req, "idPlan"), req.body, (req as AuthenticatedRequest).user);
      return res.status(201).json(ApiResponse.success("Comentario agregado al plan", timeline));
    } catch (error) {
      return handleError(res, error, "Error al agregar el comentario del plan");
    }
  }

  static async addEvidence(req: Request, res: Response) {
    try {
      const files = ((req.files as Express.Multer.File[] | undefined) ?? []).map((f) => ({
        originalname: f.originalname,
        filename: f.filename,
        mimetype: f.mimetype,
        size: f.size,
      }));
      const anexos = await CaseService.addEvidence(param(req, "codigo"), files);
      return res.status(201).json(ApiResponse.success("Evidencia adjuntada correctamente", anexos));
    } catch (error) {
      return handleError(res, error, "Error al adjuntar evidencia");
    }
  }

  static async addPlanUpdate(req: Request, res: Response) {
    try {
      const files = ((req.files as Express.Multer.File[] | undefined) ?? []).map((f) => ({
        originalname: f.originalname,
        filename: f.filename,
        mimetype: f.mimetype,
        size: f.size,
      }));
      const resultado = await CaseService.addPlanUpdate(param(req, "idPlan"), req.body, files, (req as AuthenticatedRequest).user);
      return res.status(201).json(ApiResponse.success("Actualización registrada correctamente", resultado));
    } catch (error) {
      return handleError(res, error, "Error al registrar la actualización del plan");
    }
  }

  static async addEvidenceByPlan(req: Request, res: Response) {
    try {
      const files = ((req.files as Express.Multer.File[] | undefined) ?? []).map((f) => ({
        originalname: f.originalname,
        filename: f.filename,
        mimetype: f.mimetype,
        size: f.size,
      }));
      const anexos = await CaseService.addEvidenceByPlan(param(req, "idPlan"), req.body, files, (req as AuthenticatedRequest).user);
      return res.status(201).json(ApiResponse.success("Evidencia del plan adjuntada correctamente", anexos));
    } catch (error) {
      return handleError(res, error, "Error al adjuntar evidencia del plan");
    }
  }
}

