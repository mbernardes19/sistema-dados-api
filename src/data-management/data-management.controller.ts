import { Controller, Post, UseInterceptors, UploadedFiles, UploadedFile, Get, Res } from '@nestjs/common';
import { DataManagementService } from './data-management.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

export type UploadedFile = {
  filedname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  buffer: Buffer,
  size: number
}

@Controller('data')
export class DataManagementController {
  constructor(private readonly dataManagementService: DataManagementService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async updateData(@UploadedFile() file: UploadedFile, @Res() response: Response) {
    try {
      await this.dataManagementService.importDataFromXls(file);
      response.status(200).send();
    } catch (err) {
      response.status(400).send();
    }
  }

  @Get()
  hi() {
    return 'Hello'
  }
}