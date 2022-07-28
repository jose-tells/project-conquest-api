import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import {
  CreateFiltersDto,
  CreateMediaDto,
  UpdateMediaDto,
} from './../../dtos/media.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Media } from 'src/media/entities/media.entity';
import { notFoundTemplate } from 'src/utils/notFoundTemplate';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<Media>) {}

  async findAll(query: CreateFiltersDto) {
    const { collection } = query;

    const filters: FilterQuery<Media> = {};

    if (collection) {
      filters.isFromCollection = collection;
    }

    const media = await this.mediaModel.find(filters).exec();
    return media;
  }

  async create(payload: CreateMediaDto) {
    const createdMedia = await this.mediaModel.create(payload);
    return createdMedia;
  }

  async update(id: string, payload: UpdateMediaDto) {
    const updatedMedia = await this.mediaModel.findByIdAndUpdate(
      id,
      {
        $set: payload,
      },
      {
        new: true,
      },
    );

    if (!updatedMedia) {
      throw new NotFoundException({
        message: notFoundTemplate('Media', id),
        data: {},
        success: false,
      });
    }

    return updatedMedia;
  }

  async remove(id: string) {
    const deletedMedia = await this.mediaModel.findByIdAndDelete(id);

    if (!deletedMedia) {
      throw new NotFoundException({
        message: notFoundTemplate('Media', id),
        data: {},
        success: false,
      });
    }

    return deletedMedia;
  }
}
