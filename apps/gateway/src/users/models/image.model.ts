// src/images/schemas/image.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  base64Data: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
