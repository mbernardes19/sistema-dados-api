import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Enterprise } from '../model/enterprise.entity';
import { SpreadsheetService } from '../spreadsheet/spreadsheet.service';

@Injectable()
export class EnterpriseService {

  constructor(
    @Inject('ENTERPRISE_REPOSITORY')
    private enterpriseRepository: Repository<Enterprise>,
    private spreadsheetService: SpreadsheetService
  ) {}


}
