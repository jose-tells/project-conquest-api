import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @ApiProperty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly caption: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly orientation: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly fileUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly filename: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => String)
  @ApiProperty()
  readonly specialty: string[];

  @IsObject({
    each: true,
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly socials: {
    instagram: string;
    twitter: string;
    youtube: string;
  };

  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  readonly position: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
