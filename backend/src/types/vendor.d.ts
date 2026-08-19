declare module "cors" {
  import type { RequestHandler } from "express";

  export interface CorsOptions {
    origin?: boolean | string | RegExp | Array<boolean | string | RegExp>;
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
  }

  export default function cors(options?: CorsOptions): RequestHandler;
}

declare module "morgan" {
  import type { RequestHandler } from "express";

  export type FormatFn = (
    tokens: unknown,
    req: unknown,
    res: unknown,
  ) => string | undefined | null;

  export interface Options {
    immediate?: boolean;
    skip?: (req: unknown, res: unknown) => boolean;
    stream?: { write: (message: string) => void };
  }

  export default function morgan(
    format: string | FormatFn,
    options?: Options,
  ): RequestHandler;
}