import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateFiltersDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description:
      'Collection can receive just one of these three values: "photos", "illustrations", "videos", "profiles"  ',
  })
  collection: string;
}

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly filename: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly fileUrl: string;

  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  readonly size: number;

  @IsString()
  @ApiProperty()
  readonly mimetype?: string;

  @IsDate()
  @ApiProperty()
  readonly createdAt?: Date;

  @IsString()
  @ApiProperty()
  readonly isFromCollection: string;
}

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}
