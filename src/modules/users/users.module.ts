import { Module } from '@nestjs/common';
import { PASSWORD_HASHER_PORT } from './application/ports/password-hasher.port';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindAllUserUseCase } from './application/use-cases/find-all-users.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { USER_REPOSITORY_PORT } from './domain/repositories/user.repository.port';
import { UserPrismaRepositoryAdapter } from './infrastructure/persistence/user-prisma.repository.adapter';
import { BcryptPasswordHasherAdapter } from './infrastructure/security/bcrypt-password-hasher.adapter';
import { UsersController } from './infrastructure/web/users.controller';

/**
 * Módulo de usuarios.
 * Agrupa todas las dependencias relacionadas con la gestión de usuarios.
 * Proporciona operaciones CRUD completas.
 */
@Module({
  controllers: [UsersController],
  providers: [
    // ===== USE CASES (CRUD) =====
    CreateUserUseCase, // CREATE
    FindAllUserUseCase, // READ (all)
    FindUserByIdUseCase, // READ (one)
    UpdateUserUseCase, // UPDATE (NUEVO)
    DeleteUserUseCase, // DELETE (NUEVO)

    // ===== PUERTOS (Interfaces) =====
    {
      provide: USER_REPOSITORY_PORT,
      useClass: UserPrismaRepositoryAdapter,
    },
    {
      provide: PASSWORD_HASHER_PORT,
      useClass: BcryptPasswordHasherAdapter,
    },
  ],
})
export class UsersModule {}
