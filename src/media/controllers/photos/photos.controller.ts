import { ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MongoIdPipe } from 'src/shared/mongo-id.pipe';
import { responseObject } from 'src/utils/responseObject';
import { CreatePhotoDto, UpdatePhotoDto } from '../../dtos/photo.dto';
import { PhotosService } from '../../services/photos/photos.service';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get()
  async getPhotos() {
    const photosListed = await this.photosService.findAll();
    return responseObject('Photos listed', photosListed, true);
  }

  @Post()
  async createPhoto(@Body() payload: CreatePhotoDto) {
    const createdPhoto = await this.photosService.create(payload);

    return responseObject(
      `Photo with id: ${createdPhoto._id} successfully created`,
      createdPhoto,
      true,
    );
  }

  @Put(':id')
  async updatePhoto(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdatePhotoDto,
  ) {
    const updatedPhoto = await this.photosService.update(id, payload);

    return responseObject(
      `Photo with id: ${updatedPhoto._id} successfully updated`,
      updatedPhoto,
      true,
    );
  }

  @Delete(':id')
  async deletePhoto(@Param('id', MongoIdPipe) id: string) {
    const deletedPhoto = await this.photosService.remove(id);

    return responseObject(
      `Photo with id ${deletedPhoto._id} successfully deleted`,
      deletedPhoto,
      true,
    );
  }
}
