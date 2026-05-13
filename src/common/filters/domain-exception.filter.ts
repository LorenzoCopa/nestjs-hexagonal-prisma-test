import { DomainException } from '@/modules/users/domain/exceptions/user.exceptions';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * Filtro global de excepciones.
 * Captura todas las excepciones de dominio y las convierte a respuestas HTTP.
 *
 * Se ejecuta cuando cualquier Use Case lanza una DomainException.
 */
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      error: {
        code: exception.code,
        message: exception.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
