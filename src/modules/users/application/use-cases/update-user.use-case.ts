import { Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import type { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { USER_REPOSITORY_PORT } from '../../domain/repositories/user.repository.port';
import type { PasswordHasherPort } from '../ports/password-hasher.port';
import { PASSWORD_HASHER_PORT } from '../ports/password-hasher.port';
import { UpdateUserInput } from '../inputs/update-user.input';
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
} from '../../domain/exceptions/user.exceptions';

/**
 * Use Case: Actualizar un usuario
 * Orquesta la lógica de negocio para la actualización de usuarios.
 *
 * Pasos:
 * 1. Verifica que el usuario exista
 * 2. Si se actualiza el email, verifica que no esté duplicado
 * 3. Si se actualiza la contraseña, la hashea
 * 4. Actualiza la entidad User
 * 5. Persiste en la BD
 * 6. Retorna el usuario actualizado
 */
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: UserRepositoryPort,

    @Inject(PASSWORD_HASHER_PORT)
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async execute(id: number, input: UpdateUserInput): Promise<User> {
    // Paso 1: Verificar que el usuario exista
    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw new UserNotFoundException(id.toString());
    }

    // Paso 2: Si se actualiza el email, verificar que no esté duplicado
    if (input.email && input.email !== existingUser.getEmail().getValue()) {
      const userWithEmail = await this.userRepo.findByEmail(input.email);

      if (userWithEmail) {
        throw new EmailAlreadyExistsException(input.email);
      }
    }

    // Paso 3: Si se actualiza la contraseña, hashearla
    let hashedPassword = existingUser.getPasswordHash();

    if (input.password) {
      hashedPassword = await this.passwordHasher.hash(input.password);
    }

    // Paso 4: Crear la entidad User con los datos actualizados
    const updatedUser = User.fromPersistence({
      id: existingUser.getId() as number,
      email: input.email ?? existingUser.getEmail().getValue(),
      password: hashedPassword,
    });

    // Paso 5 y 6: Persistir en la BD y retornar
    return this.userRepo.update(updatedUser);
  }
}
