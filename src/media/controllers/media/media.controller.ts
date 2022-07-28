import { ApiTags } from '@nestjs/swagger';

import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateFiltersDto,
  CreateMediaDto,
  UpdateMediaDto,
} from 'src/media/dtos/media.dto';
import { MediaService } from '../../services/media/media.service';
import { responseObject } from 'src/utils/responseObject';
import { MongoIdPipe } from 'src/shared/mongo-id.pipe';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  async getMedia(@Query() query: CreateFiltersDto) {
    const media = await this.mediaService.findAll(query);

    return responseObject('Media listed', media, true);
  }

  @Post()
  async createMedia(@Body() payload: CreateMediaDto) {
    const createdMedia = await this.mediaService.create(payload);

    return responseObject(
      `Media with id: ${createdMedia._id} successfully created`,
      createdMedia,
      true,
    );
  }

  @Put(':id')
  async updateMedia(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateMediaDto,
  ) {
    const updatedMedia = await this.mediaService.update(id, payload);

    return responseObject(
      `Media with id: ${updatedMedia._id} successfully updated`,
      updatedMedia,
      true,
    );
  }

  @Delete(':id')
  async deleteMedia(@Param('id', MongoIdPipe) id: string) {
    const deletedMedia = await this.mediaService.remove(id);

    return responseObject(
      `Media with id: ${id} successfully deleted`,
      deletedMedia,
      true,
    );
  }
}
