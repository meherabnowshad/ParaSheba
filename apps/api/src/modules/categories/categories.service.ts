import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.serviceCategory.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        services: {
          take: 6,
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.serviceCategory.findUnique({
      where: { slug },
      include: {
        services: true,
      },
    });
  }
}
