import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { ProfilesModule } from './profiles/profiles.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './utils/environments';
import config from './utils/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV]?.toLowerCase() || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_DB_USER: Joi.string().required(),
        MONGO_DB_PASSWORD: Joi.string().required(),
        MONGO_DB_HOST: Joi.string().required(),
        MONGO_DB_NAME: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
        FIREBASE_PROJECT_ID: Joi.string().required(),
        FIREBASE_PRIVATE_KEY: Joi.string().required(),
        FIREBASE_CLIENT_EMAIL: Joi.string().required(),
        ORIGIN_ALLOWED: Joi.string().required(),
      }),
    }),
    MediaModule,
    ProfilesModule,
    DatabaseModule,
  ],
})
export class AppModule {}
