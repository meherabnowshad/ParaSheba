import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { VerificationStatus } from '@prisma/client';

export interface ProviderFilterQuery {
  area?: string;
  category?: string;
  search?: string;
  verifiedOnly?: boolean;
  minRating?: number;
  availableToday?: boolean;
}

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ProviderFilterQuery) {
    const where: any = {};

    if (query.verifiedOnly) {
      where.verificationStatus = VerificationStatus.VERIFIED;
    }

    if (query.minRating) {
      where.rating = { gte: Number(query.minRating) };
    }

    if (query.availableToday) {
      where.isAvailableToday = true;
    }

    if (query.area) {
      where.OR = [
        { area: { contains: query.area, mode: 'insensitive' } },
        {
          serviceAreas: {
            some: { areaName: { contains: query.area, mode: 'insensitive' } },
          },
        },
      ];
    }

    if (query.search) {
      where.OR = [
        ...(where.OR || []),
        { headline: { contains: query.search, mode: 'insensitive' } },
        { bio: { contains: query.search, mode: 'insensitive' } },
        { user: { fullName: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    return this.prisma.providerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            phone: true,
          },
        },
        serviceAreas: true,
        services: {
          include: {
            service: true,
          },
        },
      },
      orderBy: [{ rating: 'desc' }, { completedJobsCount: 'desc' }],
    });
  }

  async findById(id: string) {
    const provider = await this.prisma.providerProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            phone: true,
            email: true,
            createdAt: true,
          },
        },
        serviceAreas: true,
        availabilities: true,
        services: {
          include: {
            service: {
              include: { category: true },
            },
          },
        },
        reviews: {
          include: {
            reviewer: {
              select: {
                id: true,
                fullName: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!provider) {
      throw new NotFoundException(`Provider profile ${id} not found`);
    }

    return provider;
  }

  async findByUserId(userId: string) {
    return this.prisma.providerProfile.findUnique({
      where: { userId },
      include: {
        user: true,
        serviceAreas: true,
        availabilities: true,
        services: {
          include: { service: true },
        },
      },
    });
  }

  async toggleAvailability(providerId: string, isAvailableToday: boolean) {
    return this.prisma.providerProfile.update({
      where: { id: providerId },
      data: { isAvailableToday },
    });
  }

  async getDashboardMetrics(providerId: string) {
    const today = new Date().toISOString().split('T')[0];

    const [todayJobs, pendingRequests, completedJobs, totalReviews, recentBookings] = await Promise.all([
      this.prisma.booking.count({
        where: {
          providerId,
          scheduledDate: today,
        },
      }),
      this.prisma.booking.count({
        where: {
          providerId,
          status: 'PENDING',
        },
      }),
      this.prisma.booking.count({
        where: {
          providerId,
          status: 'COMPLETED',
        },
      }),
      this.prisma.review.count({
        where: { providerId },
      }),
      this.prisma.booking.findMany({
        where: { providerId },
        include: {
          customer: {
            select: { id: true, fullName: true, phone: true, avatarUrl: true },
          },
          service: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    const earningsResult = await this.prisma.booking.aggregate({
      where: {
        providerId,
        status: 'COMPLETED',
      },
      _sum: {
        totalAmount: true,
      },
    });

    return {
      todayJobs,
      pendingRequests,
      completedJobs,
      totalReviews,
      totalEarningsBDT: earningsResult._sum.totalAmount || 0,
      recentBookings,
    };
  }
}
