import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
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

  @Prop({ required: true })
  next: string;

  @Prop({ type: Number, required: true })
  position: number;

  @Prop(
    raw({
      instagram: String,
      twitter: String,
      youtube: String,
    }),
  )
  socials: {
    instagram: string;
    twitter: string;
    youtube: string;
  };

  @Prop({ type: [{ type: String }], required: true })
  specialty: string[];

  @Prop({ required: true })
  name: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
