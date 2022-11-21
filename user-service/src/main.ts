import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { Http2RpcExceptionFilter } from './common/filters/http2rpc-exception.filter';

async function bootstrap() {
  const configService = new ConfigService();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    },
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new Http2RpcExceptionFilter());

  await app.listen();
}
bootstrap();
