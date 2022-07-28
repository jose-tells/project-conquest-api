import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  MongoDB: {
    dbName: process.env.MONGO_DB_NAME,
    dbUser: process.env.MONGO_DB_USER,
    dbPass: process.env.MONGO_DB_PASSWORD,
    dbHost: process.env.MONGO_DB_HOST,
    dbConnection: process.env.MONGO_CONNECTION,
  },
  firebase: {
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
}));
