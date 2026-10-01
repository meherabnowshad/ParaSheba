import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('businesses')
export class BusinessesController {
  constructor(private businessesService: BusinessesService) {}

  @Get()
  async findAll(@Query('category') category?: string, @Query('area') area?: string) {
    return this.businessesService.findAll({ category, area });
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.businessesService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  async createOrder(@CurrentUser() user: any, @Body() body: any) {
    return this.businessesService.createOrder(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders/my-orders')
  async getMyOrders(@CurrentUser() user: any) {
    return this.businessesService.getCustomerOrders(user.id);
  }
}
