import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { PreloadService } from './helpers/preload.data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  const preloadService = app.get(PreloadService);
  await preloadService.preloadCategoriesAndProducts();
  await app.listen(3000);
  console.log(`Server listening on port 3000`);
}
bootstrap();
