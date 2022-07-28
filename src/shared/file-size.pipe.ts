import { BadRequestException } from '@nestjs/common';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { responseObject } from 'src/utils/responseObject';

@Injectable()
export class FileSizePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value?.size > 1000000) {
      throw new BadRequestException(
        responseObject('File exceeded the size limit', {}, false),
      );
    }

    return value;
  }
}
