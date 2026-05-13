import { Inject } from '@nestjs/common';
import type { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { USER_REPOSITORY_PORT } from '../../domain/repositories/user.repository.port';
import { User } from '../../domain/entities/user.entity';
import { UserNotFoundException } from '../../domain/exceptions/user.exceptions';

/**
 * Use Case: Obtener un usuario por su ID
 * Orquesta la obtención de un usuario específico de la base de datos.
 */
export class FindUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(id: number): Promise<User> {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new UserNotFoundException(id.toString());
    }

    return user;
  }
}
