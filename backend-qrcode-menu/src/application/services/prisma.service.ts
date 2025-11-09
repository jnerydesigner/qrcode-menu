import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async onModuleInit() {
    const databaseProvider =
      this.configService.get<string>('DATABASE_PROVIDER') ?? 'prisma';

    if (databaseProvider === 'prisma') {
      await this.$connect();
    }
  }
}
