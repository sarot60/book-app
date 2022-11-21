import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type PurchaseBookDocument = PurchaseBook & Document;

@Schema({
  collection: 'purchase_books',
  timestamps: true,
  versionKey: false
})
export class PurchaseBook {
  @Prop({ type: Types.ObjectId })
  userId: string;

  @Prop({ type: Types.ObjectId })
  bookId: string;

  @Prop({ type: String })
  bookName: string;

  @Prop({ type: Array })
  categories: string[];

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const PurchaseBookSchema = SchemaFactory.createForClass(PurchaseBook);