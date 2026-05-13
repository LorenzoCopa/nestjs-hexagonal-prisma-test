import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true, // elimina propiedades no definidas en el DTO
  forbidNonWhitelisted: true, // lanza error si hay propiedades no permitidas
  transformOptions: {
    enableImplicitConversion: true, // convierte tipos automáticamente según el DTO
  },
};
