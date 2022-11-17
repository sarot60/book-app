import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from 'cache-manager';

@Injectable()
export class LoginLimitHelper {

  private readonly configService: ConfigService;
  private readonly cacheManager: Cache;

  constructor(configService: ConfigService, @Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.configService = configService;
    this.cacheManager = cacheManager;
  }

  public async saveLoginFailedCountToCache(reqIp: string): Promise<void> {
    let cacheValue: number = await this.cacheManager.get<number>(`loginCount-clientIp:${reqIp}`);

    if (typeof cacheValue === undefined || typeof cacheValue === null) {
      await this.cacheManager.set<number>(`loginCount-clientIp:${reqIp}`, 1, { ttl: 300 });
    } else {
      await this.cacheManager.set<number>(`loginCount-clientIp:${reqIp}`, ++cacheValue, { ttl: 300 });
    }

    if (cacheValue === 3) {
      await this.saveBlockLoginToCache(reqIp);
    }
  }

  private async saveBlockLoginToCache(reqIp: string): Promise<void> {
    await this.cacheManager.set<string>(
      `blockLogin-clientIp:${reqIp}`,
      'Login error 3 times',
      { ttl: this.configService.get<number>('LOGIN_FAILED_BLOCK_TIME') }
    );
    await this.cacheManager.del(`loginCount-clientIp:${reqIp}`);
  }

  public async deleteLoginFailedCountFromCache(reqIp: string): Promise<void> {
    const cacheValue: number = await this.cacheManager.get<number>(`loginCount-clientIp:${reqIp}`);
    if (cacheValue) {
      await this.cacheManager.del(`loginCount-clientIp:${reqIp}`);
    }
  }

}