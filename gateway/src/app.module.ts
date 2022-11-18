import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, UserModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
