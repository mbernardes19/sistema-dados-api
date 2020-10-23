import { Module } from '@nestjs/common';
import { SpreadsheetService } from './spreadsheet.service';

@Module({
  imports: [],
  providers: [SpreadsheetService],
  exports: [SpreadsheetService]
})
export class SpreadsheetModule {}
