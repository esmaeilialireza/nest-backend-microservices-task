import { NOTIFICATIONS_SERVICE, RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions(NOTIFICATIONS_SERVICE));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.startAllMicroservices();
}
bootstrap();
