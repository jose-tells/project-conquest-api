import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVideoDto } from '../../dtos/video.dto';
import { VideosService } from '../../services/videos/videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  getIllustrations() {
    return {
      message: 'Videos listed',
      data: this.videosService.findAll(),
    };
  }

  @Post()
  createIllustration(@Body() payload: CreateVideoDto) {
    const id = 1;
    const videoCreated = this.videosService.create(payload);

    return {
      message: `Video created with id: ${id}`,
      data: videoCreated,
    };
  }
}
