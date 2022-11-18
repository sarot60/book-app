import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateBookRequestDto } from './create-book-request.dto';

export class UpdateBookRequestDto extends PartialType(CreateBookRequestDto) {
  _id: Types.ObjectId;
}