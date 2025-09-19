import { CompanyModule } from './company.module';
import { AppService } from '@application/services/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@presenters/controllers/app/app.controller';
import { DatabaseModule } from './database.module';
import { CategoryModule } from './category.module';
import { ProductModule } from './product.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
