import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { BookController } from './book.controller';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: 'BOOK_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          }
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BookController],
})
export class BookModule { }