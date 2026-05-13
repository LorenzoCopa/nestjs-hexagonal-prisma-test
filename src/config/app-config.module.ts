import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, jwtConfig } from './app.config';
import { ENV_VALIDATION_SCHEMA } from './app.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, jwtConfig],
      expandVariables: true,
      validationSchema: ENV_VALIDATION_SCHEMA,
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
