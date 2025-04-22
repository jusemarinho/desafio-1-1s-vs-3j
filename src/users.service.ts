import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuarios } from './schemas/usuario.schema';
import { Model } from 'mongoose';
import { CountryDto } from './dto/country.dto';
import { TeamDto } from './dto/team.dto';
import { ActivesPerDay } from './dto/actives-per-day.dto';

@Injectable()
export class UsersServices {

  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,
  ) { }

  async saveUsers(file: Express.Multer.File): Promise<number> {
    const fileConvertedToUsers = JSON.parse(file.buffer.toString()) as Usuarios[];

    const ids = fileConvertedToUsers.map(user => user.id);

    const usuariosExistentes = await this.usuariosModel.find({ id: { $in: ids } }).exec();
    const idsExistentes = new Set(usuariosExistentes.map((u: Usuarios) => u.id));

    const novosUsuarios = fileConvertedToUsers.filter(user => !idsExistentes.has(user.id));

    if (novosUsuarios.length > 0) {
      await this.usuariosModel.insertMany(novosUsuarios);
    }

    return novosUsuarios.length;
  }

  // Daria para fazer todas as funcionalidades abaixo e salva-las em um banco de dados em cache como Redis,
  // mas como o MongoDB já está rápido, não achei necessário fazê-lo.

  async getSuperUsers(): Promise<Usuarios[]> {
    return await this.usuariosModel.find({
      score: { $gt: 900 },
      ativo: true,
    }).exec()
  }

  async topCountries(): Promise<CountryDto[]> {
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

  async teamInsights(): Promise<TeamDto[]> {
    const teamInsights = await this.usuariosModel.aggregate([
      {
        $group: {
          _id: "$equipe.nome",
          total_members: { $sum: 1 },
          leaders: { $sum: { $cond: ["$equipe.lider", 1, 0] } },
          completed_projects: { $sum: { $cond: ["$equipe.projetos.concluido", 1, 0] } },
          active_percentage: { $avg: { $cond: ["$ativo", 1, 0] } }
        }
      }]);

    return teamInsights.map((team) => ({
      team: team._id,
      total_members: team.total_members,
      leaders: team.leaders,
      completed_projects: team.completed_projects,
      active_percentage: (team.active_percentage * 100).toFixed(2)
    }));
  }

  async usersActivePerDay(): Promise<ActivesPerDay[]> {
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
}
