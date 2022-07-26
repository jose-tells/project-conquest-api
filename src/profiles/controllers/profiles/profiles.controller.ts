import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProfileDto } from '../../dtos/profile.dto';
import { ProfilesService } from '../../services/profiles/profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  getVideos() {
    return {
      message: 'Profiles listed',
      data: this.profilesService.findAll(),
    };
  }

  @Post()
  createVideo(@Body() payload: CreateProfileDto) {
    const id = 1;
    const profileCreated = this.profilesService.create(payload);

    return {
      message: `Profile created with id ${id}`,
      data: profileCreated,
    };
  }
}
