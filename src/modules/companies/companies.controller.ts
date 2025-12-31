import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const exists = await this.companiesService.validateExistence(
      createCompanyDto.business_name,
    );

    if (exists) {
      throw new BadRequestException('La empresa ya existe');
    }

    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const company = await this.companiesService.findOne(+id);

    if (!company) {
      new BadRequestException('La empresa no existe');
      return;
    }

    return this.companiesService.update(company, updateCompanyDto);
  }

  @Delete(':id')
  async ChangeActiveStatus(@Param('id') id: string) {
    const company = await this.companiesService.findOne(+id);
    if (!company) {
      new BadRequestException('La empresa no existe');
      return;
    }

    return this.companiesService.ChangeActiveStatus(company);
  }
}
