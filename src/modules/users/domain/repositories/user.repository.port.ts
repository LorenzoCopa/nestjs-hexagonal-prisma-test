import { User } from '../entities/user.entity';
import { PaginationInput } from '../../application/inputs/pagination.input';

/**
 * Puerto (Interfaz) del repositorio de usuarios.
 * Define el contrato que debe cumplir cualquier adaptador de persistencia.
 * NO contiene lógica de negocio, solo especificaciones.
 */
export interface UserRepositoryPort {
  /**
   * Obtiene todos los usuarios con paginación
   */
  findAll(
    pagination: PaginationInput,
  ): Promise<{ data: User[]; total: number }>;

  /**
   * Crea un nuevo usuario
   */
  create(user: User): Promise<User>;

  /**
   * Busca un usuario por email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Busca un usuario por ID (NUEVO)
   */
  findById(id: number): Promise<User | null>;
  /**
   * Actualiza un usuario existente (NUEVO)
   */
  update(user: User): Promise<User>;

  /**
   * Elimina un usuario por ID (NUEVO)
   */
  delete(id: number): Promise<void>;
}

export const USER_REPOSITORY_PORT = Symbol('USER_REPOSITORY_PORT');
