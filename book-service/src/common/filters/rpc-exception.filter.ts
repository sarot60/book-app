import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('rpc exception')
    console.log(exception.getError())
    return throwError(() => exception.getError());
  }
}
