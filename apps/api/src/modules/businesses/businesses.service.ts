import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { DeliveryStatus, PaymentMethod, PaymentStatus } from '@prisma/client';

@Injectable()
export class BusinessesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { category?: string; area?: string }) {
    const where: any = {};
    if (query?.category) {
      where.category = query.category;
    }
    if (query?.area) {
      where.area = { contains: query.area, mode: 'insensitive' };
    }
    return this.prisma.business.findMany({
      where,
      include: {
        products: { take: 4 },
      },
      orderBy: { rating: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const business = await this.prisma.business.findUnique({
      where: { slug },
      include: {
        products: true,
        reviews: {
          include: { reviewer: true },
          take: 5,
        },
      },
    });

    if (!business) {
      throw new NotFoundException(`Business "${slug}" not found`);
    }

    return business;
  }

  async createOrder(customerId: string, data: {
    businessId: string;
    items: Array<{ productId: string; quantity: number }>;
    deliveryAddress: string;
    area: string;
    paymentMethod: PaymentMethod;
  }) {
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of data.items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (product) {
        subtotal += product.price * item.quantity;
        orderItemsData.push({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
        });
      }
    }

    const deliveryFee = 60;
    const total = subtotal + deliveryFee;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId,
        businessId: data.businessId,
        subtotal,
        deliveryFee,
        total,
        deliveryStatus: DeliveryStatus.ORDER_CONFIRMED,
        deliveryAddress: data.deliveryAddress,
        area: data.area,
        paymentMethod: data.paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        items: {
          create: orderItemsData,
        },
        deliveries: {
          create: {
            trackingNumber: `TRK-${orderNumber}`,
            pickupAddress: 'Shop location',
            dropoffAddress: data.deliveryAddress,
            estimatedMinutes: 35,
          },
        },
      },
      include: {
        items: true,
        deliveries: true,
        business: true,
      },
    });

    return order;
  }

  async getCustomerOrders(customerId: string) {
    return this.prisma.order.findMany({
      where: { customerId },
      include: {
        business: true,
        items: true,
        deliveries: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
