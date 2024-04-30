// src/images/images.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './models/image.model';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  async saveImage(userId: string, base64Data: string): Promise<ImageDocument> {
    const image = new this.imageModel({ userId, base64Data });
    return image.save();
  }

  async getImage(userId: string): Promise<ImageDocument> {
    return this.imageModel.findOne({ userId }).exec();
  }

  async deleteImage(userId: string): Promise<void> {
    await this.imageModel.findOneAndDelete({ userId }).exec();
  }
}
