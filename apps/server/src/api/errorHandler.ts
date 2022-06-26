import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class AuthError extends Error {
  code: number;
  from: string = 'AUTH';
  constructor({
    name,
    message,
    data,
    code,
  }: {
    code: number;
    name: string;
    message: string;
    data?: Record<string, any>;
  }) {
    super(message);
    this.code = code;
    this.name = name;
  }
}

export class ApiError extends Error {
  code: number;
  data?: Record<string, any>;
  from: string = 'API';
  constructor({
    name,
    message,
    data,
    code,
  }: {
    code: number;
    name: string;
    message: string;
    data?: Record<string, any>;
  }) {
    super(message);
    this.code = code;
    this.name = name;
    this.data = data;
  }
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  switch ((error as Error).constructor) {
    case ZodError:
      return res.status(400).json({
        from: 'VALIDATOR',
        name: 'VALIDATION_ERROR',
        message: (error as ZodError).message,
        data: (error as ZodError).issues,
      });
    case AuthError:
      return res.status((error as AuthError).code).json(error);
    case ApiError:
      return res.status((error as ApiError).code).json(error);
    default:
      return res.status(500).json({
        from: 'INTERNAL',
        type: (error as Error).name,
        data: (error as Error).message,
      });
  }
};
