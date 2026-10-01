import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CaregiverService } from './caregiver.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('caregivers')
export class CaregiverController {
  constructor(private caregiverService: CaregiverService) {}

  @Get()
  async findAll(@Query('specialization') specialization?: string, @Query('area') area?: string) {
    return this.caregiverService.findAll({ specialization, area });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.caregiverService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('plans/my-plans')
  async getMyPlans(@CurrentUser() user: any) {
    return this.caregiverService.getCustomerCarePlans(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('plans')
  async createCarePlan(@CurrentUser() user: any, @Body() body: any) {
    return this.caregiverService.createCarePlan(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('plans/:planId/sessions')
  async recordSession(
    @Param('planId') planId: string,
    @CurrentUser() user: any,
    @Body() body: any,
  ) {
    return this.caregiverService.recordSession(planId, user.id, body);
  }
}
