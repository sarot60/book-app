import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegisteredLogDocument = RegisteredLog & Document;

@Schema({
  collection: 'registered_logs',
  timestamps: true,
  versionKey: false
})
export class RegisteredLog {
  @Prop({ type: String })
  public userId: string;

  @Prop({ type: String })
  public username: string;

  @Prop({ type: String })
  public firstName: string;

  @Prop({ type: String })
  public lastName: string;

  @Prop({ type: Date })
  public createdAt: Date;

  @Prop({ type: Date })
  public updatedAt: Date;
}

export const RegisteredLogSchema = SchemaFactory.createForClass(RegisteredLog);