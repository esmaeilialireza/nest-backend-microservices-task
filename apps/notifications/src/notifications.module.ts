import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule, NOTIFICATIONS_SERVICE, RmqModule } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule, RmqModule.register({ name: NOTIFICATIONS_SERVICE })],
  controllers: [NotificationsController],
  providers: [NotificationsService, ConfigService],
})
export class NotificationsModule {}
