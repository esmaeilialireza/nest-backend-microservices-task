import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { UserDocument } from './models/user.model';
import { ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDocument> {
    return await this.usersService.createUser(user);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.usersService.getUser(id);
  }

  @Get(':id/avatar')
  async getAvatar(@Param('id') id: string, @Res() res: Response) {
    const base64Image = await this.usersService.getAvatar(id);
    return res.type('image/jpeg').send(Buffer.from(base64Image, 'base64'));
  }

  @Delete(':id/avatar')
  async deleteAvatar(@Param('id') id: string) {
    await this.usersService.deleteAvatar(id);
    return 'Avatar deleted successfully';
  }
}
