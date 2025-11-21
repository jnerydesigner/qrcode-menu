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

const databaseProvider = process.env.DATABASE_PROVIDER ?? 'prisma';
const mongooseImports =
  databaseProvider === 'mongo'
    ? [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            uri:
              configService.get<string>('MONGODB_URI') ??
              'mongodb://localhost:27017/qrcode_menu?directConnection=true',
          }),
        }),
      ]
    : [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CompanyModule,
    DatabaseModule,
    CategoryModule,
    ProductModule,
    IngredientModule,
    ...mongooseImports,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
