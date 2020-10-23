import { Module } from '@nestjs/common';
import { enterpriseProviders } from './enterprise.provider';
import { DatabaseModule } from '../database/database.module';
import { EnterpriseService } from './enterprise.service';
import { SpreadsheetModule } from '../spreadsheet/spreasheet.module';

@Module({
  imports: [DatabaseModule, SpreadsheetModule],
  providers: [
    ...enterpriseProviders,
    EnterpriseService,
  ],
})
export class EnterpriseModule {}
