import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ServicesModule } from './modules/services/services.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { KarigorModule } from './modules/karigor/karigor.module';
import { CaregiverModule } from './modules/caregiver/caregiver.module';
import { RentalModule } from './modules/rental/rental.module';
import { EmergencyModule } from './modules/emergency/emergency.module';
import { BusinessesModule } from './modules/businesses/businesses.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EventsModule,
    AuthModule,
    CategoriesModule,
    ServicesModule,
    ProvidersModule,
    BookingsModule,
    KarigorModule,
    CaregiverModule,
    RentalModule,
    EmergencyModule,
    BusinessesModule,
    PaymentsModule,
    ReviewsModule,
    AdminModule,
  ],
})
export class AppModule {}
