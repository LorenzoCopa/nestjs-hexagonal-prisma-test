import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { VALIDATION_PIPE_OPTIONS } from './pipes/validation.pipe';

@Module({
  providers: [
    {
      provide: APP_PIPE, // Registra un pipe global.
      useValue: new ValidationPipe(VALIDATION_PIPE_OPTIONS), // Nuestras reglas
    },

    {
      provide: APP_INTERCEPTOR, // Registra un interceptor global
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class CommonModule {}
