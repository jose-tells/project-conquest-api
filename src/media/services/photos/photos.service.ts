import { UpdatePhotoDto } from './../../dtos/photo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { notFoundTemplate } from 'src/utils/notFoundTemplate';
import { CreatePhotoDto } from '../../dtos/photo.dto';
import { Photo } from '../../entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {}

  findAll() {
    return this.photoModel.find().exec();
  }

  async create(payload: CreatePhotoDto) {
    const photoCreated = await this.photoModel.create(payload);
    return photoCreated;
  }

  async update(id: string, payload: UpdatePhotoDto) {
    const updatedPhoto = await this.photoModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    if (!updatedPhoto) {
      throw new NotFoundException(notFoundTemplate('Photo', id));
    }

    return updatedPhoto;
  }

  async remove(id: string) {
    const photoDeleted = await this.photoModel.findByIdAndDelete(id);

    if (!photoDeleted) {
      throw new NotFoundException(notFoundTemplate('Photo', id));
    }

    return photoDeleted;
  }
}
