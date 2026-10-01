import { Controller, Get, Query, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async findAll(
    @Query('category') categorySlug?: string,
    @Query('search') search?: string,
    @Query('popular') popular?: string,
  ) {
    return this.servicesService.findAll({
      categorySlug,
      search,
      popularOnly: popular === 'true',
    });
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.servicesService.findBySlug(slug);
  }
}
