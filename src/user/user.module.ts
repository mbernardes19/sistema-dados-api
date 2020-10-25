import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  exports: [UserService]
})
export class UserModule {}
