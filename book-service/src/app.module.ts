import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { BookModule } from './book/book.module';
import { MongooseConfigService } from './config/mongoose.config';

@Module({
  imports: [
    BookModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
  ],
})
export class AppModule {}
