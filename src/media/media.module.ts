import { Module } from '@nestjs/common';
import { PhotosController } from './controllers/photos/photos.controller';
import { PhotosService } from './services/photography/photos.service';
import { VideosController } from './controllers/videos/videos.controller';
import { IllustrationsController } from './controllers/illustrations/illustrations.controller';
import { IllustrationsService } from './services/illustrations/illustrations.service';
import { VideosService } from './services/videos/videos.service';

@Module({
  controllers: [PhotosController, VideosController, IllustrationsController],
  providers: [PhotosService, IllustrationsService, VideosService],
})
export class MediaModule {}
