import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';
import { UserDocument, UserSchema } from '../models/user.model';
import { CreateUserDto } from '../dto';
import { Types } from 'mongoose';
import {
  ConfigModule,
  DatabaseModule,
  NOTIFICATIONS_SERVICE,
  RmqModule,
} from '@app/common';
import { ImageSchema, Image } from '../models/image.model';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../users.repository';
import { ImagesService } from '../images.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let response: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    response = createMock<Response>();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
    };
    const mockUser: UserDocument = {
      _id: new Types.ObjectId('65aa5ce97f9d2b4eebcd3732'),
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
    };
    jest.spyOn(usersService, 'createUser').mockResolvedValueOnce(mockUser);

    const result = await controller.createUser(createUserDto);

    expect(result).toBe(mockUser);
    expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should get a user by ID', async () => {
    const userId = 2;
    const mockUser: UserDocument = {
      _id: new Types.ObjectId('65aa5ce97f9d2b4eebcd3732'),
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
    };
    jest.spyOn(usersService, 'getUser').mockResolvedValueOnce(mockUser);

    const result = await controller.getUser(userId);

    expect(result).toBe(mockUser);
    expect(usersService.getUser).toHaveBeenCalledWith(userId);
  });

  it('should get the user avatar', async () => {
    const userId = '2';
    const mockBase64Image = 'data:image/jpeg;base64,...';
    jest
      .spyOn(usersService, 'getAvatar')
      .mockResolvedValueOnce(mockBase64Image);

    await controller.getAvatar(userId, response);

    expect(response.type).toBeCalledWith('image/jpeg');
  });

  it('should delete the user avatar', async () => {
    const userId = 'user456';
    jest.spyOn(usersService, 'deleteAvatar').mockResolvedValueOnce();

    const result = await controller.deleteAvatar(userId);

    expect(result).toBe('Avatar deleted successfully');
    expect(usersService.deleteAvatar).toHaveBeenCalledWith(userId);
  });
});
