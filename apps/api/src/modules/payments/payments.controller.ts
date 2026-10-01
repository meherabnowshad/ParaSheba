import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentsService, PaymentInitiateRequest } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('initiate')
  async initiate(@CurrentUser() user: any, @Body() body: any) {
    const req: PaymentInitiateRequest = {
      referenceType: body.referenceType || 'BOOKING',
      referenceId: body.referenceId,
      amount: body.amount,
      gateway: body.gateway,
      customerPhone: user.phone,
      customerName: user.fullName,
      customerEmail: user.email,
    };
    return this.paymentsService.initiatePayment(req);
  }

  @Post('verify/:transactionId')
  async verify(@Param('transactionId') transactionId: string) {
    return this.paymentsService.verifyPayment(transactionId);
  }
}
