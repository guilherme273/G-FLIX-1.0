import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://g-flix-ts.vercel.app',
      'https://guilherme-feitosa-cunha.vercel.app',
      'http://localhost:5174',
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    credentials: true,
  });
  await app.listen(process.env.SYSTEMPORT ?? 3000);
}
bootstrap().catch((e) => console.log(e));
