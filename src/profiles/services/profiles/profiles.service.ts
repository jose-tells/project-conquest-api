import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { notFoundTemplate } from 'src/utils/notFoundTemplate';
import { CreateProfileDto, UpdateProfileDto } from '../../dtos/profile.dto';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  findAll() {
    return this.profileModel.find().exec();
  }

  async create(payload: CreateProfileDto) {
    const createdProfile = await this.profileModel.create(payload);
    return createdProfile;
  }

  async update(id: string, payload: UpdateProfileDto) {
    const updatedProfile = await this.profileModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    if (!updatedProfile) {
      throw new NotFoundException(notFoundTemplate('Profile', id));
    }

    return updatedProfile;
  }

  async remove(id: string) {
    const deletedProfile = await this.profileModel.findByIdAndDelete(id);

    if (!deletedProfile) {
      throw new NotFoundException(notFoundTemplate('Profile', id));
    }

    return deletedProfile;
  }
}
