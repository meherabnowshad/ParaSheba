import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

export interface RegisterDto {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  role?: Role;
}

export interface LoginDto {
  phoneOrEmail: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { phone: dto.phone },
          ...(dto.email ? [{ email: dto.email }] : []),
        ],
      },
    });

    if (existing) {
      throw new ConflictException('A user already exists with this phone number or email');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const role = dto.role || Role.CUSTOMER;

    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        email: dto.email || null,
        fullName: dto.fullName,
        passwordHash,
        role,
        isVerified: true,
        ...(role === Role.CUSTOMER
          ? {
              customerProfile: {
                create: {
                  defaultCity: 'Dhaka',
                },
              },
            }
          : {}),
      },
    });

    const token = this.generateToken(user.id, user.phone, user.role);

    return {
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    };
  }

  async login(dto: LoginDto) {
    const isEmail = dto.phoneOrEmail.includes('@');
    const user = await this.prisma.user.findFirst({
      where: isEmail ? { email: dto.phoneOrEmail } : { phone: dto.phoneOrEmail },
      include: {
        customerProfile: true,
        providerProfile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials. Please check your phone/email and password.');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials. Please check your phone/email and password.');
    }

    const token = this.generateToken(user.id, user.phone, user.role);

    return {
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        customerProfile: user.customerProfile,
        providerProfile: user.providerProfile,
      },
      token,
    };
  }

  async sendOtp(phone: string) {
    const simulatedOtp = '123456';
    return {
      message: `Verification OTP successfully sent to ${phone}`,
      debugOtp: simulatedOtp,
    };
  }

  async verifyOtp(phone: string, otp: string) {
    if (otp !== '123456') {
      throw new BadRequestException('Invalid OTP code. Please enter 123456 for testing.');
    }
    return {
      verified: true,
      phone,
      message: 'Phone number verified successfully',
    };
  }

  private generateToken(userId: string, phone: string, role: string) {
    return this.jwtService.sign({
      sub: userId,
      phone,
      role,
    });
  }
}
