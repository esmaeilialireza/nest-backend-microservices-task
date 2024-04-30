import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async sendEmail(payload) {
    console.log({ payload });

    return true;
  }
}
