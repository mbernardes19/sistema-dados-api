import { Module } from '@nestjs/common';
import { SpreadsheetModule } from 'src/spreadsheet/spreasheet.module';
import { DataManagementController } from './data-management.controller';
import { DataManagementService } from './data-management.service';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { ItemModule } from 'src/item/item.module';
import { OrderModule } from 'src/order/order.module';
import { ProdServInfoModule } from 'src/prod-serv-info/prod-serv-info.module';
import { OrderedItemModule } from 'src/ordered-item/ordered-item.module';

@Module({
  imports: [SpreadsheetModule, EnterpriseModule, OrderModule, ItemModule, ProdServInfoModule, OrderedItemModule],
  controllers: [DataManagementController],
  providers: [DataManagementService],
})
export class DataManagementModule {}
