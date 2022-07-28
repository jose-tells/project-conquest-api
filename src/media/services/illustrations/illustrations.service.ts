import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateIllustrationDto,
  UpdateIllustrationDto,
} from '../../dtos/illustration.dto';
import { Illustration } from '../../entities/illustration.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { notFoundTemplate } from 'src/utils/notFoundTemplate';

@Injectable()
export class IllustrationsService {
  constructor(
    @InjectModel(Illustration.name)
    private illustrationModel: Model<Illustration>,
  ) {}

  findAll() {
    return this.illustrationModel.find().exec();
  }

  async create(payload: CreateIllustrationDto) {
    const createdIllustration = await this.illustrationModel.create(payload);
    return createdIllustration;
  }

  async update(id: string, payload: UpdateIllustrationDto) {
    const updatedIllustration = await this.illustrationModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    if (!updatedIllustration) {
      throw new NotFoundException(notFoundTemplate('Illustration', id));
    }

    return updatedIllustration;
  }

  async remove(id: string) {
    const deletedIllustration = await this.illustrationModel.findByIdAndDelete(
      id,
    );

    if (!deletedIllustration) {
      throw new NotFoundException(notFoundTemplate('Illustration', id));
    }

    return deletedIllustration;
  }
}
