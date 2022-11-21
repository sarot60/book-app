import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  collection: 'categories',
  timestamps: true,
  versionKey: false
})
export class Category {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);