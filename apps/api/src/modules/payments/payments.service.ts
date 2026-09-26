import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

export interface PaymentInitiateRequest {
  referenceType: 'BOOKING' | 'ORDER' | 'TAILORING' | 'RENTAL';
  referenceId: string;
  amount: number;
  gateway: PaymentMethod;
  customerPhone: string;
  customerName?: string;
  customerEmail?: string;
}

export interface PaymentGatewayProvider {
  initiate(req: PaymentInitiateRequest): Promise<{ paymentUrl?: string; transactionId: string; status: PaymentStatus }>;
  verify(transactionId: string): Promise<{ success: boolean; status: PaymentStatus }>;
}

export class BkashProvider implements PaymentGatewayProvider {
  async initiate(req: PaymentInitiateRequest) {
    const transactionId = `BKS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
      paymentUrl: `https://checkout.sandbox.bka.sh/payment/${transactionId}`,
      transactionId,
      status: PaymentStatus.PENDING,
    };
  }

  async verify(transactionId: string) {
    return { success: true, status: PaymentStatus.PAID };
  }
}

export class NagadProvider implements PaymentGatewayProvider {
  async initiate(req: PaymentInitiateRequest) {
    const transactionId = `NGD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
      paymentUrl: `http://sandbox.nagad.com.bd/pay/${transactionId}`,
      transactionId,
      status: PaymentStatus.PENDING,
    };
  }

  async verify(transactionId: string) {
    return { success: true, status: PaymentStatus.PAID };
  }
}

export class SslCommerzProvider implements PaymentGatewayProvider {
  async initiate(req: PaymentInitiateRequest) {
    const transactionId = `SSL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
      paymentUrl: `https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?session=${transactionId}`,
      transactionId,
      status: PaymentStatus.PENDING,
    };
  }

  async verify(transactionId: string) {
    return { success: true, status: PaymentStatus.PAID };
  }
}

@Injectable()
export class PaymentsService {
  private providers: Map<PaymentMethod, PaymentGatewayProvider> = new Map();

  constructor(private prisma: PrismaService) {
    this.providers.set(PaymentMethod.BKASH, new BkashProvider());
    this.providers.set(PaymentMethod.NAGAD, new NagadProvider());
    this.providers.set(PaymentMethod.SSLCOMMERZ, new SslCommerzProvider());
  }

  async initiatePayment(req: PaymentInitiateRequest) {
    if (req.gateway === PaymentMethod.CASH_ON_DELIVERY) {
      const transactionId = `COD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      return this.prisma.payment.create({
        data: {
          transactionId,
          amount: req.amount,
          gateway: req.gateway,
          status: PaymentStatus.PENDING,
          referenceType: req.referenceType,
          referenceId: req.referenceId,
          metadata: { note: 'Cash to be collected upon service completion' },
        },
      });
    }

    const provider = this.providers.get(req.gateway);
    if (!provider) {
      throw new BadRequestException(`Unsupported payment gateway: ${req.gateway}`);
    }

    const result = await provider.initiate(req);

    const paymentRecord = await this.prisma.payment.create({
      data: {
        transactionId: result.transactionId,
        amount: req.amount,
        gateway: req.gateway,
        status: result.status,
        referenceType: req.referenceType,
        referenceId: req.referenceId,
        metadata: { paymentUrl: result.paymentUrl },
      },
    });

    return {
      payment: paymentRecord,
      redirectUrl: result.paymentUrl,
    };
  }

  async verifyPayment(transactionId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { transactionId },
    });
    if (!payment) {
      throw new BadRequestException('Transaction record not found');
    }

    const provider = this.providers.get(payment.gateway);
    if (!provider) {
      throw new BadRequestException('Provider for transaction not found');
    }

    const verification = await provider.verify(transactionId);

    const updatedPayment = await this.prisma.payment.update({
      where: { transactionId },
      data: { status: verification.status },
    });

    if (payment.referenceType === 'BOOKING') {
      await this.prisma.booking.update({
        where: { id: payment.referenceId },
        data: { paymentStatus: verification.status },
      });
    }

    return updatedPayment;
  }
}
