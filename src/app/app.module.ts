import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpreadsheetModule } from '../spreadsheet/spreasheet.module';
import { EnterpriseModule } from '../enterprise/enterprise.module';

@Module({
  imports: [SpreadsheetModule, EnterpriseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
