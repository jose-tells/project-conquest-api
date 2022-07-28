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
import {
  CreateIllustrationDto,
  UpdateIllustrationDto,
} from '../../dtos/illustration.dto';
import { IllustrationsService } from '../../services/illustrations/illustrations.service';

@ApiTags('Illustrations')
@Controller('illustrations')
export class IllustrationsController {
  constructor(private illustrationsService: IllustrationsService) {}

  @Get()
  async getIllustrations() {
    const illustrations = await this.illustrationsService.findAll();

    return responseObject('Illustrations listed', illustrations, true);
  }

  @Post()
  async createIllustration(@Body() payload: CreateIllustrationDto) {
    const createdIllustration = await this.illustrationsService.create(payload);

    return responseObject(
      `Illustration with id: ${createdIllustration._id} successfully created`,
      createdIllustration,
      true,
    );
  }

  @Put(':id')
  async updateIllustration(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateIllustrationDto,
  ) {
    const updatedIllustration = await this.illustrationsService.update(
      id,
      payload,
    );

    return responseObject(
      `Illustration with id: ${updatedIllustration._id} successfully updated`,
      updatedIllustration,
      true,
    );
  }

  @Delete(':id')
  async deleteIllustration(@Param('id', MongoIdPipe) id: string) {
    const deletedIllustration = await this.illustrationsService.remove(id);

    return responseObject(
      `Illustration with id: ${deletedIllustration._id} successfully deleted`,
      deletedIllustration,
      true,
    );
  }
}
