import { AuthRepository } from "./auth.repository.js";

export class AuthService {
    static async home(){
        await AuthRepository.healthCheck();

        return {
            endpoints: [
                "/login",
                "/register",
                "/logout",
                "/refresh-token",
    
            ],
            database: "Connected",
        };
    }
}

