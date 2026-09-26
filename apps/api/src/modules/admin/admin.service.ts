import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { VerificationStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getPlatformKpis() {
    const [
      totalUsers,
      totalProviders,
      verifiedProviders,
      totalBookings,
      completedBookings,
      totalRevenue,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.providerProfile.count(),
      this.prisma.providerProfile.count({
        where: { verificationStatus: VerificationStatus.VERIFIED },
      }),
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: 'COMPLETED' } }),
      this.prisma.booking.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      totalUsers,
      totalProviders,
      verifiedProviders,
      totalBookings,
      completedBookings,
      totalGrossVolumeBDT: totalRevenue._sum.totalAmount || 0,
      platformFeeEarnedBDT: Math.round((totalRevenue._sum.totalAmount || 0) * 0.1),
    };
  }

  async getPendingVerifications() {
    return this.prisma.providerProfile.findMany({
      where: {
        verificationStatus: { in: [VerificationStatus.PENDING_REVIEW, VerificationStatus.UNVERIFIED] },
      },
      include: {
        user: { select: { fullName: true, phone: true, email: true } },
      },
    });
  }

  async updateVerification(providerId: string, status: VerificationStatus) {
    return this.prisma.providerProfile.update({
      where: { id: providerId },
      data: {
        verificationStatus: status,
        nidVerified: status === VerificationStatus.VERIFIED,
      },
    });
  }

  async getDisputes() {
    return this.prisma.dispute.findMany({
      include: {
        booking: {
          include: {
            customer: true,
            provider: { include: { user: true } },
            service: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
