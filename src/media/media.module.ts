import { MongooseModule } from '@nestjs/mongoose';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigType } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { PhotosController } from './controllers/photos/photos.controller';
import { PhotosService } from './services/photos/photos.service';
import { VideosController } from './controllers/videos/videos.controller';
import { IllustrationsController } from './controllers/illustrations/illustrations.controller';
import { IllustrationsService } from './services/illustrations/illustrations.service';
import { VideosService } from './services/videos/videos.service';
import { MediaController } from './controllers/media/media.controller';
import { MediaService } from './services/media/media.service';
import { UploadsController } from './controllers/uploads/uploads.controller';
import { UploadsService } from './services/uploads/uploads.service';
import { Photo, PhotoSchema } from './entities/photo.entity';
import { Video, VideoSchema } from './entities/video.entity';
import { Media, MediaSchema } from './entities/media.entity';
import config from '../utils/config';
import {
  Illustration,
  IllustrationSchema,
} from './entities/illustration.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Photo.name,
        schema: PhotoSchema,
      },
      {
        name: Illustration.name,
        schema: IllustrationSchema,
      },
      {
        name: Video.name,
        schema: VideoSchema,
      },
      {
        name: Media.name,
        schema: MediaSchema,
      },
    ]),
  ],
  controllers: [
    PhotosController,
    VideosController,
    IllustrationsController,
    MediaController,
    UploadsController,
  ],
  providers: [
    PhotosService,
    IllustrationsService,
    VideosService,
    MediaService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { firebaseProjectId, firebasePrivateKey, firebaseClientEmail } =
          configService.firebase;
        const adminConfig: ServiceAccount = {
          projectId: firebaseProjectId,
          privateKey: firebasePrivateKey,
          clientEmail: firebaseClientEmail,
        };

        const app = admin.initializeApp({
          credential: admin.credential.cert(adminConfig),
          storageBucket: `gs://${firebaseProjectId}.appspot.com`,
        });
        return app;
      },
      inject: [config.KEY],
    },
    UploadsService,
  ],
})
export class MediaModule {}
