import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

import { Global, Module } from '@nestjs/common';
import config from '../utils/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbConnection, dbHost, dbUser, dbPass, dbName } =
          configService.MongoDB;

        return {
          uri: `${dbConnection}://${dbUser}:${dbPass}${dbHost}/?retryWrites=true&w=majority`,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbConnection, dbHost, dbName, dbPass, dbUser } =
          configService.MongoDB;

        const mongoUri = `${dbConnection}://${dbUser}:${dbPass}${dbHost}/?retryWrites=true&w=majority`;

        const client = new MongoClient(mongoUri);
        await client.connect();
        const db = client.db(dbName);
        return db;
      },
      inject: [config.KEY],
    },
  ],
})
export class DatabaseModule {}
