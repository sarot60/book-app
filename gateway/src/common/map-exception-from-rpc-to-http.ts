import {
  HttpStatus,
  GoneException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  ImATeapotException,
  BadGatewayException,
  BadRequestException,
  UnauthorizedException,
  NotAcceptableException,
  NotImplementedException,
  RequestTimeoutException,
  GatewayTimeoutException,
  PayloadTooLargeException,
  MethodNotAllowedException,
  PreconditionFailedException,
  ServiceUnavailableException,
  InternalServerErrorException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
  HttpVersionNotSupportedException,
} from "@nestjs/common"
import { Observable } from "rxjs"

export class MapExceptionFromRpc {
  public mapException(error: any): Observable<any> {
    switch (error.statusCode) {
      case HttpStatus.BAD_REQUEST: throw new BadRequestException(error.message)
      case HttpStatus.UNAUTHORIZED: throw new UnauthorizedException(error.message)
      case HttpStatus.NOT_FOUND: throw new NotFoundException(error.message)
      case HttpStatus.FORBIDDEN: throw new ForbiddenException(error.message)
      case HttpStatus.NOT_ACCEPTABLE: throw new NotAcceptableException(error.message)
      case HttpStatus.REQUEST_TIMEOUT: throw new RequestTimeoutException(error.message)
      case HttpStatus.CONFLICT: throw new ConflictException(error.message)
      case HttpStatus.GONE: throw new GoneException(error.message)
      case HttpStatus.HTTP_VERSION_NOT_SUPPORTED: throw new HttpVersionNotSupportedException(error.message)
      case HttpStatus.PAYLOAD_TOO_LARGE: throw new PayloadTooLargeException(error.message)
      case HttpStatus.UNSUPPORTED_MEDIA_TYPE: throw new UnsupportedMediaTypeException(error.message)
      case HttpStatus.UNPROCESSABLE_ENTITY: throw new UnprocessableEntityException(error.message)
      case HttpStatus.INTERNAL_SERVER_ERROR: throw new InternalServerErrorException(error.message)
      case HttpStatus.NOT_IMPLEMENTED: throw new NotImplementedException(error.message)
      case HttpStatus.I_AM_A_TEAPOT: throw new ImATeapotException(error.message)
      case HttpStatus.METHOD_NOT_ALLOWED: throw new MethodNotAllowedException(error.message)
      case HttpStatus.BAD_GATEWAY: throw new BadGatewayException(error.message)
      case HttpStatus.SERVICE_UNAVAILABLE: throw new ServiceUnavailableException(error.message)
      case HttpStatus.GATEWAY_TIMEOUT: throw new GatewayTimeoutException(error.message)
      case HttpStatus.PRECONDITION_FAILED: throw new PreconditionFailedException(error.message)
    }

    throw new InternalServerErrorException();
  }
}