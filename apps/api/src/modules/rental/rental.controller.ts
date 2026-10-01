import { Controller, Get, Param, Query } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalType } from '@prisma/client';

@Controller('rentals')
export class RentalController {
  constructor(private rentalService: RentalService) {}

  @Get()
  async findAll(
    @Query('type') type?: RentalType,
    @Query('area') area?: string,
    @Query('city') city?: string,
  ) {
    return this.rentalService.findAll({ type, area, city });
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.rentalService.findBySlug(slug);
  }
}
