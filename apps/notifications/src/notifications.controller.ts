import { RmqService, SEND_EMAIL } from '@app/common';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(SEND_EMAIL)
  async sendOtpWithSms(
    @Payload() payload,
    @Ctx() context: RmqContext,
  ): Promise<boolean> {
    return await this.notificationsService
      .sendEmail(payload)
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        this.rmqService.ack(context);
      });
  }
}
