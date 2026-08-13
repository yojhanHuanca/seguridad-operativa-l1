export interface CreateUserDto {
    codigo_usuario: string;
    nombre: string;
    correo: string;
    password: string;

    cargo?: string;
    telefono?: string;

    id_area: number;
    id_rol: number;
}

export interface UpdateUserDto {
    nombre?: string;
    correo?: string;
    cargo?: string;
    telefono?: string;
    id_area?: number;
    id_rol?: number;
    estado?: string;
    /** Opcional: si viene, se resetea la contraseña. En blanco = se conserva la actual. */
    password?: string;
}

