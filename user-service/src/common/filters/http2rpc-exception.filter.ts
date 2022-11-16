import { ExceptionFilter, Catch, RpcExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class Http2RpcExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return throwError(() => exception.getResponse());
    // return new RpcException(exception.getResponse());
  }
}