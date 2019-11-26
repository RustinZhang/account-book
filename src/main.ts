import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
  );
  app.enableCors({
    origin: '*',
  });
  await app.listen(3000);
}

bootstrap();
