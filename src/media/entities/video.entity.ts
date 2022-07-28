import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Video extends Document {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  caption: string;

  @Prop({ required: true })
  orientation: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ type: Boolean, required: true })
  isCover: boolean;

  @Prop({ type: Number, required: true })
  position: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumbnail: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
