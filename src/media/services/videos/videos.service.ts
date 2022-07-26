import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from '../../dtos/video.dto';
import { Video } from '../../entities/video.entity';

@Injectable()
export class VideosService {
  private illustrations: Video[] = [
    {
      author: 'Jose Marquinez',
      caption: 'A great Video',
      dimensions: {
        width: 0,
        height: 0,
      },
      filename: 'video.jpg',
      fileUrl: 'video.com',
      position: 0,
      isCover: true,
      thumbnail: 'thumbnail.com',
      title: 'Video',
    },
  ];

  findAll() {
    return this.illustrations;
  }

  create(payload: CreateVideoDto) {
    return payload;
  }
}
