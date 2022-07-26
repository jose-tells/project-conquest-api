import { Module } from '@nestjs/common';
import { ProfilesController } from './controllers/profiles/profiles.controller';
import { ProfilesService } from './services/profiles/profiles.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService]
})
export class ProfilesModule {}
