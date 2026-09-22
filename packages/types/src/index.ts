export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  BUSINESS_STAFF = 'BUSINESS_STAFF',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER',
  ADMIN = 'ADMIN',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROVIDER_ON_THE_WAY = 'PROVIDER_ON_THE_WAY',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum DeliveryStatus {
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  PICKUP_PENDING = 'PICKUP_PENDING',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  ARRIVING = 'ARRIVING',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum PaymentMethod {
  BKASH = 'BKASH',
  NAGAD = 'NAGAD',
  SSLCOMMERZ = 'SSLCOMMERZ',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  WALLET = 'WALLET',
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum TailoringStage {
  MEASUREMENT = 'MEASUREMENT',
  DESIGN_CONFIRMATION = 'DESIGN_CONFIRMATION',
  FABRIC = 'FABRIC',
  CUTTING = 'CUTTING',
  STITCHING = 'STITCHING',
  QUALITY_CHECK = 'QUALITY_CHECK',
  READY = 'READY',
  DELIVERY = 'DELIVERY',
}

export enum CaregiverSpecialization {
  ELDERLY_CARE = 'ELDERLY_CARE',
  PATIENT_ASSISTANCE = 'PATIENT_ASSISTANCE',
  CHILDCARE = 'CHILDCARE',
  COMPANION_CARE = 'COMPANION_CARE',
  HOME_ASSISTANCE = 'HOME_ASSISTANCE',
}

export enum RentalType {
  PROPERTY = 'PROPERTY',
  VEHICLE = 'VEHICLE',
  EQUIPMENT = 'EQUIPMENT',
}

export enum EmergencyServiceType {
  AMBULANCE = 'AMBULANCE',
  ROADSIDE_ASSISTANCE = 'ROADSIDE_ASSISTANCE',
  EMERGENCY_UTILITY = 'EMERGENCY_UTILITY',
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
  area?: string;
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  user?: User;
  headline: string;
  bio: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  verificationStatus: VerificationStatus;
  nidVerified: boolean;
  tradeLicenseVerified?: boolean;
  serviceCategories: string[];
  serviceAreas: string[];
  basePrice: number;
  isAvailableToday: boolean;
  location: GeoLocation;
  portfolio: string[];
  badges: string[];
  cancellationPolicy: string;
  completedJobsCount: number;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  nameBn?: string;
  description: string;
  iconName: string;
  servicesCount?: number;
  group: 'home' | 'personal' | 'vehicle' | 'marketplace' | 'rental' | 'emergency';
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  category?: ServiceCategory;
  name: string;
  nameBn?: string;
  slug: string;
  description: string;
  startingPrice: number;
  priceUnit: string;
  durationEstimate?: string;
  popular: boolean;
  icon?: string;
}

export interface Booking {
  id: string;
  trackingCode: string;
  customerId: string;
  customer?: User;
  providerId: string;
  provider?: ProviderProfile;
  serviceId: string;
  service?: ServiceItem;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTimeSlot: string;
  address: string;
  area: string;
  notes?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  statusHistory: Array<{
    status: BookingStatus;
    timestamp: string;
    note?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  bookingId?: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  providerId?: string;
  businessId?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MeasurementProfile {
  id: string;
  userId: string;
  profileName: string;
  gender: 'MALE' | 'FEMALE' | 'CHILD';
  garmentType: string;
  measurements: Record<string, number | string>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TailoringOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  tailorId: string;
  garmentType: string;
  measurementProfileId?: string;
  measurementVisitRequested: boolean;
  fabricSource: 'PROVIDED_BY_CUSTOMER' | 'SOURCED_BY_KARIGOR';
  fabricDetails?: string;
  specialInstructions?: string;
  currentStage: TailoringStage;
  estimatedDeliveryDate: string;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  statusHistory: Array<{
    stage: TailoringStage;
    timestamp: string;
    note?: string;
  }>;
  createdAt: string;
}

export interface CaregiverProfile {
  id: string;
  userId: string;
  user?: User;
  specializations: CaregiverSpecialization[];
  experienceYears: number;
  certifications: string[];
  backgroundCheckVerified: boolean;
  nidVerified: boolean;
  rating: number;
  reviewCount: number;
  dailyRate: number;
  monthlyRate: number;
  availabilitySchedule: string;
  serviceAreas: string[];
  emergencyContact: string;
  bio: string;
}

export interface CarePlan {
  id: string;
  customerId: string;
  caregiverId: string;
  recipientName: string;
  recipientAge: number;
  recipientCondition: string;
  specializationNeeded: CaregiverSpecialization;
  frequency: 'DAILY' | 'WEEKDAYS' | 'WEEKENDS' | 'MONTHLY';
  startDate: string;
  endDate?: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  notes?: string;
}

export interface RentalListing {
  id: string;
  title: string;
  slug?: string;
  type: RentalType;
  ownerId: string;
  ownerName: string;
  location: string;
  city: string;
  pricePerDay?: number;
  pricePerMonth?: number;
  images: string[];
  specs: Record<string, string | number>;
  description: string;
  rules: string[];
  isAvailable: boolean;
  rating: number;
}

export interface EmergencyListing {
  id: string;
  name: string;
  serviceType: EmergencyServiceType;
  phone: string;
  altPhone?: string;
  operatingAreas: string[];
  vehicleType?: string;
  isAvailable247: boolean;
  verifiedEmergencyProvider: boolean;
  etaMinutes: number;
}

export interface BusinessProfile {
  id: string;
  ownerId: string;
  businessName: string;
  slug?: string;
  category: 'PHARMACY' | 'GROCERY' | 'RESTAURANT' | 'LOCAL_SHOP' | 'REPAIR_SHOP';
  tradeLicenseNumber?: string;
  isVerified: boolean;
  address: string;
  area: string;
  rating: number;
  openingHours: string;
  logoUrl?: string;
  bannerUrl?: string;
}

export interface ProductItem {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  stockCount: number;
  category: string;
  imageUrl?: string;
  unit: string;
}

export interface MarketplaceOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  businessId: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryStatus: DeliveryStatus;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
