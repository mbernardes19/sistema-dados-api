import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { RegistrationService } from './registration.service';

@Module({
    imports: [DatabaseModule, UserModule],
    providers: [RegistrationService],
    exports: [RegistrationService]
})
export class RegistrationModule {}
