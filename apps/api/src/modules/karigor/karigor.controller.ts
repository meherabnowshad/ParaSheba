import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { KarigorService } from './karigor.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TailoringStage } from '@prisma/client';

@Controller('karigor')
export class KarigorController {
  constructor(private karigorService: KarigorService) {}

  @UseGuards(JwtAuthGuard)
  @Get('measurements')
  async getMeasurements(@CurrentUser() user: any) {
    return this.karigorService.getMeasurementProfiles(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('measurements')
  async saveMeasurement(@CurrentUser() user: any, @Body() body: any) {
    return this.karigorService.saveMeasurementProfile(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  async getOrders(@CurrentUser() user: any) {
    return this.karigorService.getCustomerOrders(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  async createOrder(@CurrentUser() user: any, @Body() body: any) {
    return this.karigorService.createTailoringOrder(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('orders/:id/stage')
  async updateStage(@Param('id') id: string, @Body('stage') stage: TailoringStage) {
    return this.karigorService.updateStage(id, stage);
  }
}
