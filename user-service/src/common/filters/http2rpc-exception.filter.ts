import { throwError } from 'rxjs';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class Http2RpcExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return throwError(() => exception.getResponse());
    // return new RpcException(exception.getResponse());
  }
}