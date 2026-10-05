CREATE TABLE "importacion_locks" (
    "modulo" VARCHAR(30) NOT NULL,
    "token" UUID NOT NULL,
    "heartbeat_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "importacion_locks_pkey" PRIMARY KEY ("modulo")
);
