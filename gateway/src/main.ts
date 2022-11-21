import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('user')
    .addTag('book')
    .addTag('auth')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('book-app-api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appPort = app.get(ConfigService).get<number>('APP_PORT');

  await app.listen(appPort);
}
bootstrap();
