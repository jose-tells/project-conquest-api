import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { app } from 'firebase-admin';
import { MediaService } from '../media/media.service';

@Injectable()
export class UploadsService {
  constructor(
    @Inject('FIREBASE_ADMIN') private firebaseAdmin: app.App,
    private mediaService: MediaService,
  ) {}

  /**
   * @Firebase Find all uploads from Storage
   */
  async findAllUploads() {
    const files = await this.firebaseAdmin.storage().bucket().getFiles();

    const folders = Promise.all(
      files[0].map(async (file) => ({
        fileUrl: await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60,
        }),
        createdAt: file.metadata.timeCreated,
        filename: file.metadata.name,
        size: file.metadata.size,
      })),
    )
      .then((data) => data)
      .catch(() => {
        throw new NotFoundException({
          message: 'Files not found',
          data: [],
          success: false,
        });
      });

    return folders;
  }

  /**
   * @Firebase Upload to Storage
   */
  async upload(file: Express.Multer.File) {
    const filePointer = this.firebaseAdmin
      .storage()
      .bucket()
      .file(file.originalname);

    const fileUploaded = await filePointer
      .save(file.buffer, {
        resumable: false,
      })
      .then(() => true);

    if (!fileUploaded) {
      throw new BadRequestException({
        message: 'File format not allowed',
        data: {},
        success: false,
      });
    }

    const signedUrl = await filePointer.getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60,
    });
    const mimetype = filePointer.metadata.name.replace(/.+\./g, '');
    await this.mediaService.create({
      filename: filePointer.metadata.name,
      fileUrl: signedUrl[0],
      size: filePointer.metadata.size,
      createdAt: filePointer.metadata.timeCreated,
      mimetype: `image/${mimetype}`,
      isFromCollection: '',
    });

    return {
      fileUrl: signedUrl,
      createdAt: filePointer.metadata.timeCreated,
      filename: filePointer.metadata.name,
      size: filePointer.metadata.size,
    };
  }

  /**
   * @Firebase Delete upload from Storage
   */
  async remove(filename: string) {
    const file = this.firebaseAdmin.storage().bucket().file(filename);
    const fileExists = await file.exists();

    if (!fileExists[0]) {
      throw new NotFoundException({
        message: `File: ${filename} not found`,
        data: {},
        success: false,
      });
    }

    await file.delete();
    return file;
  }
}
