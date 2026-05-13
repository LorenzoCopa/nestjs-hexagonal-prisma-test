import { User } from '@/modules/users/domain/entities/user.entity';
import { UserResponseHttpDto } from '../dto/user-response.http.dto';

// Traduce una entidad de dominio (User) a un DTO de respuesta HTTP (JSON),
// definiendo qué información se expone al cliente
export class UserHttpMapper {
  static toResponse(this: void, user: User): UserResponseHttpDto {
    // 'this: void' asegura que este método no depende del contexto 'this',
    // permitiendo usarlo como callback (ej: array.map) sin problemas de binding.

    const id = user.getId();

    if (id === null) {
      throw new Error('User id should not be null');
    }

    // Definimos qué datos del dominio se exponen en la respuesta HTTP (DTO)
    // Importante: No exponer información sensible como el password
    return {
      id,
      email: user.getEmail().getValue(),
    };
  }
}
