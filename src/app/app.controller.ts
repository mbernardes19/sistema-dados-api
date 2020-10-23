import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SpreadsheetService } from '../spreadsheet/spreadsheet.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<boolean> {
    return false;
    // return await this.spread.isSpreadsheetValid()
  }
}