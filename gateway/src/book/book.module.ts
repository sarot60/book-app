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
          host: 'localhost',
          port: 6379,
        }
      },
    ]),
  ],
  controllers: [BookController],
})
export class BookModule { }