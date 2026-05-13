import { Inject } from '@nestjs/common';
import type { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { USER_REPOSITORY_PORT } from '../../domain/repositories/user.repository.port';
import { UserNotFoundException } from '../../domain/exceptions/user.exceptions';

/**
 * Use Case: Eliminar un usuario
 * Orquesta la lógica de negocio para la eliminación de usuarios.
 *
 * Pasos:
 * 1. Verifica que el usuario exista
 * 2. Elimina el usuario de la BD
 * 3. Retorna éxito
 */
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    // Paso 1: Verificar que el usuario exista
    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw new UserNotFoundException(id.toString());
    }

    // Paso 2 y 3: Eliminar el usuario de la BD
    await this.userRepo.delete(id);
  }
}
