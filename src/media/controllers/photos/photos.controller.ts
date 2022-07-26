import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePhotoDto } from 'src/media/dtos/photo.dto';
import { PhotosService } from 'src/media/services/photography/photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}
  @Get()
  getPhotos() {
    return {
      message: 'Photos listed',
      data: this.photosService.findAll(),
    };
  }

  @Post()
  createPhoto(@Body() payload: CreatePhotoDto) {
    const id = 1;
    const photoCreated = this.photosService.create(payload);
    return {
      message: `Photo created with id: ${id}`,
      data: photoCreated,
    };
  }
}
