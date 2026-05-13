import { InvalidPasswordException } from '../exceptions/user.exceptions';

/**
 * Value Object que representa una contraseña (hasheada).
 * En el dominio, solo se almacena la contraseña hasheada.
 * La contraseña en texto plano NUNCA debe estar en el dominio.
 */
export class Password {
  private readonly hashedValue: string;

  constructor(hashedPassword: string) {
    if (!hashedPassword || hashedPassword.trim() === '') {
      throw new InvalidPasswordException('Password hash cannot be empty');
    }

    if (hashedPassword.length < 10) {
      throw new InvalidPasswordException(
        'Password hash must be at least 10 characters (seems not hashed)',
      );
    }

    this.hashedValue = hashedPassword;
  }

  /**
   * Obtiene el hash de la contraseña
   */
  getValue(): string {
    return this.hashedValue;
  }

  /**
   * Para comparar hashes, usa bcrypt.compare() en la capa de infraestructura
   * NO compares hashes directamente aquí
   */
  equals(other: Password): boolean {
    // Los hashes son únicos por salto, así que no comparamos directamente
    // Esto es solo para cumplir con el patrón VO
    return this.hashedValue === other.hashedValue;
  }
}
