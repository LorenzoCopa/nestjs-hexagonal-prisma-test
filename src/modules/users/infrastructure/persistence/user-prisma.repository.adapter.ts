import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { UserPersistenceMapper } from './mappers/user-persistence.mapper';
import { PaginationInput } from '@/modules/users/application/inputs/pagination.input';

/**
 * Adaptador de persistencia para usuarios usando Prisma ORM.
 * Implementa el puerto UserRepositoryPort.
 * Traduce entre la capa de dominio y la capa de persistencia.
 */
@Injectable()
export class UserPrismaRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca usuarios en la BD con paginación
   */
  async findAll(
    pagination: PaginationInput,
  ): Promise<{ data: User[]; total: number }> {
    const skip = (pagination.page - 1) * pagination.limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: pagination.limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users.map(UserPersistenceMapper.toDomain),
      total,
    };
  }

  /**
   * Crea un nuevo usuario en la BD
   */
  async create(user: User): Promise<User> {
    const data = UserPersistenceMapper.toPersistence(user);
    const createdUser = await this.prisma.user.create({ data });
    return UserPersistenceMapper.toDomain(createdUser);
  }

  /**
   * Busca un usuario por email
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? UserPersistenceMapper.toDomain(user) : null;
  }

  /**
   * Busca un usuario por ID (NUEVO)
   */
  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? UserPersistenceMapper.toDomain(user) : null;
  }

  /**
   * Actualiza un usuario existente (NUEVO)
   */
  async update(user: User): Promise<User> {
    const userId = user.getId();

    // Convertir null a undefined para Prisma
    if (userId === null) {
      throw new Error('Cannot update user without id');
    }

    const data = UserPersistenceMapper.toPersistence(user);
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    return UserPersistenceMapper.toDomain(updatedUser);
  }

  /**
   * Elimina un usuario por ID (NUEVO)
   */
  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
