import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.port';

@Injectable()
export class UserPrismaRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  // BUSCAR TODOS LOS USUARIOS
  async findAll(): Promise<User[]> {
    // Recuperamos los datos de la BD con prisma orm
    const users = await this.prisma.user.findMany();

    // Convertimos datos crudos obtenidos de la bd en la entidad de dominio
    return users.map((user) =>
      User.fromPersistence({
        id: user.id,
        email: user.email, // string
        password: user.password,
      }),
    );
  }

  // CREAR NUEVO USUARIO
  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: user.getEmail().getValue(), // sacamos el string del VO
        password: user.getPasswordHash(),
      },
    });

    return User.fromPersistence({
      id: created.id,
      email: created.email,
      password: created.password,
    });
  }
}mport { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
