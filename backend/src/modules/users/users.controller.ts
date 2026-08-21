import type { Request, Response } from "express";
import { ZodError } from "zod";
import { UsersService } from "./users.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";

function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export class UsersController {
  static async getAll(req: Request, res: Response) {
    try {
      const { data, total } = await UsersService.getAllUsers(req.query as Record<string, string>);
      const body = ApiResponse.success("Usuarios obtenidos correctamente", data);
      // `total` solo viene cuando la petición mandó page+limit; si no, la
      // respuesta es idéntica a la de siempre (sin este campo de más).
      return res.json(total !== undefined ? { ...body, meta: { total } } : body);
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los usuarios", error));
    }
  }

  static async getCounts(_req: Request, res: Response) {
    try {
      const counts = await UsersService.getCounts();
      return res.json(ApiResponse.success("Conteos obtenidos correctamente", counts));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los conteos", error));
    }
  }

  static async getBasicos(_req: Request, res: Response) {
    try {
      const users = await UsersService.getBasicUsers();
      return res.json(ApiResponse.success("Usuarios obtenidos correctamente", users));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los usuarios", error));
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const user = await UsersService.getUserById(req.params.id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return res.json(ApiResponse.success("Usuario obtenido correctamente", user));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("ID de usuario inválido", error.flatten().fieldErrors));
      }
      const status = error instanceof Error && error.message === "Usuario no encontrado" ? 404 : 500;
      return res.status(status).json(ApiResponse.error(error instanceof Error ? error.message : "Error al obtener el usuario", error));
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const user = await UsersService.createUser(req.body, (req as AuthenticatedRequest).user, req.ip);
      return res.status(201).json(ApiResponse.success("Usuario creado correctamente", user));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("Datos del usuario inválidos", error.flatten().fieldErrors));
      }
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al crear el usuario", error));
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const user = await UsersService.updateUser(req.params.id, req.body, (req as AuthenticatedRequest).user, req.ip);
      return res.json(ApiResponse.success("Usuario actualizado correctamente", user));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("Datos del usuario inválidos", error.flatten().fieldErrors));
      }
      const status = error instanceof Error && error.message === "Usuario no encontrado" ? 404 : 400;
      return res.status(status).json(ApiResponse.error(error instanceof Error ? error.message : "Error al actualizar el usuario", error));
    }
  }
}
