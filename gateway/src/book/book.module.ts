import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { BookController } from './book.controller';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
        }
      },
    ]),
  ],
  controllers: [BookController],
})
export class BookModule { }