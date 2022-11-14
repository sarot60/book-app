import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const appPort: number = configService.get('APP_PORT');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const logger = new Logger('Main: user-service');
  await app.listen(appPort, () => {
    logger.debug(`HTTP Application is running on port : ${appPort}`);
  });
}
bootstrap();
