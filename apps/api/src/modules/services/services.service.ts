import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { categorySlug?: string; search?: string; popularOnly?: boolean }) {
    return this.prisma.service.findMany({
      where: {
        ...(query?.popularOnly ? { isPopular: true } : {}),
        ...(query?.categorySlug ? { category: { slug: query.categorySlug } } : {}),
        ...(query?.search
          ? {
              OR: [
                { name: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: {
        category: true,
        _count: {
          select: { providerServices: true },
        },
      },
      orderBy: { isPopular: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug },
      include: {
        category: true,
        providerServices: {
          include: {
            provider: {
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
              },
            },
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundException(`Service "${slug}" not found`);
    }

    return service;
  }
}
