import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateIllustrationDto } from '../../dtos/illustration.dto';
import { IllustrationsService } from '../../services/illustrations/illustrations.service';

@Controller('illustrations')
export class IllustrationsController {
  constructor(private illustrationsService: IllustrationsService) {}

  @Get()
  getIllustrations() {
    return {
      message: 'Illustrations listed',
      data: this.illustrationsService.findAll(),
    };
  }

  @Post()
  createIllustration(@Body() payload: CreateIllustrationDto) {
    const id = 1;
    const illustrationCreated = this.illustrationsService.create(payload);

    return {
      message: `Illustration created with id: ${id}`,
      data: illustrationCreated,
    };
  }
}
