import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export interface AppError {
  from: string;
  data: unknown;
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    const err: AppError = {
      from: 'API Validator',
      data: error.issues,
    };
    return res.status(400).json(err);
  }
};
