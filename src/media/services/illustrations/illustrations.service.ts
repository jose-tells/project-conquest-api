import { Injectable } from '@nestjs/common';
import { CreateIllustrationDto } from '../../dtos/illustration.dto';
import { Illustration } from '../../entities/illustration.entity';

@Injectable()
export class IllustrationsService {
  private illustrations: Illustration[] = [];

  findAll() {
    return this.illustrations;
  }

  create(payload: CreateIllustrationDto) {
    return payload;
  }
}
