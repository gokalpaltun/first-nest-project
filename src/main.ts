import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/v1/api")
  const options = new DocumentBuilder()
    .setTitle('PowerBank API')
    .setDescription('Power Bank Api is a monolithic-based application service library.')
    .setVersion('1.0')
    .addTag('Powerful API')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3001);
}
bootstrap();
