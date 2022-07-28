import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Illustration extends Document {
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

  @Prop({ type: Number, required: true })
  position: number;

  @Prop({ required: true })
  title: string;
}

export const IllustrationSchema = SchemaFactory.createForClass(Illustration);
