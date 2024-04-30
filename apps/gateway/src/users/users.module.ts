import {
  ConfigModule,
  DatabaseModule,
  NOTIFICATIONS_SERVICE,
  RmqModule,
} from '@app/common';
import { Module } from '@nestjs/common';
import { UserDocument, UserSchema } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { ImagesService } from './images.service';
import { Image, ImageSchema } from './models/image.model';

@Module({
  imports: [
    ConfigModule,
    RmqModule.register({ name: NOTIFICATIONS_SERVICE }),
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
    DatabaseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [ConfigService, UsersService, UsersRepository, ImagesService],
})
export class UsersModule {}
