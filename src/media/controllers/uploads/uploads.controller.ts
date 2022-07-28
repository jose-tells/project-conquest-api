import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from '../../services/uploads/uploads.service';
import { FileSizePipe } from 'src/shared/file-size.pipe';

@ApiTags('Uploads')
@Controller('media/uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Get()
  async getUploads() {
    const files = await this.uploadsService.findAllUploads();

    return {
      message: 'Uploads listed',
      data: files,
      success: true,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(FileSizePipe)
    file: Express.Multer.File,
  ) {
    const uploadedFile = await this.uploadsService.upload(file);

    return {
      message: 'Successfully uploaded file',
      data: uploadedFile,
      success: true,
    };
  }

  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    const deletedFile = await this.uploadsService.remove(filename);
    return {
      message: `Successfully deleted ${filename}`,
      data: {
        filename: deletedFile.metadata.name,
        size: deletedFile.metadata.size,
        createdAt: deletedFile.metadata.timeCreated,
      },
      success: true,
    };
  }
}
