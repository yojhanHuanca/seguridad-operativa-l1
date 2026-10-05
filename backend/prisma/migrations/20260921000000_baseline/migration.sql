-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "actividades_plan" (
    "id_actividad" SERIAL NOT NULL,
    "id_plan" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "responsable" INTEGER,
    "fecha_inicio" DATE,
    "fecha_fin" DATE,
    "porcentaje" DECIMAL(5,2) DEFAULT 0,
    "estado" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actividades_plan_pkey" PRIMARY KEY ("id_actividad")
);

-- CreateTable
CREATE TABLE "anexos_caso" (
    "id_anexo" SERIAL NOT NULL,
    "id_caso" INTEGER NOT NULL,
    "nombre_archivo" VARCHAR(250),
    "ruta_archivo" VARCHAR(500),
    "tipo_archivo" VARCHAR(50),
    "peso" DECIMAL(10,2),
    "fecha_subida" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "usuario_subida" INTEGER,

    CONSTRAINT "anexos_caso_pkey" PRIMARY KEY ("id_anexo")
);

-- CreateTable
CREATE TABLE "areas" (
    "id_area" SERIAL NOT NULL,
    "nombre_area" VARCHAR(100) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id_area")
);

-- CreateTable
CREATE TABLE "auditoria" (
    "id_auditoria" SERIAL NOT NULL,
    "tabla_afectada" VARCHAR(100) NOT NULL,
    "id_registro" INTEGER,
    "accion" VARCHAR(30) NOT NULL,
    "descripcion" TEXT,
    "usuario" INTEGER NOT NULL,
    "ip" VARCHAR(50),
    "user_agent" VARCHAR(300),
    "datos_previos" JSONB,
    "datos_nuevos" JSONB,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_pkey" PRIMARY KEY ("id_auditoria")
);

-- CreateTable
CREATE TABLE "bitacora" (
    "id_bitacora" SERIAL NOT NULL,
    "usuario" INTEGER NOT NULL,
    "modulo" VARCHAR(100),
    "accion" VARCHAR(100),
    "descripcion" TEXT,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "datos_previos" JSONB,
    "datos_nuevos" JSONB,

    CONSTRAINT "bitacora_pkey" PRIMARY KEY ("id_bitacora")
);

-- CreateTable
CREATE TABLE "casos_sop" (
    "id_caso" SERIAL NOT NULL,
    "codigo_sop" VARCHAR(30) NOT NULL,
    "titulo" VARCHAR(200),
    "nombre_reportante" VARCHAR(150),
    "correo_reportante" VARCHAR(150),
    "telefono_reportante" VARCHAR(20),
    "fecha_hallazgo" DATE NOT NULL,
    "fecha_evento" TIMESTAMP(6),
    "estado_hallazgo" INTEGER NOT NULL,
    "dias_abierto" INTEGER DEFAULT 0,
    "procedencia" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "responsable_hallazgo" INTEGER,
    "tipo_sop" INTEGER NOT NULL,
    "subtipo_sop" INTEGER,
    "peligro" TEXT,
    "consecuencia" TEXT,
    "descripcion_evento" TEXT,
    "clasificacion" VARCHAR(200),
    "analisis_riesgo" INTEGER,
    "acr" TEXT,
    "area_responsable" INTEGER,
    "responsable_plan" INTEGER,
    "estado_plan" INTEGER,
    "fecha_plan" DATE,
    "fecha_reprogramada" DATE,
    "dias_abierto_plan" INTEGER DEFAULT 0,
    "observaciones" TEXT,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "casos_sop_pkey" PRIMARY KEY ("id_caso")
);

-- CreateTable
CREATE TABLE "catalogo_detalle" (
    "id_detalle" SERIAL NOT NULL,
    "id_catalogo" INTEGER NOT NULL,
    "codigo" VARCHAR(30),
    "nombre" VARCHAR(200) NOT NULL,
    "descripcion" TEXT,
    "orden" INTEGER DEFAULT 1,
    "color" VARCHAR(20),
    "estado" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "catalogo_detalle_pkey" PRIMARY KEY ("id_detalle")
);

-- CreateTable
CREATE TABLE "catalogos" (
    "id_catalogo" SERIAL NOT NULL,
    "codigo" VARCHAR(30) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "estado" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "catalogos_pkey" PRIMARY KEY ("id_catalogo")
);

-- CreateTable
CREATE TABLE "configuracion" (
    "id_config" SERIAL NOT NULL,
    "nombre" VARCHAR(150),
    "valor" TEXT,
    "descripcion" TEXT,

    CONSTRAINT "configuracion_pkey" PRIMARY KEY ("id_config")
);

