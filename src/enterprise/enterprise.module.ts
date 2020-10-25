import { Module } from '@nestjs/common';
import { enterpriseProviders } from './enterprise.provider';
import { DatabaseModule } from '../database/database.module';
import { EnterpriseService } from './enterprise.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...enterpriseProviders,
    EnterpriseService
  ],
  exports: [ EnterpriseService ]
})
export class EnterpriseModule {}
