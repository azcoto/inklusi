/// <reference types="qs" />
/// <reference types="express" />
export declare const createRouter: () => import("@trpc/server/dist/declarations/src/router").Router<{
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
}, {}, {}, {}, {}, import("@trpc/server").DefaultErrorShape>;
export declare function createProtectedRouter(): import("@trpc/server/dist/declarations/src/router").Router<{
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    user?: {
        nip: string;
        nama: string;
        jabatan: string;
    } | undefined;
}, {
    user: undefined;
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
}, {}, {}, {}, {}, import("@trpc/server").DefaultErrorShape>;
//# sourceMappingURL=router.d.ts.map