// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Janet', description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @ApiProperty({ example: 'Weaver', description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty({
    example: 'janet.weaver@reqres.in',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'https://reqres.in/img/faces/2-image.jpg',
    description: 'The avatar URL of the user',
  })
  @IsUrl()
  readonly avatar: string;

  @ApiProperty({
    example: 2,
    description: 'ID of user',
  })
  @IsNumber()
  readonly id: number;
}
