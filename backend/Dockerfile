# Imagen de producción del backend (Express + Prisma).
#
# node:*-bookworm-slim (Debian) en vez de alpine: los binarios del motor de
# Prisma están mucho mejor probados contra glibc/OpenSSL de Debian que contra
# musl de Alpine, y bcrypt (dependencia nativa) trae binario precompilado para
# esta base sin necesitar herramientas de compilación.
ARG NODE_VERSION=22-bookworm-slim

# ── deps: instala TODO (incluye devDependencies) para poder compilar ────────
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
# `npm ci` dispara "postinstall": prisma generate. Corre acá adentro (no en la
# máquina de quien desarrolla) para que el motor generado sea el de Linux.
RUN npm ci

# ── build: compila TypeScript y copia el motor de Prisma a dist/ ────────────
FROM deps AS build
COPY . .
RUN npm run build

# ── deps-prod: solo las dependencias de producción ──────────────────────────
FROM node:${NODE_VERSION} AS deps-prod
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
# --ignore-scripts: no hace falta volver a generar el cliente de Prisma acá,
# ya se generó y se copió a dist/ en el stage de build.
RUN npm ci --omit=dev --ignore-scripts

# ── runtime: imagen final, sin herramientas de build ─────────────────────────
FROM node:${NODE_VERSION} AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./

# Evidencias de casos y avatares: el código los escribe acá si no existe.
# Se monta como volumen en docker-compose para que sobrevivan a un rebuild.
RUN mkdir -p uploads/casos uploads/avatars

EXPOSE 3000
CMD ["node", "dist/server.js"]
