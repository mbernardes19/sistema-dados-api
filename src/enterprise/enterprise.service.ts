import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { Enterprise } from 'src/model/enterprise.entity';
import EnterpriseDto from 'src/data-management/interfaces/enterprise-dto';

@Injectable()
export class EnterpriseService {
  constructor(
    @Inject('ENTERPRISE_REPOSITORY')
    private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}

    async create(enterpriseDto: EnterpriseDto[]): Promise<void> {
        const enterprises: Enterprise[] = [];
        enterpriseDto.forEach(dto => {
            const enterprise = new Enterprise();
            enterprise.name = dto.name
            enterprises.push(enterprise);
        })
        await this.enterpriseRepository.save(enterprises);
    }

    async getByEnterpriseName(enterpriseName: string) {
      return await this.enterpriseRepository.findOne(enterpriseName)
    }

    async getAllEnterprises(): Promise<Enterprise[]> {
      return await this.enterpriseRepository.find();
    }
  }
