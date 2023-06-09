import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
@ApiTags('文件上传/下载接口')
export class FileController {
  /**
   * 上传单个文件
   * @param file
   * @returns
   */
  @ApiOperation({ summary: '上传单个文件' })
  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return {
      file: file.filename,
      path: file.path,
      size: file.size,
    };
  }

  /**
   * 上传多个文件
   * @param files
   * @returns
   */
  @ApiOperation({ summary: '上传多个文件' })
  @Post('/upload-files')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFiles(@UploadedFiles() files) {
    return files.map((file) => ({
      file: file.filename,
      path: file.path,
      size: file.size,
    }));
  }
}
