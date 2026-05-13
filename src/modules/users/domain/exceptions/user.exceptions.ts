/**
 * Excepciones de dominio para el módulo de usuarios.
 * Estas excepciones representan errores de negocio específicos.
 * NO deben contener lógica HTTP.
 */

export abstract class DomainException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500,
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}

/**
 * Lanzada cuando se intenta crear un usuario con un email que ya existe
 */
export class EmailAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super(
      'EMAIL_ALREADY_EXISTS',
      `User with email ${email} already exists`,
      409, // HTTP Conflict
    );
    Object.setPrototypeOf(this, EmailAlreadyExistsException.prototype);
  }
}

/**
 * Lanzada cuando el formato del email es inválido
 */
export class InvalidEmailException extends DomainException {
  constructor(email: string) {
    super(
      'INVALID_EMAIL',
      `Email ${email} is invalid`,
      400, // HTTP Bad Request
    );
    Object.setPrototypeOf(this, InvalidEmailException.prototype);
  }
}

/**
 * Lanzada cuando la contraseña no cumple los requisitos mínimos
 */
export class InvalidPasswordException extends DomainException {
  constructor(reason: string) {
    super(
      'INVALID_PASSWORD',
      `Password is invalid: ${reason}`,
      400, // HTTP Bad Request
    );
    Object.setPrototypeOf(this, InvalidPasswordException.prototype);
  }
}

/**
 * Lanzada cuando no se encuentra un usuario
 */
export class UserNotFoundException extends DomainException {
  constructor(identifier: string) {
    super(
      'USER_NOT_FOUND',
      `User with identifier ${identifier} not found`,
      404, // HTTP Not Found
    );
    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
}
