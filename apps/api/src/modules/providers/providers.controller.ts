import { Controller, Get, Patch, Query, Param, Body, UseGuards } from '@nestjs/common';
import { ProvidersService, ProviderFilterQuery } from './providers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('providers')
export class ProvidersController {
  constructor(private providersService: ProvidersService) {}

  @Get()
  async findAll(@Query() query: ProviderFilterQuery) {
    return this.providersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async getDashboard(@CurrentUser() user: any) {
    const profile = await this.providersService.findByUserId(user.id);
    if (!profile) {
      return { message: 'Provider profile not found for current user' };
    }
    const metrics = await this.providersService.getDashboardMetrics(profile.id);
    return {
      profile,
      metrics,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.providersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/availability')
  async updateAvailability(
    @Param('id') id: string,
    @Body('isAvailableToday') isAvailableToday: boolean,
  ) {
    return this.providersService.toggleAvailability(id, isAvailableToday);
  }
}