-- CreateTable
CREATE TABLE "dashboard_indicadores" (
    "id" SERIAL NOT NULL,
    "id_dashboard" INTEGER NOT NULL,
    "id_indicador" INTEGER NOT NULL,
    "posicion" INTEGER,

    CONSTRAINT "dashboard_indicadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dashboards" (
    "id_dashboard" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dashboards_pkey" PRIMARY KEY ("id_dashboard")
);

-- CreateTable
CREATE TABLE "estaciones" (
    "id_estacion" SERIAL NOT NULL,
    "nombre_estacion" VARCHAR(100) NOT NULL,

    CONSTRAINT "estaciones_pkey" PRIMARY KEY ("id_estacion")
);

-- CreateTable
CREATE TABLE "evento_caso" (
    "id" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "id_caso" INTEGER NOT NULL,
    "fecha_conversion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "usuario" INTEGER,

    CONSTRAINT "evento_caso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos_operativos" (
    "id_evento" SERIAL NOT NULL,
    "codigo_evento" VARCHAR(30),
    "fecha" DATE NOT NULL,
    "hora" TIME(6),
    "anio" SMALLINT,
    "mes" SMALLINT,
    "semana" SMALLINT,
    "dia" VARCHAR(20),
    "rango_horario" INTEGER,
    "tipo_incidente" INTEGER NOT NULL,
    "descripcion" TEXT,
    "ubicacion" INTEGER,
    "tipo_via" INTEGER,
    "direccion_via" INTEGER,
    "lugar_incidente" INTEGER,
    "modelo_mr" INTEGER,
    "numero_mr" INTEGER,
    "numero_carrera" VARCHAR(30),
    "personal_involucrado" INTEGER,
    "tipo_causa" INTEGER,
    "posible_causa" INTEGER,
    "informacion_adicional" TEXT,
    "camara_monitoreada" VARCHAR(50),
    "demora" DECIMAL(10,2),
    "estado" INTEGER,
    "usuario_registra" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventos_operativos_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "eventos_monitoreo" (
    "id_evento" SERIAL NOT NULL,
    "codigo_evento" VARCHAR(30),
    "fecha" DATE NOT NULL,
    "hora" TIME(6),
    "anio" SMALLINT,
    "mes" SMALLINT,
    "semana" SMALLINT,
    "dia" VARCHAR(20),
    "rango_horario" INTEGER,
    "tipo_incidente" INTEGER NOT NULL,
    "descripcion" TEXT,
    "ubicacion" INTEGER,
    "tipo_via" INTEGER,
    "direccion_via" INTEGER,
    "lugar_incidente" INTEGER,
    "modelo_mr" INTEGER,
    "numero_mr" INTEGER,
    "numero_carrera" VARCHAR(30),
    "personal_involucrado" INTEGER,
    "tipo_causa" INTEGER,
    "posible_causa" INTEGER,
    "informacion_adicional" TEXT,
    "camara_monitoreada" VARCHAR(50),
    "demora" DECIMAL(10,2),
    "estado" VARCHAR(20) NOT NULL DEFAULT 'Registrado',
    "usuario_registra" INTEGER,
    "asignado_a" INTEGER,
    "id_caso_creado" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventos_monitoreo_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "evidencias" (
    "id_evidencia" SERIAL NOT NULL,
    "id_incidencia" INTEGER,
    "ruta_archivo" VARCHAR(255) NOT NULL,
    "tipo_archivo" VARCHAR(50),
    "fecha_subida" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evidencias_pkey" PRIMARY KEY ("id_evidencia")
);

-- CreateTable
CREATE TABLE "evidencias_evento" (
    "id_evidencia" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "nombre_archivo" VARCHAR(250),
    "ruta_archivo" VARCHAR(500),
    "tipo_archivo" VARCHAR(50),
    "peso" DECIMAL(10,2),
    "usuario" INTEGER,
    "fecha_subida" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evidencias_evento_pkey" PRIMARY KEY ("id_evidencia")
);

-- CreateTable
CREATE TABLE "historial_indicadores" (
    "id_historial" SERIAL NOT NULL,
    "id_indicador" INTEGER,
    "fecha" DATE,
    "valor" DECIMAL(15,2),
    "observacion" TEXT,

    CONSTRAINT "historial_indicadores_pkey" PRIMARY KEY ("id_historial")
);

-- CreateTable
CREATE TABLE "datos_operativos" (
    "id_dato_operativo" SERIAL NOT NULL,
    "fecha" DATE NOT NULL,
    "qty_carreras" DECIMAL(15,2) NOT NULL,
    "qty_pasajeros" DECIMAL(15,2) NOT NULL,
    "km_comercial" DECIMAL(15,2) NOT NULL,
    "km_no_comercial" DECIMAL(15,2) NOT NULL,
    "paradas_estacion" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "datos_operativos_pkey" PRIMARY KEY ("id_dato_operativo")
);

-- CreateTable
CREATE TABLE "contingencia_catalogos" (
    "id_catalogo" SERIAL NOT NULL,
    "codigo" VARCHAR(80) NOT NULL,
    "nombre" VARCHAR(160) NOT NULL,
    "hoja_excel" VARCHAR(80),
    "columna_excel" VARCHAR(10),
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contingencia_catalogos_pkey" PRIMARY KEY ("id_catalogo")
);

-- CreateTable
CREATE TABLE "contingencia_catalogo_items" (
    "id_item" SERIAL NOT NULL,
    "id_catalogo" INTEGER NOT NULL,
    "valor" VARCHAR(220) NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 1,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contingencia_catalogo_items_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "contingencia_eventos" (
    "id_evento" SERIAL NOT NULL,
    "codigo_evento" VARCHAR(30),
    "fecha" DATE NOT NULL,
    "hora_reporte" TIME(6),
    "mes" SMALLINT,
    "tipo_evento" VARCHAR(100) NOT NULL,
    "lugar_evento" VARCHAR(160),
    "lugar_exacto_evento" VARCHAR(180),
    "quien_reporta" VARCHAR(120),
    "medio_comunicacion_primer_reporte" VARCHAR(180),
    "estado_usuario_reportado" VARCHAR(80),
    "acepta_atencion" VARCHAR(20),
    "atencion_inicial" VARCHAR(120),
    "atencion_final" VARCHAR(120),
    "nivel_inicial" VARCHAR(60),
    "nivel_final" VARCHAR(60),
    "hora_termino_ae" TIME(6),
    "estado" VARCHAR(30) NOT NULL DEFAULT 'Registrado',
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "contingencia_eventos_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "contingencia_atenciones" (
    "id_atencion" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "hora_llamado_pco_sppa" TIME(6),
    "hora_llegada_spaa" TIME(6),
    "hora_inicio_spaa" TIME(6),
    "hora_termino_atencion_inicio_traslado" TIME(6),
    "estacion_partida_spaa" VARCHAR(160),
    "medio_transporte_spaa" VARCHAR(120),
    "trasladado_por" VARCHAR(120),

    CONSTRAINT "contingencia_atenciones_pkey" PRIMARY KEY ("id_atencion")
);

-- CreateTable
CREATE TABLE "contingencia_traslados" (
    "id_traslado" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "estacion_partida_ambulancia" VARCHAR(160),
    "estacion_llegada_ambulancia" VARCHAR(180),
    "hora_llamado_ambulancia" TIME(6),
    "hora_llegada_estacion" TIME(6),
    "hora_salida_centro_salud" TIME(6),
    "hora_llegada_centro_medico" TIME(6),
    "hora_retiro_centro_medico" TIME(6),
    "hora_retorno_puesto" TIME(6),
    "hora_llamado_ambulancia_tercero" TIME(6),
    "hora_llegada_ambulancia_terceros" TIME(6),
    "hora_inicio_traslado_ambulancia_terceros" TIME(6),
    "centro_salud" VARCHAR(180),

    CONSTRAINT "contingencia_traslados_pkey" PRIMARY KEY ("id_traslado")
);

-- CreateTable
CREATE TABLE "contingencia_personas" (
    "id_persona" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "nombre_persona" VARCHAR(180),
    "dni" VARCHAR(20),
    "sexo" VARCHAR(10),
    "edad" INTEGER,
    "tarjeta_cliente" VARCHAR(60),
    "categoria_paciente" VARCHAR(120),
    "extranjero" VARCHAR(10),
    "estacion_origen_usuario" VARCHAR(160),
    "estacion_destino_usuario" VARCHAR(160),
    "acompanante" VARCHAR(80),
    "numero_dni_acompanante" VARCHAR(20),

    CONSTRAINT "contingencia_personas_pkey" PRIMARY KEY ("id_persona")
);

-- CreateTable
CREATE TABLE "contingencia_diagnosticos" (
    "id_diagnostico" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "reporte_pco" VARCHAR(180),
    "reporte_cliente" VARCHAR(180),
    "diagnostico_presuntivo" VARCHAR(220),
    "sintomas_presentados" TEXT,
    "zona_lesion" VARCHAR(120),
    "nombre_personal_salud" VARCHAR(180),
    "tipo_declaracion_jurada" VARCHAR(20),
    "nro_declaracion_jurada" VARCHAR(80),

    CONSTRAINT "contingencia_diagnosticos_pkey" PRIMARY KEY ("id_diagnostico")
);

-- CreateTable
CREATE TABLE "contingencia_cierres" (
    "id_cierre" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "breve_descripcion_hecho" TEXT,
    "reserva_camaras" VARCHAR(120),
    "observacion" TEXT,
    "registro" VARCHAR(120),
    "revision" VARCHAR(120),
    "casos_sospechosos_covid_19" VARCHAR(120),

    CONSTRAINT "contingencia_cierres_pkey" PRIMARY KEY ("id_cierre")
);

-- CreateTable
CREATE TABLE "incidencias" (
    "id_incidencia" SERIAL NOT NULL,
    "codigo_incidencia" VARCHAR(30) NOT NULL,
    "tipo_evento" VARCHAR(50) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivel_riesgo" VARCHAR(20) DEFAULT 'Por Evaluar',
    "estado" VARCHAR(30) DEFAULT 'Registrado',
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_limite" TIMESTAMP(6),
    "id_usuario_reporta" INTEGER,
    "id_estacion" INTEGER,
    "id_area_responsable" INTEGER,

    CONSTRAINT "incidencias_pkey" PRIMARY KEY ("id_incidencia")
);

-- CreateTable
CREATE TABLE "indicadores" (
    "id_indicador" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "descripcion" TEXT,
    "tipo" VARCHAR(50),
    "unidad_medida" VARCHAR(30),
    "formula" TEXT,
    "activo" BOOLEAN DEFAULT true,

    CONSTRAINT "indicadores_pkey" PRIMARY KEY ("id_indicador")
);

-- CreateTable
CREATE TABLE "timeline_caso" (
    "id_evento" SERIAL NOT NULL,
    "id_caso" INTEGER NOT NULL,
    "kind" VARCHAR(40) NOT NULL,
    "actor" VARCHAR(150) NOT NULL,
    "actor_rol" VARCHAR(30) NOT NULL,
    "titulo" VARCHAR(250) NOT NULL,
    "detalle" TEXT,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timeline_caso_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "investigacion_caso" (
    "id_investigacion" SERIAL NOT NULL,
    "id_caso" INTEGER NOT NULL,
    "hallazgos" TEXT NOT NULL,
    "causa_raiz" TEXT NOT NULL,
    "conclusiones" TEXT NOT NULL,
    "observaciones" TEXT,
    "investigador" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investigacion_caso_pkey" PRIMARY KEY ("id_investigacion")
);

-- CreateTable
CREATE TABLE "investigaciones" (
    "id_investigacion" SERIAL NOT NULL,
    "id_incidencia" INTEGER,
    "causa_raiz" TEXT NOT NULL,
    "plan_accion" TEXT NOT NULL,
    "id_usuario_investigador" INTEGER,
    "fecha_investigacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investigaciones_pkey" PRIMARY KEY ("id_investigacion")
);

-- CreateTable
CREATE TABLE "logs_sistema" (
    "id_log" SERIAL NOT NULL,
    "modulo" VARCHAR(100),
    "nivel" VARCHAR(20),
    "mensaje" TEXT,
    "stack_trace" TEXT,
    "usuario" INTEGER,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_sistema_pkey" PRIMARY KEY ("id_log")
);

-- CreateTable
CREATE TABLE "metas_indicadores" (
    "id_meta" SERIAL NOT NULL,
    "id_indicador" INTEGER,
    "anio" INTEGER,
    "mes" INTEGER,
    "valor_meta" DECIMAL(15,2),

    CONSTRAINT "metas_indicadores_pkey" PRIMARY KEY ("id_meta")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "id_notificacion" SERIAL NOT NULL,
    "usuario" INTEGER NOT NULL,
    "titulo" VARCHAR(200),
    "mensaje" TEXT,
    "tipo" VARCHAR(50),
    "leido" BOOLEAN DEFAULT false,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id_notificacion")
);

-- CreateTable
CREATE TABLE "push_subscriptions" (
    "id_suscripcion" SERIAL NOT NULL,
    "usuario" INTEGER NOT NULL,
    "endpoint" VARCHAR(500) NOT NULL,
    "p256dh" VARCHAR(200) NOT NULL,
    "auth" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id_suscripcion")
);

-- CreateTable
CREATE TABLE "planes_accion" (
    "id_plan" SERIAL NOT NULL,
    "id_caso" INTEGER NOT NULL,
    "codigo_plan" VARCHAR(50) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_area" INTEGER NOT NULL,
    "responsable" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL,
    "fecha_plan" DATE NOT NULL,
    "fecha_reprogramada" DATE,
    "dias_abierto" INTEGER DEFAULT 0,
    "observaciones" TEXT,
    "prorroga_motivo" TEXT,
    "prorroga_fecha" DATE,
    "prorroga_estado" VARCHAR(20),
    "prorroga_fecha_sol" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "planes_accion_pkey" PRIMARY KEY ("id_plan")
);

-- CreateTable
CREATE TABLE "reporte_detalle" (
    "id_detalle" SERIAL NOT NULL,
    "id_reporte" INTEGER NOT NULL,
    "indicador" VARCHAR(200),
    "valor" DECIMAL(15,2),
    "observacion" TEXT,

    CONSTRAINT "reporte_detalle_pkey" PRIMARY KEY ("id_detalle")
);

-- CreateTable
CREATE TABLE "reporte_estadistico" (
    "id_reporte" SERIAL NOT NULL,
    "nombre" VARCHAR(200),
    "descripcion" TEXT,
    "fecha_inicio" DATE,
    "fecha_fin" DATE,
    "generado_por" INTEGER,
    "fecha_generacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reporte_estadistico_pkey" PRIMARY KEY ("id_reporte")
);

-- CreateTable
CREATE TABLE "roles" (
    "id_rol" SERIAL NOT NULL,
    "nombre_rol" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "seguimientos" (
    "id_seguimiento" SERIAL NOT NULL,
    "id_actividad" INTEGER NOT NULL,
    "comentario" TEXT,
    "porcentaje" DECIMAL(5,2),
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "usuario" INTEGER,

    CONSTRAINT "seguimientos_pkey" PRIMARY KEY ("id_seguimiento")
);

-- CreateTable
CREATE TABLE "sesiones" (
    "id_sesion" SERIAL NOT NULL,
    "usuario" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(6),
    "fecha_fin" TIMESTAMP(6),
    "direccion_ip" VARCHAR(50),
    "navegador" VARCHAR(200),
    "dispositivo" VARCHAR(200),
    "estado" VARCHAR(30),

    CONSTRAINT "sesiones_pkey" PRIMARY KEY ("id_sesion")
);

-- CreateTable
CREATE TABLE "solicitudes_informacion" (
    "id_solicitud" SERIAL NOT NULL,
    "id_caso" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "respuesta" TEXT,
    "respondida" BOOLEAN NOT NULL DEFAULT false,
    "estado_previo" VARCHAR(60),
    "fecha_solicitud" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_respuesta" TIMESTAMP(6),

    CONSTRAINT "solicitudes_informacion_pkey" PRIMARY KEY ("id_solicitud")
);

-- CreateTable
CREATE TABLE "solicitudes_prorroga" (
    "id_prorroga" SERIAL NOT NULL,
    "id_incidencia" INTEGER,
    "motivo" TEXT NOT NULL,
    "nueva_fecha_propuesta" TIMESTAMP(6) NOT NULL,
    "estado_solicitud" VARCHAR(20) DEFAULT 'Pendiente',
    "fecha_solicitud" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "solicitudes_prorroga_pkey" PRIMARY KEY ("id_prorroga")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "codigo_usuario" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "cargo" VARCHAR(100),
    "correo" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255),
    "telefono" VARCHAR(20),
    "estado" VARCHAR(20) DEFAULT 'Activo',
    "fecha_ingreso" DATE,
    "foto_url" VARCHAR(255),
    "ultimo_acceso" TIMESTAMP(6),
    "es_responsable" BOOLEAN NOT NULL DEFAULT false,
    "puede_reabrir_casos" BOOLEAN NOT NULL DEFAULT false,
    "puede_rechazar_reportes" BOOLEAN NOT NULL DEFAULT false,
    "id_area" INTEGER,
    "id_rol" INTEGER,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "password_resets" (
    "id_reset" SERIAL NOT NULL,
    "usuario" INTEGER NOT NULL,
    "token_hash" VARCHAR(64) NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "used_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("id_reset")
);

-- CreateIndex
CREATE INDEX "idx_actividad_plan" ON "actividades_plan"("id_plan");

-- CreateIndex
CREATE UNIQUE INDEX "areas_nombre_area_key" ON "areas"("nombre_area");

-- CreateIndex
CREATE INDEX "idx_auditoria_fecha" ON "auditoria"("fecha");

-- CreateIndex
CREATE INDEX "idx_auditoria_tabla" ON "auditoria"("tabla_afectada");

-- CreateIndex
CREATE INDEX "idx_auditoria_usuario" ON "auditoria"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "casos_sop_codigo_sop_key" ON "casos_sop"("codigo_sop");

-- CreateIndex
CREATE INDEX "idx_caso_area" ON "casos_sop"("area_responsable");

-- CreateIndex
CREATE INDEX "idx_caso_codigo" ON "casos_sop"("codigo_sop");

-- CreateIndex
CREATE INDEX "idx_caso_correo_reportante" ON "casos_sop"("correo_reportante");

-- CreateIndex
CREATE INDEX "idx_caso_estado" ON "casos_sop"("estado_hallazgo");

-- CreateIndex
CREATE INDEX "idx_caso_fecha" ON "casos_sop"("fecha_hallazgo");

-- CreateIndex
CREATE INDEX "idx_caso_responsable" ON "casos_sop"("responsable_hallazgo");

-- CreateIndex
CREATE INDEX "idx_caso_riesgo" ON "casos_sop"("analisis_riesgo");

-- CreateIndex
CREATE INDEX "idx_catalogo_detalle_catalogo" ON "catalogo_detalle"("id_catalogo");

-- CreateIndex
CREATE INDEX "idx_catalogo_detalle_nombre" ON "catalogo_detalle"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "catalogos_codigo_key" ON "catalogos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "catalogos_nombre_key" ON "catalogos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "configuracion_nombre_key" ON "configuracion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "estaciones_nombre_estacion_key" ON "estaciones"("nombre_estacion");

-- CreateIndex
CREATE UNIQUE INDEX "eventos_operativos_codigo_evento_key" ON "eventos_operativos"("codigo_evento");

-- CreateIndex
CREATE INDEX "idx_evento_estado" ON "eventos_operativos"("estado");

-- CreateIndex
CREATE INDEX "idx_evento_fecha" ON "eventos_operativos"("fecha");

-- CreateIndex
CREATE INDEX "idx_evento_lugar" ON "eventos_operativos"("lugar_incidente");

-- CreateIndex
CREATE INDEX "idx_evento_modelo" ON "eventos_operativos"("modelo_mr");

-- CreateIndex
CREATE INDEX "idx_evento_tipo" ON "eventos_operativos"("tipo_incidente");

-- CreateIndex
CREATE INDEX "idx_evento_usuario" ON "eventos_operativos"("usuario_registra");

-- CreateIndex
CREATE UNIQUE INDEX "eventos_monitoreo_codigo_evento_key" ON "eventos_monitoreo"("codigo_evento");

-- CreateIndex
CREATE UNIQUE INDEX "eventos_monitoreo_id_caso_creado_key" ON "eventos_monitoreo"("id_caso_creado");

-- CreateIndex
CREATE INDEX "idx_monitoreo_estado" ON "eventos_monitoreo"("estado");

-- CreateIndex
CREATE INDEX "idx_monitoreo_asignado" ON "eventos_monitoreo"("asignado_a");

-- CreateIndex
CREATE INDEX "idx_monitoreo_fecha" ON "eventos_monitoreo"("fecha");

-- CreateIndex
CREATE INDEX "idx_monitoreo_tipo" ON "eventos_monitoreo"("tipo_incidente");

-- CreateIndex
CREATE INDEX "idx_monitoreo_usuario" ON "eventos_monitoreo"("usuario_registra");

-- CreateIndex
CREATE UNIQUE INDEX "datos_operativos_fecha_key" ON "datos_operativos"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "contingencia_catalogos_codigo_key" ON "contingencia_catalogos"("codigo");

-- CreateIndex
CREATE INDEX "idx_cont_catalogo_estado" ON "contingencia_catalogos"("estado");

-- CreateIndex
CREATE INDEX "idx_cont_item_catalogo" ON "contingencia_catalogo_items"("id_catalogo");

-- CreateIndex
CREATE INDEX "idx_cont_item_estado" ON "contingencia_catalogo_items"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "uq_cont_item_catalogo_valor" ON "contingencia_catalogo_items"("id_catalogo", "valor");

-- CreateIndex
CREATE UNIQUE INDEX "contingencia_eventos_codigo_evento_key" ON "contingencia_eventos"("codigo_evento");

-- CreateIndex
CREATE INDEX "idx_cont_evento_fecha" ON "contingencia_eventos"("fecha");

-- CreateIndex
CREATE INDEX "idx_cont_evento_estado" ON "contingencia_eventos"("estado");

-- CreateIndex
CREATE INDEX "idx_cont_evento_tipo" ON "contingencia_eventos"("tipo_evento");

-- CreateIndex
CREATE INDEX "idx_cont_evento_created_by" ON "contingencia_eventos"("created_by");

-- CreateIndex
CREATE UNIQUE INDEX "contingencia_atenciones_id_evento_key" ON "contingencia_atenciones"("id_evento");

-- CreateIndex
CREATE UNIQUE INDEX "contingencia_traslados_id_evento_key" ON "contingencia_traslados"("id_evento");

-- CreateIndex
CREATE UNIQUE INDEX "contingencia_personas_id_evento_key" ON "contingencia_personas"("id_evento");

-- CreateIndex
CREATE INDEX "idx_cont_persona_categoria" ON "contingencia_personas"("categoria_paciente");

-- CreateIndex
CREATE UNIQUE INDEX "contingencia_diagnosticos_id_evento_key" ON "contingencia_diagnosticos"("id_evento");

-- CreateIndex
CREATE UNIQUE INDEX "contingencia_cierres_id_evento_key" ON "contingencia_cierres"("id_evento");

-- CreateIndex
CREATE UNIQUE INDEX "incidencias_codigo_incidencia_key" ON "incidencias"("codigo_incidencia");

-- CreateIndex
CREATE INDEX "idx_timeline_caso" ON "timeline_caso"("id_caso");

-- CreateIndex
CREATE UNIQUE INDEX "investigacion_caso_id_caso_key" ON "investigacion_caso"("id_caso");

-- CreateIndex
CREATE UNIQUE INDEX "investigaciones_id_incidencia_key" ON "investigaciones"("id_incidencia");

-- CreateIndex
CREATE UNIQUE INDEX "push_subscriptions_endpoint_key" ON "push_subscriptions"("endpoint");

-- CreateIndex
CREATE INDEX "idx_push_subscription_usuario" ON "push_subscriptions"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "planes_accion_codigo_plan_key" ON "planes_accion"("codigo_plan");

-- CreateIndex
CREATE INDEX "idx_plan_area" ON "planes_accion"("id_area");

-- CreateIndex
CREATE INDEX "idx_plan_caso" ON "planes_accion"("id_caso");

-- CreateIndex
CREATE INDEX "idx_plan_estado" ON "planes_accion"("estado");

-- CreateIndex
CREATE INDEX "idx_plan_responsable" ON "planes_accion"("responsable");

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_rol_key" ON "roles"("nombre_rol");

-- CreateIndex
CREATE INDEX "idx_seg_actividad" ON "seguimientos"("id_actividad");

-- CreateIndex
CREATE INDEX "idx_solicitud_info_caso" ON "solicitudes_informacion"("id_caso");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_codigo_usuario_key" ON "usuarios"("codigo_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE INDEX "idx_usuario_area" ON "usuarios"("id_area");

-- CreateIndex
CREATE INDEX "idx_usuario_codigo" ON "usuarios"("codigo_usuario");

-- CreateIndex
CREATE INDEX "idx_usuario_correo" ON "usuarios"("correo");

-- CreateIndex
CREATE INDEX "idx_usuario_rol" ON "usuarios"("id_rol");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_token_hash_key" ON "password_resets"("token_hash");

-- CreateIndex
CREATE INDEX "idx_password_reset_usuario" ON "password_resets"("usuario");

-- AddForeignKey
ALTER TABLE "actividades_plan" ADD CONSTRAINT "fk_actividad_plan" FOREIGN KEY ("id_plan") REFERENCES "planes_accion"("id_plan") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "actividades_plan" ADD CONSTRAINT "fk_actividad_usuario" FOREIGN KEY ("responsable") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "actividades_plan" ADD CONSTRAINT "fk_estado_actividad" FOREIGN KEY ("estado") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "anexos_caso" ADD CONSTRAINT "fk_anexo_caso" FOREIGN KEY ("id_caso") REFERENCES "casos_sop"("id_caso") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "anexos_caso" ADD CONSTRAINT "fk_usuario_anexo" FOREIGN KEY ("usuario_subida") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditoria" ADD CONSTRAINT "fk_auditoria_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bitacora" ADD CONSTRAINT "fk_bitacora_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_area" FOREIGN KEY ("area_responsable") REFERENCES "areas"("id_area") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_created_by" FOREIGN KEY ("created_by") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_estado_hallazgo" FOREIGN KEY ("estado_hallazgo") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_estado_plan" FOREIGN KEY ("estado_plan") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_procedencia" FOREIGN KEY ("procedencia") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_responsable_hallazgo" FOREIGN KEY ("responsable_hallazgo") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_responsable_plan" FOREIGN KEY ("responsable_plan") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_riesgo" FOREIGN KEY ("analisis_riesgo") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_subtipo" FOREIGN KEY ("subtipo_sop") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_tipo" FOREIGN KEY ("tipo") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "casos_sop" ADD CONSTRAINT "fk_tipo_sop" FOREIGN KEY ("tipo_sop") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "catalogo_detalle" ADD CONSTRAINT "fk_catalogo" FOREIGN KEY ("id_catalogo") REFERENCES "catalogos"("id_catalogo") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dashboard_indicadores" ADD CONSTRAINT "fk_dashboard" FOREIGN KEY ("id_dashboard") REFERENCES "dashboards"("id_dashboard") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dashboard_indicadores" ADD CONSTRAINT "fk_indicador" FOREIGN KEY ("id_indicador") REFERENCES "indicadores"("id_indicador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evento_caso" ADD CONSTRAINT "fk_ec_caso" FOREIGN KEY ("id_caso") REFERENCES "casos_sop"("id_caso") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evento_caso" ADD CONSTRAINT "fk_ec_evento" FOREIGN KEY ("id_evento") REFERENCES "eventos_operativos"("id_evento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evento_caso" ADD CONSTRAINT "fk_ec_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_direccion" FOREIGN KEY ("direccion_via") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_estado" FOREIGN KEY ("estado") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_lugar" FOREIGN KEY ("lugar_incidente") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_modelo" FOREIGN KEY ("modelo_mr") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_numero" FOREIGN KEY ("numero_mr") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_personal" FOREIGN KEY ("personal_involucrado") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_posible" FOREIGN KEY ("posible_causa") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_rango" FOREIGN KEY ("rango_horario") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_tipo" FOREIGN KEY ("tipo_incidente") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_tipo_causa" FOREIGN KEY ("tipo_causa") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_tipo_via" FOREIGN KEY ("tipo_via") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_ubicacion" FOREIGN KEY ("ubicacion") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_operativos" ADD CONSTRAINT "fk_evento_usuario" FOREIGN KEY ("usuario_registra") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_direccion" FOREIGN KEY ("direccion_via") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_lugar" FOREIGN KEY ("lugar_incidente") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_modelo" FOREIGN KEY ("modelo_mr") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_numero" FOREIGN KEY ("numero_mr") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_personal" FOREIGN KEY ("personal_involucrado") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_posible" FOREIGN KEY ("posible_causa") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_rango" FOREIGN KEY ("rango_horario") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_tipo" FOREIGN KEY ("tipo_incidente") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_tipo_causa" FOREIGN KEY ("tipo_causa") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_tipo_via" FOREIGN KEY ("tipo_via") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_ubicacion" FOREIGN KEY ("ubicacion") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_usuario" FOREIGN KEY ("usuario_registra") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_asignado" FOREIGN KEY ("asignado_a") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "fk_monitoreo_caso_creado" FOREIGN KEY ("id_caso_creado") REFERENCES "casos_sop"("id_caso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evidencias" ADD CONSTRAINT "evidencias_id_incidencia_fkey" FOREIGN KEY ("id_incidencia") REFERENCES "incidencias"("id_incidencia") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evidencias_evento" ADD CONSTRAINT "fk_evidencia_evento" FOREIGN KEY ("id_evento") REFERENCES "eventos_operativos"("id_evento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evidencias_evento" ADD CONSTRAINT "fk_usuario_evento" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historial_indicadores" ADD CONSTRAINT "fk_historial_indicador" FOREIGN KEY ("id_indicador") REFERENCES "indicadores"("id_indicador") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contingencia_catalogo_items" ADD CONSTRAINT "fk_cont_item_catalogo" FOREIGN KEY ("id_catalogo") REFERENCES "contingencia_catalogos"("id_catalogo") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contingencia_atenciones" ADD CONSTRAINT "fk_cont_atencion_evento" FOREIGN KEY ("id_evento") REFERENCES "contingencia_eventos"("id_evento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contingencia_traslados" ADD CONSTRAINT "fk_cont_traslado_evento" FOREIGN KEY ("id_evento") REFERENCES "contingencia_eventos"("id_evento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contingencia_personas" ADD CONSTRAINT "fk_cont_persona_evento" FOREIGN KEY ("id_evento") REFERENCES "contingencia_eventos"("id_evento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contingencia_diagnosticos" ADD CONSTRAINT "fk_cont_diagnostico_evento" FOREIGN KEY ("id_evento") REFERENCES "contingencia_eventos"("id_evento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contingencia_cierres" ADD CONSTRAINT "fk_cont_cierre_evento" FOREIGN KEY ("id_evento") REFERENCES "contingencia_eventos"("id_evento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incidencias" ADD CONSTRAINT "incidencias_id_area_responsable_fkey" FOREIGN KEY ("id_area_responsable") REFERENCES "areas"("id_area") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incidencias" ADD CONSTRAINT "incidencias_id_estacion_fkey" FOREIGN KEY ("id_estacion") REFERENCES "estaciones"("id_estacion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incidencias" ADD CONSTRAINT "incidencias_id_usuario_reporta_fkey" FOREIGN KEY ("id_usuario_reporta") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "timeline_caso" ADD CONSTRAINT "fk_timeline_caso" FOREIGN KEY ("id_caso") REFERENCES "casos_sop"("id_caso") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "investigacion_caso" ADD CONSTRAINT "fk_investigacion_caso" FOREIGN KEY ("id_caso") REFERENCES "casos_sop"("id_caso") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "investigacion_caso" ADD CONSTRAINT "fk_investigacion_investigador" FOREIGN KEY ("investigador") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "investigaciones" ADD CONSTRAINT "investigaciones_id_incidencia_fkey" FOREIGN KEY ("id_incidencia") REFERENCES "incidencias"("id_incidencia") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "investigaciones" ADD CONSTRAINT "investigaciones_id_usuario_investigador_fkey" FOREIGN KEY ("id_usuario_investigador") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "logs_sistema" ADD CONSTRAINT "fk_log_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "metas_indicadores" ADD CONSTRAINT "fk_meta_indicador" FOREIGN KEY ("id_indicador") REFERENCES "indicadores"("id_indicador") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "fk_notificacion_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "fk_push_subscription_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "planes_accion" ADD CONSTRAINT "fk_plan_area" FOREIGN KEY ("id_area") REFERENCES "areas"("id_area") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "planes_accion" ADD CONSTRAINT "fk_plan_caso" FOREIGN KEY ("id_caso") REFERENCES "casos_sop"("id_caso") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "planes_accion" ADD CONSTRAINT "fk_plan_estado" FOREIGN KEY ("estado") REFERENCES "catalogo_detalle"("id_detalle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "planes_accion" ADD CONSTRAINT "fk_plan_usuario" FOREIGN KEY ("responsable") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reporte_detalle" ADD CONSTRAINT "fk_detalle_reporte" FOREIGN KEY ("id_reporte") REFERENCES "reporte_estadistico"("id_reporte") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reporte_estadistico" ADD CONSTRAINT "fk_reporte_usuario" FOREIGN KEY ("generado_por") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguimientos" ADD CONSTRAINT "fk_seg_actividad" FOREIGN KEY ("id_actividad") REFERENCES "actividades_plan"("id_actividad") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguimientos" ADD CONSTRAINT "fk_seg_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sesiones" ADD CONSTRAINT "fk_sesion_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitudes_informacion" ADD CONSTRAINT "fk_solicitud_info_caso" FOREIGN KEY ("id_caso") REFERENCES "casos_sop"("id_caso") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitudes_prorroga" ADD CONSTRAINT "solicitudes_prorroga_id_incidencia_fkey" FOREIGN KEY ("id_incidencia") REFERENCES "incidencias"("id_incidencia") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_id_area_fkey" FOREIGN KEY ("id_area") REFERENCES "areas"("id_area") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "roles"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "password_resets" ADD CONSTRAINT "fk_password_reset_usuario" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

