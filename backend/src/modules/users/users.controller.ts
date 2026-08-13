import type { Request, Response } from "express";
import { UsersService } from "./users.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export class UsersController {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UsersService.getAllUsers();
      return res.json(ApiResponse.success("Usuarios obtenidos correctamente", users));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los usuarios", error));
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await UsersService.getUserById(id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return res.json(ApiResponse.success("Usuario obtenido correctamente", user));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener el usuario", error));
    }
  }

  static async create(req: Request, res: Response){
    try {

      const user = await UsersService.createUser(req.body);

      return res.status(201).json(ApiResponse.success("Usuario creado correctamente", user));


    } catch (error) {
       return res.status(500).json(ApiResponse.error(error instanceof Error ? error.message : "Error al crear el usuario", error));
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await UsersService.updateUser(id, req.body);
      return res.json(ApiResponse.success("Usuario actualizado correctamente", user));
    } catch (error) {
      return res.status(500).json(ApiResponse.error(error instanceof Error ? error.message : "Error al actualizar el usuario", error));
    }
  }
}
