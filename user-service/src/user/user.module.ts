import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserExistsRule } from './validators/user-exists.validator';
import { User, UserSchema } from './schemas/user.schema';
import { RegisteredLog, RegisteredLogSchema } from './schemas/registered-log.schema';
import { LogedinLog, LogedinLogSchema } from './schemas/logedin-log.schema';
import { AuthHelper } from '../auth/helpers/auth.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LogedinLog.name, schema: LogedinLogSchema },
      { name: RegisteredLog.name, schema: RegisteredLogSchema },
    ]),
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, UserExistsRule, AuthHelper],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
