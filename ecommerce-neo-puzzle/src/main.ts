import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
  .setTitle('E-commerce Neo Puzzle')
  .setDescription('API for E-commerce Neo Puzzle contructed with NestJS, TypeORM and PostgreSQL.')
  .setVersion('0.0.1')
  .addBearerAuth()
  .build();
  const documentSwagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentSwagger);
  await app.listen(3000);
  console.log(`Server listening on port 3000`);
}
bootstrap();
