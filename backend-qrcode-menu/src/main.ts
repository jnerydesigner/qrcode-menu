import { AppModule } from '@infra/modules/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  const configSwager = new DocumentBuilder()
    .setTitle('QR Code Menu')
    .setDescription(
      'Tela de documentação da API do sistema de cardápio digital por QR Code',
    )
    .setVersion('1.0')
    .addTag('QRCodeMenu')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    }, 'access-token')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwager);
  SwaggerModule.setup('api', app, documentFactory);

  const config = app.get(ConfigService);
  const port = config.get<number>('SERVER_PORT') ?? 3000;
  const logger = new Logger('Main');
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap();
