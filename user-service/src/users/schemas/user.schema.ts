import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../role.enum';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: true,
  versionKey: false
})
export class User {
  @Prop({ type: String, required: true, unique: true })
  public username: string;

  @Prop({ type: String, required: true })
  public password: string;

  @Prop({ type: String, required: true })
  public firstName: string;

  @Prop({ type: String, required: true })
  public lastName: string;

  @Prop({ type: Array, required: true })
  public roles: Role[];

  @Prop({ type: Boolean, required: true })
  public banned: boolean;

  @Prop({ type: Date })
  public createdAt: Date;

  @Prop({ type: Date })
  public updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);