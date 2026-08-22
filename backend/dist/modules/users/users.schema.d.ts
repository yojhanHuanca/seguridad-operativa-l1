import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    nombre: z.ZodString;
    correo: z.ZodString;
    password: z.ZodString;
    cargo: z.ZodOptional<z.ZodString>;
    telefono: z.ZodOptional<z.ZodString>;
    id_area: z.ZodCoercedNumber<unknown>;
    id_rol: z.ZodCoercedNumber<unknown>;
    es_responsable: z.ZodOptional<z.ZodBoolean>;
    puede_reabrir_casos: z.ZodOptional<z.ZodBoolean>;
    puede_rechazar_reportes: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    nombre: z.ZodOptional<z.ZodString>;
    correo: z.ZodOptional<z.ZodString>;
    cargo: z.ZodOptional<z.ZodString>;
    telefono: z.ZodOptional<z.ZodString>;
    id_area: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    id_rol: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    estado: z.ZodOptional<z.ZodString>;
    es_responsable: z.ZodOptional<z.ZodBoolean>;
    puede_reabrir_casos: z.ZodOptional<z.ZodBoolean>;
    puede_rechazar_reportes: z.ZodOptional<z.ZodBoolean>;
    password: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodCoercedNumber<unknown>;
//# sourceMappingURL=users.schema.d.ts.map