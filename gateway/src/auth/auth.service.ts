import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";
import { MapExceptionFromRpc } from "../common/map-exception-from-rpc-to-http";

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  public async validateToken(token: string) {
    return await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'validate-token' }, token)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    )
  }
}