import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseConfigService } from './config/mongoose.config';

@Module({
  imports: [
    BookModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
