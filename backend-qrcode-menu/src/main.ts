import { LoggerService } from '@application/services/logger.service';
import { JwtAuthGuard } from '@infra/guard/jwt-auth.guard';
import { LoggingInterceptor } from '@infra/interceptors/logging.interceptor';
import { AppModule } from '@infra/modules/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(LoggerService)));

  // 🔥 CORS correto e suficiente
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  });

  // 🔥 Guard global corretamente configurado
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  // Swagger
  const configSwager = new DocumentBuilder()
    .setTitle('QR Code Menu')
    .setDescription('Tela de documentação da API do sistema de cardápio digital por QR Code')
    .setVersion('1.0')
    .addTag('QRCodeMenu')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token'
    )
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwager);

  SwaggerModule.setup('api', app, documentFactory);

  const config = app.get(ConfigService);
  const port = config.get<number>('SERVER_PORT') ?? 3000;

  const logger = new Logger('Main');
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();
