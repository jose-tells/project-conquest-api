import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUrl, Min } from 'class-validator';

export class CreateVideoDto {
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

  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  readonly position: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isCover: boolean;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly thumbnail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;
}

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
