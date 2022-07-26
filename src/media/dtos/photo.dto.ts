import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsObject, IsString, IsUrl, Min } from 'class-validator';

export class CreatePhotoDto {
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

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {}
