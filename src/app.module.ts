import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { AppConfigModule } from './config/app-config.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AppConfigModule, CommonModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [
    // Registrar el filtro de excepciones de dominio globalmente
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
