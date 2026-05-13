import { InvalidEmailException } from '../exceptions/user.exceptions';

/**
 * Value Object que representa un email.
 * Encapsula la validación y comportamiento del email.
 * Es inmutable y comparable por valor.
 */
export class Email {
  private readonly value: string;

  // Regex más robusta para validar emails
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(email: string) {
    if (!email || email.trim() === '') {
      throw new InvalidEmailException(email);
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!Email.EMAIL_REGEX.test(trimmedEmail)) {
      throw new InvalidEmailException(email);
    }

    this.value = trimmedEmail;
  }

  /**
   * Obtiene el valor primitivo del email (string)
   * Se usa cuando:
   * - Guardamos en base de datos
   * - Enviamos una respuesta HTTP
   * - Interactuamos con capas externas
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Compara dos Value Objects Email por su valor
   * Dos emails son iguales si tienen el mismo valor,
   * no si son la misma instancia en memoria
   */
  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
