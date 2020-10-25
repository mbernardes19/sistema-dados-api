import { Module } from '@nestjs/common';
import { prodServInfoProviders } from './prod-serv-info.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...prodServInfoProviders,
  ],
  exports: [...prodServInfoProviders]
})
export class ProdServInfoModule {}
