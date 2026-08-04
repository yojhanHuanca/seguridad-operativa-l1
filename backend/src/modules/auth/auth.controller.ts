import type { Request, Response } from "express";

import { ApiResponse } from "../../utils/ApiResponse.js";
import { AuthService } from "./auth.service.js";


export class AuthController {
  static async home(req: Request, res: Response) {
      const data = await AuthService.home();
  
      return res.json(
          ApiResponse.success(
              "Módulo de autenticación disponible",
              data
          )
      );
  }
}



