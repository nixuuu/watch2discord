import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];
  const LOG_LEVEL = +(process.env.LOG_LEVEL ?? '4');
  logLevels.splice(LOG_LEVEL);

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: logLevels,
  });
  await app.init();
}
bootstrap();
