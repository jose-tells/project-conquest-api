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
import { CreateVideoDto, UpdateVideoDto } from '../../dtos/video.dto';
import { VideosService } from '../../services/videos/videos.service';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  async getVideos() {
    const videos = await this.videosService.findAll();

    return responseObject('Videos listed', videos, true);
  }

  @Post()
  async createVideo(@Body() payload: CreateVideoDto) {
    const createdVideo = await this.videosService.create(payload);

    return responseObject(
      `Video with id: ${createdVideo._id} successfully created`,
      createdVideo,
      true,
    );
  }

  @Put(':id')
  async updateVideo(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateVideoDto,
  ) {
    const updatedVideo = await this.videosService.update(id, payload);

    return responseObject(
      `Video with id: ${updatedVideo._id} successfully updated`,
      updatedVideo,
      true,
    );
  }

  @Delete(':id')
  async deleteVideo(@Param('id', MongoIdPipe) id: string) {
    const deletedVideo = await this.videosService.remove(id);

    return responseObject(
      `Video with id: ${deletedVideo._id} successfully deleted`,
      deletedVideo,
      true,
    );
  }
}
