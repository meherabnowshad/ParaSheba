import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { BookingsService, CreateBookingDto } from './bookings.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { BookingStatus } from '@prisma/client';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: any, @Body() dto: CreateBookingDto) {
    return this.bookingsService.createBooking(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-bookings')
  async getMyBookings(@CurrentUser() user: any) {
    return this.bookingsService.getCustomerBookings(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('provider-jobs')
  async getProviderJobs(@CurrentUser() user: any) {
    const providerProfileId = user.providerProfile?.id;
    if (!providerProfileId) {
      return [];
    }
    return this.bookingsService.getProviderBookings(providerProfileId);
  }

  @Get('track/:code')
  async track(@Param('code') code: string) {
    return this.bookingsService.findByTrackingCode(code);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: BookingStatus,
    @Body('note') note?: string,
  ) {
    return this.bookingsService.updateStatus(id, status, note);
  }
}
