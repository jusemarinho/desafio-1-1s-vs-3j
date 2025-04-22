import { Usuarios } from './schemas/usuario.schema';
import { Model } from 'mongoose';
import { CountryDto } from './dto/country.dto';
import { TeamDto } from './dto/team.dto';
import { ActivesPerDay } from './dto/actives-per-day.dto';
export declare class UsersServices {
    private usuariosModel;
    constructor(usuariosModel: Model<Usuarios>);
    saveUsers(file: Express.Multer.File): Promise<number>;
    getSuperUsers(): Promise<Usuarios[]>;
    topCountries(): Promise<CountryDto[]>;
    teamInsights(): Promise<TeamDto[]>;
    usersActivePerDay(): Promise<ActivesPerDay[]>;
}
