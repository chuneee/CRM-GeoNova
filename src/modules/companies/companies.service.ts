import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const newCompany = this.companyRepository.create(createCompanyDto);

    return this.companyRepository.save(newCompany);
  }

  async findAll() {
    const companies = await this.companyRepository.find();
    return companies;
  }

  findOne(id: number) {
    return this.companyRepository.findOneBy({ id });
  }

  update(company: Company, updateCompanyDto: UpdateCompanyDto) {
    Object.assign(company, updateCompanyDto);
    return this.companyRepository.save(company);
  }

  ChangeActiveStatus(company: Company) {
    const actuveStatus = company.active;

    company.active = !actuveStatus;

    return this.companyRepository.save(company);
  }

  async validateExistence(business_name: string): Promise<boolean> {
    const company = await this.companyRepository.exists({
      where: { business_name },
    });
    return company;
  }
}
