import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  createMongooseOptions(): MongooseModuleOptions {
    const db: { user: string, password: string, host: string, name: string } = {
      user: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      host: this.configService.get<string>('DATABASE_HOST'),
      name: this.configService.get<string>('DATABASE_NAME'),
    }
    const mongodbUri = `mongodb+srv://${db.user}:${db.password}@${db.host}/${db.name}?retryWrites=true&w=majority`;
    return {
      uri: mongodbUri
    };
  }
}