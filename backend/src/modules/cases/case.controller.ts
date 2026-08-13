import type { Request, Response } from "express";
import { ZodError } from "zod";
import { CaseService } from "./case.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

function handleError(res: Response, error: unknown, fallback: string) {
  if (error instanceof ZodError) {
    return res.status(400).json(ApiResponse.error("Datos inválidos", error.flatten().fieldErrors));
  }
  return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : fallback, error));
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
      const casos = await CaseService.list(req.query as Record<string, string>);
      return res.json(ApiResponse.success("Casos obtenidos correctamente", casos));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los casos", error));
    }
  }

  static async getPlans(req: Request, res: Response) {
    try {
      const planes = await CaseService.listPlans(req.query as Record<string, string>);
      return res.json(ApiResponse.success("Planes obtenidos correctamente", planes));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los planes", error));
    }
  }

  static async getByCodigo(req: Request, res: Response) {
    try {
      const caso = await CaseService.getByCodigo(param(req, "codigo"));
      return res.json(ApiResponse.success("Caso obtenido correctamente", caso));
    } catch (error) {
      return res.status(404).json(ApiResponse.error(error instanceof Error ? error.message : "Caso no encontrado", error));
    }
  }

  static async approve(req: Request, res: Response) {
    try {
      const caso = await CaseService.approve(param(req, "codigo"));
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
      const caso = await CaseService.updateTipo(param(req, "codigo"), req.body, req.body?.actor);
      return res.json(ApiResponse.success("Tipo de reporte actualizado", caso));
    } catch (error) {
      return handleError(res, error, "Error al actualizar el tipo de reporte");
    }
  }

  static async evaluate(req: Request, res: Response) {
    try {
      const caso = await CaseService.evaluate(param(req, "codigo"), req.body);
      return res.json(ApiResponse.success("Caso evaluado correctamente", caso));
    } catch (error) {
      return handleError(res, error, "Error al evaluar el caso");
    }
  }

  static async reject(req: Request, res: Response) {
    try {
      const caso = await CaseService.reject(param(req, "codigo"), req.body);
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
      const investigacion = await CaseService.saveInvestigation(param(req, "codigo"), req.body);
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
      const planes = await CaseService.createPlans(param(req, "codigo"), req.body);
      return res.status(201).json(ApiResponse.success("Planes de acción creados y enviados", planes));
    } catch (error) {
      return handleError(res, error, "Error al crear los planes de acción");
    }
  }

  static async close(req: Request, res: Response) {
    try {
      const caso = await CaseService.closeCase(param(req, "codigo"), req.body);
      return res.json(ApiResponse.success("Caso cerrado correctamente", caso));
    } catch (error) {
      return handleError(res, error, "Error al cerrar el caso");
    }
  }

  static async acceptPlan(req: Request, res: Response) {
    try {
      const caso = await CaseService.acceptPlan(param(req, "codigo"), req.body);
      return res.json(ApiResponse.success("Plan aceptado, la ejecución ha iniciado", caso));
    } catch (error) {
      return handleError(res, error, "Error al aceptar el plan");
    }
  }


  static async acceptPlanById(req: Request, res: Response) {
    try {
      const plan = await CaseService.acceptPlanById(param(req, "idPlan"), req.body);
      return res.json(ApiResponse.success("Plan aceptado, la ejecución ha iniciado", plan));
    } catch (error) {
      return handleError(res, error, "Error al aceptar el plan");
    }
  }

  static async completeExecutionByPlan(req: Request, res: Response) {
    try {
      const plan = await CaseService.completeExecutionByPlan(param(req, "idPlan"), req.body);
      return res.json(ApiResponse.success("Plan completado correctamente", plan));
    } catch (error) {
      return handleError(res, error, "Error al completar el plan");
    }
  }

  static async reviewFinalPlanById(req: Request, res: Response) {
    try {
      const plan = await CaseService.reviewFinalPlanById(param(req, "idPlan"), req.body);
      return res.json(ApiResponse.success("Revisión final del plan registrada", plan));
    } catch (error) {
      return handleError(res, error, "Error al revisar el plan");
    }
  }

  static async requestExtensionByPlan(req: Request, res: Response) {
    try {
      const plan = await CaseService.requestExtensionByPlan(param(req, "idPlan"), req.body);
      return res.status(201).json(ApiResponse.success("Ampliación de plazo solicitada", plan));
    } catch (error) {
      return handleError(res, error, "Error al solicitar la ampliación");
    }
  }

  static async reviewExtensionByPlan(req: Request, res: Response) {
    try {
      const plan = await CaseService.reviewExtensionByPlan(param(req, "idPlan"), req.body);
      return res.json(ApiResponse.success("Solicitud de ampliación del plan resuelta", plan));
    } catch (error) {
      return handleError(res, error, "Error al resolver la ampliación del plan");
    }
  }

  static async completeExecution(req: Request, res: Response) {
    try {
      const caso = await CaseService.completeExecution(param(req, "codigo"), req.body);
      return res.json(ApiResponse.success("Ejecución completada, el caso pasó a Verificación", caso));
    } catch (error) {
      return handleError(res, error, "Error al completar la ejecución");
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
      return res.json(ApiResponse.success("Caso reabierto", caso));
    } catch (error) {
      return handleError(res, error, "Error al reabrir el caso");
    }
  }

  static async rollbackStage(req: Request, res: Response) {
    try {
      const caso = await CaseService.rollbackStage(param(req, "codigo"), req.body);
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
      const actividad = await CaseService.updateActivity(param(req, "idActividad"), req.body);
      return res.json(ApiResponse.success("Actividad actualizada", actividad));
    } catch (error) {
      return handleError(res, error, "Error al actualizar la actividad");
    }
  }

  static async requestExtension(req: Request, res: Response) {
    try {
      const caso = await CaseService.requestExtension(param(req, "codigo"), req.body);
      return res.status(201).json(ApiResponse.success("Ampliación de plazo solicitada", caso));
    } catch (error) {
      return handleError(res, error, "Error al solicitar la ampliación");
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
      const r = await CaseService.removePlanEvidence(param(req, "idPlan"), param(req, "idAnexo"), req.body);
      return res.json(ApiResponse.success("Evidencia eliminada", r));
    } catch (error) {
      return handleError(res, error, "Error al eliminar la evidencia");
    }
  }

  static async addPlanComment(req: Request, res: Response) {
    try {
      const timeline = await CaseService.addPlanComment(param(req, "idPlan"), req.body);
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
      const resultado = await CaseService.addPlanUpdate(param(req, "idPlan"), req.body, files);
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
      const anexos = await CaseService.addEvidenceByPlan(param(req, "idPlan"), req.body, files);
      return res.status(201).json(ApiResponse.success("Evidencia del plan adjuntada correctamente", anexos));
    } catch (error) {
      return handleError(res, error, "Error al adjuntar evidencia del plan");
    }
  }
}

