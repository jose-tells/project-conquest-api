import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Media extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ type: Number, required: true })
  size: number;

  @Prop()
  mimetype: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop()
  isFromCollection: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
