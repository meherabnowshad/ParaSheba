import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TailoringStage } from '@prisma/client';

@Injectable()
export class KarigorService {
  constructor(private prisma: PrismaService) {}

  async getMeasurementProfiles(customerId: string) {
    return this.prisma.measurementProfile.findMany({
      where: { customerId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async saveMeasurementProfile(customerId: string, data: {
    profileName: string;
    gender: string;
    garmentType: string;
    measurements: any;
    notes?: string;
  }) {
    return this.prisma.measurementProfile.create({
      data: {
        customerId,
        profileName: data.profileName,
        gender: data.gender,
        garmentType: data.garmentType,
        measurements: data.measurements,
        notes: data.notes,
      },
    });
  }

  async createTailoringOrder(customerId: string, data: {
    tailorId: string;
    garmentType: string;
    measurementProfileId?: string;
    measurementVisitRequested?: boolean;
    fabricSource: string;
    fabricDetails?: string;
    specialInstructions?: string;
    deliveryAddress: string;
    area: string;
    totalPrice?: number;
  }) {
    const orderNumber = `KRG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const estimatedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return this.prisma.tailoringOrder.create({
      data: {
        orderNumber,
        customerId,
        tailorId: data.tailorId,
        garmentType: data.garmentType,
        measurementProfileId: data.measurementProfileId,
        measurementVisitRequested: data.measurementVisitRequested ?? false,
        fabricSource: data.fabricSource,
        fabricDetails: data.fabricDetails,
        specialInstructions: data.specialInstructions,
        deliveryAddress: data.deliveryAddress,
        area: data.area,
        currentStage: TailoringStage.MEASUREMENT,
        estimatedDeliveryDate,
        totalPrice: data.totalPrice || 850,
      },
      include: {
        tailor: {
          include: { user: { select: { fullName: true, phone: true } } },
        },
      },
    });
  }

  async getCustomerOrders(customerId: string) {
    return this.prisma.tailoringOrder.findMany({
      where: { customerId },
      include: {
        tailor: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStage(orderId: string, stage: TailoringStage) {
    return this.prisma.tailoringOrder.update({
      where: { id: orderId },
      data: { currentStage: stage },
    });
  }
}
