import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports: [DatabaseModule, EnterpriseModule],
  providers: [...userProviders, UserService],
  exports: [UserService]
})
export class UserModule {}
