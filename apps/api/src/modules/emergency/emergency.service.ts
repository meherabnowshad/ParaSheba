import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmergencyServiceType } from '@prisma/client';

@Injectable()
export class EmergencyService {
  constructor(private prisma: PrismaService) {}

  async findAll(serviceType?: EmergencyServiceType) {
    return this.prisma.emergencyProvider.findMany({
      where: serviceType ? { serviceType } : {},
      orderBy: { etaMinutes: 'asc' },
    });
  }

  async getNationalHelplines() {
    return [
      { name: 'National Emergency Service (Ambulance/Police/Fire)', number: '999', isFree: true },
      { name: 'Government Health Hotline (Shastho Batayan)', number: '16263', isFree: true },
      { name: 'Women & Child Abuse Prevention Helpline', number: '109', isFree: true },
      { name: 'National Legal Aid Services', number: '16430', isFree: true },
    ];
  }
}
