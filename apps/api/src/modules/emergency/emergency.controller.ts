import { Controller, Get, Query } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyServiceType } from '@prisma/client';

@Controller('emergency')
export class EmergencyController {
  constructor(private emergencyService: EmergencyService) {}

  @Get()
  async findAll(@Query('type') type?: EmergencyServiceType) {
    return this.emergencyService.findAll(type);
  }

  @Get('helplines')
  async getHelplines() {
    return this.emergencyService.getNationalHelplines();
  }
}
