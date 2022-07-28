import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Photo extends Document {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  caption: string;

  @Prop()
  orientation: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ type: Number, required: true })
  position: number;

  @Prop({ required: true })
  title: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
