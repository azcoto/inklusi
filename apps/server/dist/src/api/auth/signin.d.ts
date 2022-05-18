import { Request, Response } from 'express';
import { SignInDto } from './dto';
declare const signIn: (req: Request<unknown, unknown, SignInDto['body']>, res: Response) => Promise<Response<any, Record<string, any>>>;
export default signIn;
//# sourceMappingURL=signin.d.ts.map