import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
        }
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule { }