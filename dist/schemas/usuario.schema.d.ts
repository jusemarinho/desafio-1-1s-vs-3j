import { HydratedDocument } from "mongoose";
export declare class Equipe {
    nome: string;
    lider: boolean;
    projetos: Projeto[];
}
export declare class Projeto {
    nome: string;
    concluido: boolean;
}
export declare class Log {
    data: string;
    acao: string;
}
export type UsuarioDocument = HydratedDocument<Usuarios>;
export declare class Usuarios {
    id: string;
    nome: string;
    idade: number;
    score: number;
    ativo: boolean;
    pais: string;
    equipe: Equipe;
    logs: Log[];
}
export declare const UsuariosSchema: import("mongoose").Schema<Usuarios, import("mongoose").Model<Usuarios, any, any, any, import("mongoose").Document<unknown, any, Usuarios> & Usuarios & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuarios, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Usuarios>> & import("mongoose").FlatRecord<Usuarios> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
