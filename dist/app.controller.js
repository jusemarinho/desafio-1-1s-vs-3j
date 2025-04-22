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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const platform_express_1 = require("@nestjs/platform-express");
const axios_1 = require("@nestjs/axios");
let UsersController = class UsersController {
    constructor(appService, httpService) {
        this.appService = appService;
        this.httpService = httpService;
    }
    async postUsers(file, res) {
        const usuarios = await this.appService.saveUsers(file);
        res.status(201).json({
            message: 'Arquivo recebido com sucesso',
            user_count: usuarios
        });
    }
    async getSuperUsers(res) {
        const start = Date.now();
        const superUsers = await this.appService.getSuperUsers();
        const end = Date.now();
        const executionTime = end - start;
        res.status(common_1.HttpStatus.OK).json({
            timestamp: new Date().toISOString(),
            execution_time_ms: executionTime,
            data: superUsers,
        });
    }
    async getTopCountries(res) {
        const start = Date.now();
        const topCountries = await this.appService.topCountries();
        const end = Date.now();
        const executionTime = end - start;
        res.status(common_1.HttpStatus.OK).json({
            timestamp: new Date().toISOString(),
            execution_time_ms: executionTime,
            data: topCountries,
        });
    }
    async getTeamInsights(res) {
        const start = Date.now();
        const teamInsights = await this.appService.teamInsights();
        const end = Date.now();
        const executionTime = end - start;
        res.status(common_1.HttpStatus.OK).json({
            timestamp: new Date().toISOString(),
            execution_time_ms: executionTime,
            data: teamInsights,
        });
    }
    async getActivesPerDay(res) {
        const start = Date.now();
        const activesPerDay = await this.appService.usersActivePerDay();
        const end = Date.now();
        const executionTime = end - start;
        res.status(common_1.HttpStatus.OK).json({
            timestamp: new Date().toISOString(),
            execution_time_ms: executionTime,
            data: activesPerDay,
        });
    }
    async getEvaluation(res) {
        const evaluation = await this.evaluation();
        res.status(common_1.HttpStatus.OK).json({ tested_endpoints: evaluation });
    }
    async evaluation() {
        const endpoints = [
            { path: '/superusers', url: 'http://localhost:3000/superusers' },
            { path: '/top-countries', url: 'http://localhost:3000/top-countries' },
            { path: '/team-insights', url: 'http://localhost:3000/team-insights' },
            { path: '/actives-per-day', url: 'http://localhost:3000/actives-per-day' },
        ];
        const evaluation = {};
        for (const endpoint of endpoints) {
            const start = Date.now();
            try {
                const response = await this.httpService
                    .get(endpoint.url)
                    .toPromise();
                evaluation[endpoint.path] = {
                    status: response.status,
                    time_ms: response.data.execution_time_ms || (Date.now() - start),
                    valid_response: !!response.data,
                };
            }
            catch (error) {
                evaluation[endpoint.path] = {
                    status: error?.response?.status || 500,
                    time_ms: Date.now() - start,
                    valid_response: false,
                };
            }
        }
        return evaluation;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('users'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "postUsers", null);
__decorate([
    (0, common_1.Get)('superusers'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSuperUsers", null);
__decorate([
    (0, common_1.Get)('top-countries'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getTopCountries", null);
__decorate([
    (0, common_1.Get)('team-insights'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getTeamInsights", null);
__decorate([
    (0, common_1.Get)('actives-per-day'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getActivesPerDay", null);
__decorate([
    (0, common_1.Get)('evaluation'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getEvaluation", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.UsersServices, axios_1.HttpService])
], UsersController);
//# sourceMappingURL=app.controller.js.map