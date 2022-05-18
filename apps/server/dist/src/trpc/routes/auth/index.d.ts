/// <reference types="qs" />
/// <reference types="express" />
export declare const auth: import("@trpc/server/dist/declarations/src/router").Router<{
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
}, {}, {}, Record<"signin", import("@trpc/server/dist/declarations/src/internals/procedure").Procedure<{
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
}>>, {}, import("@trpc/server").DefaultErrorShape>;
//# sourceMappingURL=index.d.ts.map