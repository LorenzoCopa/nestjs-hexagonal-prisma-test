import { Inject } from '@nestjs/common';
import type { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { USER_REPOSITORY_PORT } from '../../domain/repositories/user.repository.port';
import { User } from '../../domain/entities/user.entity';
import { PaginationInput } from '../inputs/pagination.input';
import {
  createPaginatedResponse,
  PaginatedResponse,
} from '@/core/domain/dtos/paginated-response.dto';

/**
 * Use Case: Obtener todos los usuarios con paginación
 * Orquesta la obtención de usuarios paginados de la base de datos.
 */
export class FindAllUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(pagination: PaginationInput): Promise<PaginatedResponse<User>> {
    const { data, total } = await this.userRepo.findAll(pagination);
    return createPaginatedResponse(
      data,
      pagination.page,
      pagination.limit,
      total,
    );
  }
}
