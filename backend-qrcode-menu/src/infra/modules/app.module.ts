import { CompanyModule } from './company.module';
import { AppService } from '@application/services/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '@presenters/controllers/app/app.controller';
import { DatabaseModule } from './database.module';
import { CategoryModule } from './category.module';
import { ProductModule } from './product.module';
import { IngredientModule } from './ingredient.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed.module';
import { UploadModule } from './upload.module';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { IconsModule } from './icons.module';
import { SocialMediaModule } from './social-media.module';
import { LoggerService } from '@application/services/logger.service';
import { MailModule } from './mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { env } from '@infra/config/env';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueModule } from './queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        host: env.MAIL_HOST,
        port: env.MAIL_PORT,
        secure: env.MAIL_SSL,
        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASS,
        },
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ??
          'mongodb://localhost:27017/qrcode_menu?directConnection=true',
      }),
    }),
    CompanyModule,
    DatabaseModule,
    CategoryModule,
    ProductModule,
    IngredientModule,
    SeedModule,
    UploadModule,
    AuthModule,
    UsersModule,
    IconsModule,
    SocialMediaModule,
    MailModule,
    QueueModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
  exports: [LoggerService],
})
export class AppModule { }
