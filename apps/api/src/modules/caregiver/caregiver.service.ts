import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CaregiverSpecialization } from '@prisma/client';

@Injectable()
export class CaregiverService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { specialization?: string; area?: string }) {
    const where: any = {};
    if (query?.area) {
      where.serviceAreas = { has: query.area };
    }
    return this.prisma.caregiverProfile.findMany({
      where,
      include: {
        user: {
          select: { fullName: true, avatarUrl: true, phone: true },
        },
      },
      orderBy: { rating: 'desc' },
    });
  }

  async findById(id: string) {
    const caregiver = await this.prisma.caregiverProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: { fullName: true, avatarUrl: true, phone: true, email: true },
        },
      },
    });

    if (!caregiver) {
      throw new NotFoundException('Caregiver profile not found');
    }

    return caregiver;
  }

  async createCarePlan(customerId: string, data: {
    caregiverId: string;
    recipientName: string;
    recipientAge: number;
    condition: string;
    specializationNeeded: CaregiverSpecialization;
    frequency: string;
    startDate: string;
    notes?: string;
  }) {
    return this.prisma.carePlan.create({
      data: {
        customerId,
        caregiverId: data.caregiverId,
        recipientName: data.recipientName,
        recipientAge: data.recipientAge,
        condition: data.condition,
        specializationNeeded: data.specializationNeeded,
        frequency: data.frequency,
        startDate: data.startDate,
        notes: data.notes,
        status: 'ACTIVE',
      },
      include: {
        customer: { select: { fullName: true, phone: true } },
      },
    });
  }

  async getCustomerCarePlans(customerId: string) {
    return this.prisma.carePlan.findMany({
      where: { customerId },
      include: {
        sessions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async recordSession(carePlanId: string, caregiverId: string, data: {
    date: string;
    checkInTime?: string;
    checkOutTime?: string;
    notes?: string;
    vitalsRecorded?: any;
    status?: string;
  }) {
    return this.prisma.careSession.create({
      data: {
        carePlanId,
        caregiverId,
        date: data.date,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        notes: data.notes,
        vitalsRecorded: data.vitalsRecorded,
        status: data.status || 'COMPLETED',
      },
    });
  }
}
