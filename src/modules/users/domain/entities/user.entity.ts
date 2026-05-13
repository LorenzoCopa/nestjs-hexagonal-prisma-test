import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';

/**
 * Entidad de dominio que representa un Usuario.
 * Encapsula la identidad y el comportamiento del usuario.
 */
export class User {
  constructor(
    private readonly id: number | null,
    private readonly email: Email,
    private readonly password: Password,
  ) {}

  /**
   * Factory method para crear un nuevo usuario
   * Se usa cuando el usuario se crea por primera vez
   * @param props - email (texto plano) y password (ya hasheada)
   */
  static create(props: {
    email: string;
    password: string; // ya debe estar hasheada
  }): User {
    return new User(null, new Email(props.email), new Password(props.password));
  }

  /**
   * Factory method para reconstruir un usuario desde la base de datos
   * Se usa cuando recuperamos datos persistidos
   */
  static fromPersistence(props: {
    id: number;
    email: string;
    password: string; // hasheada
  }): User {
    return new User(
      props.id,
      new Email(props.email),
      new Password(props.password),
    );
  }

  /**
   * Getters seguros y tipados
   */
  getId(): number | null {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getPassword(): Password {
    return this.password;
  }

  /**
   * Helper para obtener el valor hasheado de la contraseña
   */
  getPasswordHash(): string {
    return this.password.getValue();
  }
}
