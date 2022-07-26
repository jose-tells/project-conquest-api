import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../../dtos/profile.dto';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class ProfilesService {
  private profiles: Profile[] = [];

  findAll() {
    return this.profiles;
  }

  create(payload: CreateProfileDto) {
    return payload;
  }
}
