import { UsersServices } from './app.service';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
export declare class UsersController {
    private readonly appService;
    private readonly httpService;
    constructor(appService: UsersServices, httpService: HttpService);
    postUsers(file: Express.Multer.File, res: Response): Promise<void>;
    getSuperUsers(res: Response): Promise<void>;
    getTopCountries(res: Response): Promise<void>;
    getTeamInsights(res: Response): Promise<void>;
    getActivesPerDay(res: Response): Promise<void>;
    getEvaluation(res: Response): Promise<void>;
    private evaluation;
}
