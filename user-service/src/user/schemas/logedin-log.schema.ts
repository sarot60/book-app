import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogedinLogDocument = LogedinLog & Document;

@Schema({
  collection: 'logedin_logs',
  timestamps: true,
  versionKey: false
})
export class LogedinLog {
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

export const LogedinLogSchema = SchemaFactory.createForClass(LogedinLog);