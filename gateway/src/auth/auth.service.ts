import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";
import { MapExceptionFromRpc } from "../common/map-exception-from-rpc-to-http";
import { ValidateTokenRequestDto } from "./dto/validate-token-request.dto";
import { ValidateTokenResponseDto } from "./dto/validate-token-response.dto";

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  public async validateToken(token: string): Promise<ValidateTokenResponseDto> {
    const request: ValidateTokenRequestDto = { token };
    return await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'validate-token' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    )
  }
}