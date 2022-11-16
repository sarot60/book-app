import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('rpc exception')
    console.log(exception.getError())
    const errorPayload = {
      message: exception.message,
      e: 'test',
    }
    // return throwError(() => errorPayload);
    return throwError(() => exception.getError());
  }
}
