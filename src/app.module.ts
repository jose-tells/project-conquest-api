import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { ProfilesModule } from './profiles/profiles.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MediaModule, ProfilesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
