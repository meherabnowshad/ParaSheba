import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, VerificationStatus } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('kpis')
  async getKpis() {
    return this.adminService.getPlatformKpis();
  }

  @Get('verifications/pending')
  async getPendingVerifications() {
    return this.adminService.getPendingVerifications();
  }

  @Patch('verifications/:providerId')
  async updateVerification(
    @Param('providerId') providerId: string,
    @Body('status') status: VerificationStatus,
  ) {
    return this.adminService.updateVerification(providerId, status);
  }

  @Get('disputes')
  async getDisputes() {
    return this.adminService.getDisputes();
  }
}
