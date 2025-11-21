import { SeedService } from '@application/services/seed.service';
import { AppModule } from '@infra/modules/app.module';
import { SeedModule } from '@infra/modules/seed.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seeder = app.select(SeedModule).get(SeedService);

  await seeder.run();

  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Erro ao rodar seed:', err);
  process.exit(1);
});
