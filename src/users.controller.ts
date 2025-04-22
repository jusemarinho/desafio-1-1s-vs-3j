import { Controller, Get, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersServices } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';

@Controller()
export class UsersController {
  constructor(private readonly appService: UsersServices, private readonly httpService: HttpService) { }

  @Post('users')
  @UseInterceptors(FileInterceptor('file'))
  async postUsers(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    const usuarios = await this.appService.saveUsers(file);
    res.status(201).json({
      message: 'Arquivo recebido com sucesso',
      user_count: usuarios
    });
  }

  @Get('superusers')
  async getSuperUsers(@Res() res: Response) {
    const start = Date.now();
    const superUsers = await this.appService.getSuperUsers();
    const end = Date.now();
    const executionTime = end - start;
    res.status(HttpStatus.OK).json({
      timestamp: new Date().toISOString(),
      execution_time_ms: executionTime,
      data: superUsers,
    });
  }

  @Get('top-countries')
  async getTopCountries(@Res() res: Response) {
    const start = Date.now();
    const topCountries = await this.appService.topCountries();
    const end = Date.now();
    const executionTime = end - start;
    res.status(HttpStatus.OK).json({
      timestamp: new Date().toISOString(),
      execution_time_ms: executionTime,
      data: topCountries,
    });
  }

  @Get('team-insights')
  async getTeamInsights(@Res() res: Response) {
    const start = Date.now();
    const teamInsights = await this.appService.teamInsights();
    const end = Date.now();
    const executionTime = end - start;
    res.status(HttpStatus.OK).json({
      timestamp: new Date().toISOString(),
      execution_time_ms: executionTime,
      data: teamInsights,
    });
  }

  @Get('actives-per-day')
  async getActivesPerDay(@Res() res: Response) {
    const start = Date.now();
    const activesPerDay = await this.appService.usersActivePerDay();
    const end = Date.now();
    const executionTime = end - start;
    res.status(HttpStatus.OK).json({
      timestamp: new Date().toISOString(),
      execution_time_ms: executionTime,
      data: activesPerDay,
   });
  }

  @Get('evaluation')
  async getEvaluation(@Res() res: Response) {
    const evaluation = await this.evaluation();
    res.status(HttpStatus.OK).json({ tested_endpoints: evaluation });
  }

  private async evaluation(): Promise<{
    [key: string]: { status: number; time_ms: number; valid_response: boolean };
  }> {
    const endpoints = [
      { path: '/superusers', url: 'http://localhost:3000/superusers' },
      { path: '/top-countries', url: 'http://localhost:3000/top-countries' },
      { path: '/team-insights', url: 'http://localhost:3000/team-insights' },
      { path: '/actives-per-day', url: 'http://localhost:3000/actives-per-day' },
    ];
  
    const evaluation: {
      [key: string]: { status: number; time_ms: number; valid_response: boolean };
    } = {};
  
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
      } catch (error) {
        evaluation[endpoint.path] = {
          status: error?.response?.status || 500,
          time_ms: Date.now() - start,
          valid_response: false,
        };
      }
    }
  
    return evaluation;
  }
}
