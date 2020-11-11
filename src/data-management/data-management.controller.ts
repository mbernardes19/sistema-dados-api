import { Controller, Post, UseInterceptors, UploadedFile, Get, HttpException, HttpStatus, Request } from '@nestjs/common';
import { DataManagementService } from './data-management.service';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('check')
  @UseInterceptors(FileInterceptor('file'))
  async checkDataToImport(@UploadedFile() file: UploadedFile) {
    try {
      const isValid = this.dataManagementService.isDataFromXlsValid(file);
      if (isValid) {
        return {status: true, statusCode: HttpStatus.OK}
      } else {
        throw new InvalidSpreadsheetStructureError('Invalid spreadsheet structure');
      }
    } catch (err) {
      if (err instanceof InvalidSpreadsheetStructureError) {
        throw new HttpException('Planilha em formato incorreto. Certifique-se de estar enviando uma planilha com as coluna corretas.', HttpStatus.BAD_REQUEST)
      } else {
        console.log(err);
        throw new HttpException('Ocorreu um erro ao atualizar os dados do sistema. Por favor, tente novamente mais tarde.', HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Post('start')
  @UseInterceptors(FileInterceptor('file'))
  async startDataImport(@UploadedFile() file: UploadedFile, @Request() req) {
    try {
      console.log('Updating data')
      this.dataManagementService.updateDataFromXls(file, 1)
      .then(() => console.log('Data updated successfully'))
      .catch((err) => {
        console.log(err);
        throw new HttpException('Ocorreu um erro ao atualizar os dados do sistema. Por favor, tente novamente mais tarde.', HttpStatus.BAD_REQUEST)
      })
    } catch (err) {
      console.log(err);
    }
    return {status: true, statusCode: HttpStatus.OK}
  }

  @Get('status')
  async getUpdateStatus() {
    return await this.dataManagementService.getUpdateStatus()
  }

}