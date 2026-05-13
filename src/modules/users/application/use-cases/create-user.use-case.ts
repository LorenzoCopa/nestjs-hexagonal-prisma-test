import { Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import type { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { USER_REPOSITORY_PORT } from '../../domain/repositories/user.repository.port';
import { CreateUserInput } from '../inputs/create-user.input';
import type { PasswordHasherPort } from '../ports/password-hasher.port';
import { PASSWORD_HASHER_PORT } from '../ports/password-hasher.port';
import { EmailAlreadyExistsException } from '../../domain/exceptions/user.exceptions';

/**
 * Use Case: Crear un nuevo usuario
 * Orquesta la lógica de negocio para la creación de usuarios.
 *
 * Pasos:
 * 1. Verifica si el email ya existe
 * 2. Hashea la contraseña
 * 3. Crea la entidad User
 * 4. Persiste en la BD
 * 5. Retorna el usuario creado
 */
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: UserRepositoryPort,

    @Inject(PASSWORD_HASHER_PORT)
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    // Paso 1: Verificar si el email ya existe
    const existingUser = await this.userRepo.findByEmail(input.email);

    if (existingUser) {
      throw new EmailAlreadyExistsException(input.email);
    }

    // Paso 2: Hashear la contraseña
    const hashedPassword = await this.passwordHasher.hash(input.password);

    // Paso 3: Crear la entidad User
    // Nota: Pasamos la contraseña ya hasheada
    const user = User.create({
      email: input.email,
      password: hashedPassword,
    });

    // Paso 4: Persistir en la BD
    // Paso 5: Retornar el usuario creado
    return this.userRepo.create(user);
  }
}
