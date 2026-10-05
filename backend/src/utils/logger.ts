import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug"),
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie", "password", "password_hash", "token", "endpoint", "keys.auth", "keys.p256dh"],
    censor: "[REDACTED]",
  },
  ...(process.env.NODE_ENV === "production" ? {} : {
    transport: {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "HH:MM:ss", ignore: "pid,hostname" },
    },
  }),
});

export default logger;
