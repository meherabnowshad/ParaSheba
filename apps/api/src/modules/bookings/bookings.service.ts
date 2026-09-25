import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { BookingStatus, PaymentMethod, PaymentStatus } from '@prisma/client';

export interface CreateBookingDto {
  serviceId: string;
  providerId: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  address: string;
  area: string;
  city?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
}

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(customerId: string, dto: CreateBookingDto) {
    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const provider = await this.prisma.providerProfile.findUnique({
      where: { id: dto.providerId },
    });
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `PSB-${new Date().getFullYear()}-${randomSuffix}`;

    const totalAmount = Math.max(service.startingPrice, provider.basePrice);

    const booking = await this.prisma.booking.create({
      data: {
        trackingCode,
        customerId,
        providerId: dto.providerId,
        serviceId: dto.serviceId,
        scheduledDate: dto.scheduledDate,
        scheduledTimeSlot: dto.scheduledTimeSlot,
        address: dto.address,
        area: dto.area,
        city: dto.city || 'Dhaka',
        notes: dto.notes,
        totalAmount,
        paymentMethod: dto.paymentMethod || PaymentMethod.CASH_ON_DELIVERY,
        paymentStatus: PaymentStatus.PENDING,
        status: BookingStatus.PENDING,
        statusLogs: {
          create: {
            status: BookingStatus.PENDING,
            note: 'Booking requested by customer',
          },
        },
      },
      include: {
        service: true,
        provider: {
          include: {
            user: {
              select: { fullName: true, phone: true, avatarUrl: true },
            },
          },
        },
        customer: {
          select: { fullName: true, phone: true },
        },
        statusLogs: true,
      },
    });

    return booking;
  }

  async getCustomerBookings(customerId: string) {
    return this.prisma.booking.findMany({
      where: { customerId },
      include: {
        service: true,
        provider: {
          include: {
            user: {
              select: { fullName: true, phone: true, avatarUrl: true },
            },
          },
        },
        statusLogs: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProviderBookings(providerId: string) {
    return this.prisma.booking.findMany({
      where: { providerId },
      include: {
        service: true,
        customer: {
          select: { id: true, fullName: true, phone: true, avatarUrl: true },
        },
        statusLogs: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByTrackingCode(trackingCode: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { trackingCode },
      include: {
        service: true,
        provider: {
          include: {
            user: {
              select: { fullName: true, phone: true, avatarUrl: true },
            },
          },
        },
        customer: {
          select: { id: true, fullName: true, phone: true, avatarUrl: true },
        },
        statusLogs: {
          orderBy: { createdAt: 'asc' },
        },
        reviews: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with code ${trackingCode} not found`);
    }

    return booking;
  }

  async updateStatus(bookingId: string, status: BookingStatus, note?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const updated = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status,
        ...(status === BookingStatus.COMPLETED
          ? { paymentStatus: PaymentStatus.PAID }
          : {}),
        statusLogs: {
          create: {
            status,
            note: note || `Status updated to ${status}`,
          },
        },
      },
      include: {
        service: true,
        provider: {
          include: { user: true },
        },
        customer: true,
        statusLogs: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (status === BookingStatus.COMPLETED) {
      await this.prisma.providerProfile.update({
        where: { id: booking.providerId },
        data: { completedJobsCount: { increment: 1 } },
      });
    }

    return updated;
  }
}
