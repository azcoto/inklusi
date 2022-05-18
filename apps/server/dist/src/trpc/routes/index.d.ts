/// <reference types="qs" />
/// <reference types="express" />
export declare const appRouter: import("@trpc/server/dist/declarations/src/router").Router<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user?: {
        nip: string;
        nama: string;
        jabatan: string;
    } | undefined;
}, {
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user?: {
        nip: string;
        nama: string;
        jabatan: string;
    } | undefined;
}, {}, import("@trpc/server").Prefixer<{}, "auth."> & import("@trpc/server").Prefixer<Record<"me", import("@trpc/server/dist/declarations/src/internals/procedure").Procedure<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user?: {
        nip: string;
        nama: string;
        jabatan: string;
    } | undefined;
}, {
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user?: {
        nip: string;
        nama: string;
        jabatan: string;
    } | undefined;
}, {}, undefined, undefined, {
    message: string;
}, unknown, {
    message: string;
}>>, "user.">, import("@trpc/server").Prefixer<Record<"signin", import("@trpc/server/dist/declarations/src/internals/procedure").Procedure<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user?: {
        nip: string;
        nama: string;
        jabatan: string;
    } | undefined;
}, {
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user?: {
        nip: string;
        nama: string;
        jabatan: string;
    } | undefined;
}, {}, {
    phone: string;
    password: string;
}, {
    phone: string;
    password: string;
}, {
    message: string;
}, unknown, {
    message: string;
}>>, "auth."> & import("@trpc/server").Prefixer<{}, "user.">, import("@trpc/server").Prefixer<{}, "auth."> & import("@trpc/server").Prefixer<{}, "user.">, import("@trpc/server").DefaultErrorShape>;
export declare type AppRouter = typeof appRouter;
//# sourceMappingURL=index.d.ts.map