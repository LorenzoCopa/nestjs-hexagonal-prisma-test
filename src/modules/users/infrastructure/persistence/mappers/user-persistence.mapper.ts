// Traduce entre el modelo de persistencia (prisma/bd) y el dominio (User)
import { User } from '@/modules/users/domain/entities/user.entity';

export class UserPersistenceMapper {
  // Convierte datos de persistencia (BD) -> a objeto de dominio (User)
  static toDomain(
    this: void,
    raw: { id: number; email: string; password: string },
  ): User {
    return User.fromPersistence(raw);
  }

  // Convierte dominio (User) a -> formato de persistencia (BD)
  static toPersistence(this: void, user: User) {
    return {
      email: user.getEmail().getValue(),
      password: user.getPasswordHash(),
    };
  }
}
