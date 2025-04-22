import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServices } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuariosSchema } from './schemas/usuario.schema';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/desafio'),
    MongooseModule.forFeature([{
      name: Usuarios.name, schema: UsuariosSchema
    }]),
    HttpModule
  ],
  controllers: [UsersController],
  providers: [UsersServices],
})
export class AppModule {}
