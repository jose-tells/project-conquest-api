import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateVideoDto {
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

  @Min(0)
  @IsNotEmpty()
  readonly position: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isCover: boolean;

  @IsUrl()
  @IsNotEmpty()
  readonly thumbnail: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
