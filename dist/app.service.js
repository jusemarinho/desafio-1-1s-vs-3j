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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const usuario_schema_1 = require("./schemas/usuario.schema");
const mongoose_2 = require("mongoose");
let UsersServices = class UsersServices {
    constructor(usuariosModel) {
        this.usuariosModel = usuariosModel;
    }
    async saveUsers(file) {
        const fileConvertedToUsers = JSON.parse(file.buffer.toString());
        const ids = fileConvertedToUsers.map(user => user.id);
        const usuariosExistentes = await this.usuariosModel.find({ id: { $in: ids } }).exec();
        const idsExistentes = new Set(usuariosExistentes.map(u => u.id));
        const novosUsuarios = fileConvertedToUsers.filter(user => !idsExistentes.has(user.id));
        if (novosUsuarios.length > 0) {
            await this.usuariosModel.insertMany(novosUsuarios);
        }
        return novosUsuarios.length;
    }
    async getSuperUsers() {
        return await this.usuariosModel.find({
            score: { $gt: 900 },
            ativo: true,
        }).exec();
    }
    async topCountries() {
        const usuarios = await this.usuariosModel.aggregate([
            {
                $group: {
                    _id: "$pais",
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    country: "$_id",
                    total: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    total: -1
                }
            }
        ]);
        return usuarios.map((user) => ({
            country: user.country,
            total: user.total
        }));
    }
    async teamInsights() {
        const teamInsights = await this.usuariosModel.aggregate([
            {
                $group: {
                    _id: "$equipe.nome",
                    total_members: { $sum: 1 },
                    leaders: { $sum: { $cond: ["$equipe.lider", 1, 0] } },
                    completed_projects: { $sum: { $cond: ["$equipe.projetos.concluido", 1, 0] } },
                    active_percentage: { $avg: { $cond: ["$ativo", 1, 0] } }
                }
            }
        ]);
        return teamInsights.map((team) => ({
            team: team._id,
            total_members: team.total_members,
            leaders: team.leaders,
            completed_projects: team.completed_projects,
            active_percentage: (team.active_percentage * 100).toFixed(2)
        }));
    }
    async usersActivePerDay() {
        const logins = await this.usuariosModel.aggregate([
            {
                $unwind: "$logs"
            },
            {
                $group: {
                    _id: { $substr: ["$logs.data", 0, 10] },
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    day: "$_id",
                    total: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    day: 1
                }
            }
        ]);
        return logins.map((login) => ({
            date: login.day,
            total: login.total
        }));
    }
};
exports.UsersServices = UsersServices;
exports.UsersServices = UsersServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuario_schema_1.Usuarios.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersServices);
//# sourceMappingURL=app.service.js.map