import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export class AuthBannedGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const { user } = request;

    if (!user) {
      return false
    }

    if (user.banned) {
      throw new ForbiddenException('This user has been banned.');
    }

    return true
  }
}