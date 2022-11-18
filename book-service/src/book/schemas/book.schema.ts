import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({
  collection: 'books',
  timestamps: true,
  versionKey: false
})
export class Book {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: Number })
  stock: number;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number, default: 0 })
  sold: number;

  @Prop({ type: String, default: '' })
  imageFileName: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);