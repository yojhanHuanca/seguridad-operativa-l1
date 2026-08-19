export interface CreateUserDto {
    nombre: string;
    correo: string;
    password: string;

    cargo?: string;
    telefono?: string;

    id_area: number;
    id_rol: number;
    /** Permiso extra dentro de su rol (ej. el RSO de Seguridad Operativa). */
    es_responsable?: boolean;
}

export interface UpdateUserDto {
    nombre?: string;
    correo?: string;
    cargo?: string;
    telefono?: string;
    id_area?: number;
    id_rol?: number;
    estado?: string;
    es_responsable?: boolean;
    /** Opcional: si viene, se resetea la contraseña. En blanco = se conserva la actual. */
    password?: string;
}

