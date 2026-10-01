import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: any, @Body() body: any) {
    return this.reviewsService.createReview(user.id, body);
  }

  @Get('provider/:providerId')
  async getForProvider(@Param('providerId') providerId: string) {
    return this.reviewsService.getReviewsForProvider(providerId);
  }
}
