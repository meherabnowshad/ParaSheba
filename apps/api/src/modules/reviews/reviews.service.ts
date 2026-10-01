import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(reviewerId: string, data: {
    bookingId?: string;
    providerId?: string;
    businessId?: string;
    rating: number;
    comment: string;
  }) {
    if (!data.providerId && !data.businessId) {
      throw new BadRequestException('Either providerId or businessId must be specified');
    }

    const review = await this.prisma.review.create({
      data: {
        reviewerId,
        bookingId: data.bookingId,
        providerId: data.providerId,
        businessId: data.businessId,
        rating: data.rating,
        comment: data.comment,
      },
      include: {
        reviewer: {
          select: { fullName: true, avatarUrl: true },
        },
      },
    });

    if (data.providerId) {
      const agg = await this.prisma.review.aggregate({
        where: { providerId: data.providerId },
        _avg: { rating: true },
        _count: { rating: true },
      });

      await this.prisma.providerProfile.update({
        where: { id: data.providerId },
        data: {
          rating: Number((agg._avg.rating || 5.0).toFixed(2)),
          reviewCount: agg._count.rating,
        },
      });
    }

    return review;
  }

  async getReviewsForProvider(providerId: string) {
    return this.prisma.review.findMany({
      where: { providerId },
      include: {
        reviewer: {
          select: { fullName: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
