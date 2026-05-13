import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('config', () => ({
  databaseURL: process.env.DATABASE_URL,
  port: parseInt(process.env.PORT ?? '3002', 10),
}));

export const jwtConfig = registerAs('jwt', () => ({
  token: process.env.TOKEN,
}));
