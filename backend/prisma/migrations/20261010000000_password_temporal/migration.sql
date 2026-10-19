-- Existing accounts retain access; only new credentials set this flag.
ALTER TABLE "usuarios" ADD COLUMN "debe_cambiar_password" BOOLEAN NOT NULL DEFAULT false;
