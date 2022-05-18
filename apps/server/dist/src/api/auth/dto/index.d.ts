import z from 'zod';
export declare const zSignInForm: z.ZodObject<{
    phone: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone: string;
    password: string;
}, {
    phone: string;
    password: string;
}>;
export declare type SignInForm = z.infer<typeof zSignInForm>;
export declare const zSignInDto: z.ZodObject<{
    body: z.ZodObject<{
        phone: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        password: string;
    }, {
        phone: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        phone: string;
        password: string;
    };
}, {
    body: {
        phone: string;
        password: string;
    };
}>;
export declare type SignInDto = z.infer<typeof zSignInDto>;
//# sourceMappingURL=index.d.ts.map