import type { Request, Response } from "express";

import { ApiResponse } from "../../utils/ApiResponse.js";
import { AuthService } from "./auth.service.js";


export class AuthController {
  static async login(req: Request, res: Response) {
      try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json(
                ApiResponse.error(
                    "Correo y contraseña son requeridos"
                )
            );
        }

        const result = await AuthService.login(correo, password);

        return res.status(200).json(
            ApiResponse.success(
                "Inicio de sesión exitoso",
                result
            )
        );

      } catch (error) {

         return res.status(401).json(
           ApiResponse.error(
             error instanceof Error
               ? error.message
               : "Credenciales inválidas",
             error
           )
         );
      }

  }

  static async home(_req: Request, res: Response) {
    try {
      const result = await AuthService.home();
      return res.status(200).json(ApiResponse.success("Auth service status", result));
    } catch (error) {
      return res.status(500).json(
        ApiResponse.error(
          error instanceof Error ? error.message : "Error interno",
          error
        )
      );
    }
  }
}




