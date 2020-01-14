import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// import mongoose from 'mongoose';
// mongoose.connect('mongodb://localhost/nest-test-project-db')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
