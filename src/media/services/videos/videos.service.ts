import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { notFoundTemplate } from 'src/utils/notFoundTemplate';
import { CreateVideoDto, UpdateVideoDto } from '../../dtos/video.dto';
import { Video } from '../../entities/video.entity';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  findAll() {
    return this.videoModel.find().exec();
  }

  async create(payload: CreateVideoDto) {
    const videoCreated = await this.videoModel.create(payload);
    return videoCreated;
  }

  async update(id: string, payload: UpdateVideoDto) {
    const updatedVideo = await this.videoModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    if (!updatedVideo) {
      throw new NotFoundException(notFoundTemplate('Video', id));
    }

    return updatedVideo;
  }

  async remove(id: string) {
    const deletedVideo = await this.videoModel.findByIdAndDelete(id);

    if (!deletedVideo) {
      throw new NotFoundException(notFoundTemplate('Video', id));
    }

    return deletedVideo;
  }
}
