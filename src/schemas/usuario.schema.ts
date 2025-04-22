import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export class Equipe {
    nome: string;
    lider: boolean;
    projetos: Projeto[];
}

export class Projeto {
    nome: string;
    concluido: boolean;
}

export class Log {
    data: string;
    acao: string;
}
export type UsuarioDocument = HydratedDocument<Usuarios>;

@Schema({ collection: 'DESAFIO_JSON_USUARIOS' })
export class Usuarios {
    @Prop({ type: String })
    id: string;

    @Prop({ type: String })
    nome: string;

    @Prop({ type: Number })
    idade: number;

    @Prop({ type: Number })
    score: number;

    @Prop({ type: Boolean })
    ativo: boolean;

    @Prop({ type: String })
    pais: string;

    @Prop()
    equipe: Equipe;

    @Prop()
    logs: Log[];
}

export const UsuariosSchema = SchemaFactory.createForClass(Usuarios);