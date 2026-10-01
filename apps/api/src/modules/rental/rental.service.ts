import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RentalType } from '@prisma/client';

@Injectable()
export class RentalService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { type?: RentalType; area?: string; city?: string }) {
    const where: any = { isAvailable: true };
    if (query?.type) {
      where.type = query.type;
    }
    if (query?.area) {
      where.area = { contains: query.area, mode: 'insensitive' };
    }
    return this.prisma.rentalListing.findMany({
      where,
      orderBy: { rating: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const listing = await this.prisma.rentalListing.findUnique({
      where: { slug },
      include: {
        owner: {
          select: { fullName: true, phone: true, avatarUrl: true },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException(`Rental listing "${slug}" not found`);
    }

    return listing;
  }
}
