import { Request } from 'express';

export type AppRequest<T = void, U = void, V = void> = T extends Record<
  string,
  unknown
>
  ? Omit<Request, 'body'> & { body: T }
  : U extends Record<string, unknown>
  ? Omit<Request, 'params'> & { params: U }
  : V extends Record<string, unknown>
  ? Omit<Request, 'query'> & { params: V }
  : Request;

export type BRequest<T> = 'body' extends keyof T
  ? Omit<Request, 'body'> & Pick<T, 'body'>
  : 'params' extends keyof T
  ? Omit<Request, 'params'> & Pick<T, 'params'>
  : 'query' extends keyof T
  ? Omit<Request, 'body'> & Pick<T, 'query'>
  : Request;
