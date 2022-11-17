import { CACHE_MANAGER, CanActivate, ExecutionContext, ForbiddenException, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Cache } from 'cache-manager';

export class LoginLimitGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const clientIp: string = request.ip.split(':').join('/');

    const cacheValue: number = await this.cacheManager.get<number>(`blockLogin-clientIp:${clientIp}`);

    if (cacheValue) {
      throw new ForbiddenException('Unable to login, please wait 10 seconds.');
    }

    return true
  }
}