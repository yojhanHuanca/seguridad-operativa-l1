import type { Request, Response } from "express";

import { ApiResponse } from "../../utils/ApiResponse.js";
import { AuthService } from "./auth.service.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";


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

        const result = await AuthService.login(correo, password, req.ip, req.headers["user-agent"]);

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

  static async loginGoogle(req: Request, res: Response) {
      try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json(
                ApiResponse.error("Falta el token de Google")
            );
        }

        const result = await AuthService.loginWithGoogle(credential, req.ip, req.headers["user-agent"]);

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
               : "No se pudo iniciar sesión con Google",
             error
           )
         );
      }

  }

  static async logout(req: Request, res: Response) {
    try {
      await AuthService.logout((req as AuthenticatedRequest).user?.id_sesion);
      return res.status(200).json(ApiResponse.success("Sesión cerrada correctamente"));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("No se pudo cerrar la sesión", error));
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




