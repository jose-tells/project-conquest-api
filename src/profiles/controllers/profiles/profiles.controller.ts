import { ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MongoIdPipe } from 'src/shared/mongo-id.pipe';
import { responseObject } from 'src/utils/responseObject';
import { CreateProfileDto, UpdateProfileDto } from '../../dtos/profile.dto';
import { ProfilesService } from '../../services/profiles/profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  async getProfiles() {
    const profilesListed = await this.profilesService.findAll();

    return responseObject('Profiles listed', profilesListed, true);
  }

  @Post()
  async createProfiles(@Body() payload: CreateProfileDto) {
    const createdProfile = await this.profilesService.create(payload);

    return responseObject(
      `Profile with id: ${createdProfile._id} successfully created`,
      createdProfile,
      true,
    );
  }

  @Put(':id')
  async updateProfile(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProfileDto,
  ) {
    const updatedProfile = await this.profilesService.update(id, payload);

    return responseObject(
      `Profile with id: ${updatedProfile._id} successfully updated`,
      updatedProfile,
      true,
    );
  }

  @Delete(':id')
  async deleteProfile(@Param('id', MongoIdPipe) id: string) {
    const deletedProfile = await this.profilesService.remove(id);

    return {
      message: `Profile with id: ${deletedProfile} successfully deleted`,
      data: deletedProfile,
      success: true,
    };
  }
}
