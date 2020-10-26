import { Controller, Post, UseInterceptors, UploadedFiles, UploadedFile, Get, Res, HttpException, HttpStatus } from '@nestjs/common';
import { DataManagementService } from './data-management.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import InvalidSpreadsheetStructureError from './errors/InvalidSpreadsheetStructure';

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
  async updateData(@UploadedFile() file: UploadedFile) {
    try {
      await this.dataManagementService.importDataFromXls(file);
    } catch (err) {
      if (err instanceof InvalidSpreadsheetStructureError) {
        throw new HttpException('Planilha em formato incorreto. Certifique-se de estar enviando uma planilha com as coluna corretas.', HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException('Ocorreu um erro ao atualizar os dados do sistema. Por favor, tente novamente mais tarde.', HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Get()
  hi() {
    return 'Hello'
  }
}