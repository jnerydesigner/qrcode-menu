import { AppModule } from '@infra/modules/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  const config = app.get(ConfigService);
  const port = config.get<number>('SERVER_PORT') ?? 3000;
  const logger = new Logger('Main');
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap();
