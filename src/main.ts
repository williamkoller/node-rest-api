import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');
  const port = process.env.PORT || 3002;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => logger.log(`Server listening at: ${port}`));
}
bootstrap();
