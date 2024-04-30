import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import { CreateUserDto } from './dto';
import { UserDocument } from './models/user.model';
import { UsersRepository } from './users.repository';
import { catchError, lastValueFrom } from 'rxjs';
import { NOTIFICATIONS_SERVICE, SEND_EMAIL } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ImagesService } from './images.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly imagesService: ImagesService,
    @Inject(NOTIFICATIONS_SERVICE) private notificationsClient: ClientProxy,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.usersRepository.create(userDto);

    await lastValueFrom(
      this.notificationsClient.send(SEND_EMAIL, { email: user.email }).pipe(
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    return user;
  }

  async getUser(userId: number): Promise<UserDocument> {
    const { data: user } = await axios.get(
      `https://reqres.in/api/users/${userId}`,
    );
    return user.data;
  }

  async getAvatar(userId: string): Promise<string> {
    const savedImage = await this.imagesService.getImage(userId);

    if (savedImage) {
      return savedImage.base64Data;
    }

    const { data: user } = await axios.get(
      `https://reqres.in/api/users/${userId}`,
    );

    const { data: imageData } = await axios.get(user.data.avatar, {
      responseType: 'arraybuffer',
    });

    const base64Data = Buffer.from(imageData, 'binary').toString('base64');

    await this.imagesService.saveImage(userId, base64Data);

    return base64Data;
  }

  async deleteAvatar(userId: string): Promise<void> {
    const savedImage = await this.imagesService.getImage(userId);

    if (!savedImage) {
      throw new NotFoundException('Avatar not found');
    }

    await this.imagesService.deleteImage(userId);
  }
}
