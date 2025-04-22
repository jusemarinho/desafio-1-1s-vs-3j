"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosSchema = exports.Usuarios = exports.Log = exports.Projeto = exports.Equipe = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class Equipe {
}
exports.Equipe = Equipe;
class Projeto {
}
exports.Projeto = Projeto;
class Log {
}
exports.Log = Log;
let Usuarios = class Usuarios {
};
exports.Usuarios = Usuarios;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Usuarios.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Usuarios.prototype, "nome", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Usuarios.prototype, "idade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Usuarios.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean }),
    __metadata("design:type", Boolean)
], Usuarios.prototype, "ativo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Usuarios.prototype, "pais", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Equipe)
], Usuarios.prototype, "equipe", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Usuarios.prototype, "logs", void 0);
exports.Usuarios = Usuarios = __decorate([
    (0, mongoose_1.Schema)({ collection: 'DESAFIO_JSON_USUARIOS' })
], Usuarios);
exports.UsuariosSchema = mongoose_1.SchemaFactory.createForClass(Usuarios);
//# sourceMappingURL=usuario.schema.js.map