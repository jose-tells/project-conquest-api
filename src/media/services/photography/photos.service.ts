import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from 'src/media/dtos/photo.dto';
import { Photo } from 'src/media/entities/photo.entity';

@Injectable()
export class PhotosService {
  private photos: Photo[] = [];

  findAll() {
    return this.photos;
  }

  create(payload: CreatePhotoDto) {
    return payload;
  }
}
