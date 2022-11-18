import { Types } from 'mongoose';

export interface ICreateBookRequest {
  name: string;
  category: string
  stock: number;
  price: number;
  sold: number;
  imageFileName: string | '';
}

export interface ICreateBookResponse {
  data: {
    _id: Types.ObjectId,
    name: string,
  };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IGetAllBookRequest {
  page: number;
  limit: number;
  search: string;
  searchBy: string;
  sort: string;
  sortBy: string;
}

export interface IGetAllBookResponse {
  data: {
    books: any[],
    total: number,
  };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IGetBookByIdRequest {
  _id: Types.ObjectId;
}

export interface IGetBookByIdResponse {
  data: { [key: string]: any };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IUpdateBookResponse {
  data: {
    _id: Types.ObjectId,
  }
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IDeleteBookRequest {
  _id: Types.ObjectId;
}

export interface IDeleteBookResponse {
  data: {
    _id: Types.ObjectId,
  };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IPurchaseBookRequest {
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  bookName: string;
  category: string;
  quantity: number;
  price: number;
}

export interface IPurchaseBookResponse {
  data: {
    _id: Types.ObjectId,
  };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}