import { IsNotEmpty, IsString, IsUrl, Min } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateIllustrationDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;
}

export class UpdateIllustrationDto extends PartialType(CreateIllustrationDto) {}
