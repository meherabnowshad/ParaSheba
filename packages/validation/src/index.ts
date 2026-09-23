import { z } from 'zod';
import { UserRole, PaymentMethod, CaregiverSpecialization } from '@parasheba/types';

// Bangladesh Phone Validation: 11 digits starting with 013, 014, 015, 016, 017, 018, 019
export const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;

export const phoneSchema = z
  .string()
  .regex(bdPhoneRegex, 'Please provide a valid Bangladeshi phone number (e.g. 01712345678)');

export const registerUserSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: phoneSchema,
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.nativeEnum(UserRole).default(UserRole.CUSTOMER),
});

export const loginUserSchema = z.object({
  phoneOrEmail: z.string().min(3, 'Phone or email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const bookingCreateSchema = z.object({
  serviceId: z.string().min(1, 'Service is required'),
  providerId: z.string().min(1, 'Provider is required'),
  scheduledDate: z.string().min(1, 'Date is required'),
  scheduledTimeSlot: z.string().min(1, 'Time slot is required'),
  address: z.string().min(5, 'Delivery address is required'),
  area: z.string().min(2, 'Area is required'),
  notes: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).default(PaymentMethod.CASH_ON_DELIVERY),
});

export const measurementProfileSchema = z.object({
  profileName: z.string().min(2, 'Profile name required'),
  gender: z.enum(['MALE', 'FEMALE', 'CHILD']),
  garmentType: z.string().min(2, 'Garment type required'),
  measurements: z.record(z.union([z.number(), z.string()])),
  notes: z.string().optional(),
});

export const tailoringOrderSchema = z.object({
  tailorId: z.string().min(1, 'Tailor is required'),
  garmentType: z.string().min(1, 'Garment type is required'),
  measurementProfileId: z.string().optional(),
  measurementVisitRequested: z.boolean().default(false),
  fabricSource: z.enum(['PROVIDED_BY_CUSTOMER', 'SOURCED_BY_KARIGOR']),
  fabricDetails: z.string().optional(),
  specialInstructions: z.string().optional(),
  deliveryAddress: z.string().min(5, 'Delivery address required'),
  area: z.string().min(2, 'Area is required'),
});

export const caregiverRequestSchema = z.object({
  caregiverId: z.string().min(1, 'Caregiver is required'),
  recipientName: z.string().min(2, 'Recipient name required'),
  recipientAge: z.number().positive(),
  recipientCondition: z.string().min(3, 'Condition description required'),
  specializationNeeded: z.nativeEnum(CaregiverSpecialization),
  frequency: z.enum(['DAILY', 'WEEKDAYS', 'WEEKENDS', 'MONTHLY']),
  startDate: z.string().min(1, 'Start date required'),
  address: z.string().min(5, 'Address required'),
  emergencyContact: phoneSchema,
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
  providerId: z.string().optional(),
  businessId: z.string().optional(),
  bookingId: z.string().optional(),
});
