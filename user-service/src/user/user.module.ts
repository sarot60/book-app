import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserExistsRule } from './validators/user-exists.validator';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthHelper } from '../auth/helpers/auth.helper';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisteredLog, RegisteredLogSchema } from './schemas/registered-log.schema';
import { LogedinLog, LogedinLogSchema } from './schemas/logedin-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LogedinLog.name, schema: LogedinLogSchema },
      { name: RegisteredLog.name, schema: RegisteredLogSchema },
    ]),
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [UserService, UserExistsRule, AuthHelper],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
