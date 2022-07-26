import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly caption: string;

  @IsObject()
  @IsNotEmpty()
  readonly dimensions: {
    height: number;
    width: number;
  };

  @IsUrl()
  @IsNotEmpty()
  readonly fileUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly filename: string;

  @IsArray()
  @IsNotEmpty()
  readonly specialty: string[];

  @IsObject()
  @IsNotEmpty()
  readonly socials: {
    instagram: string;
    twitter: string;
    youtube: string;
  };

  @Min(0)
  @IsNotEmpty()
  readonly position: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
