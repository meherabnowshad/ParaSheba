// ParaSheba Design Tokens & Helpers

export const BANGLADESH_DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
] as const;

export const DHAKA_AREAS = [
  'Dhanmondi',
  'Gulshan 1',
  'Gulshan 2',
  'Banani',
  'Uttara',
  'Mirpur',
  'Mohammadpur',
  'Bashundhara R/A',
  'Badda',
  'Baridhara',
  'Motijheel',
  'Old Dhaka',
  'Khilgaon',
  'Malibagh',
  'Lalmatia',
  'Tejgaon',
] as const;

export const CHITTAGONG_AREAS = [
  'Agrabad',
  'GEC Circle',
  'Nasirabad',
  'Halishahar',
  'Khulshi',
  'Panchlaish',
  'Chawkbazar',
] as const;

export const SYLHET_AREAS = [
  'Zindabazar',
  'Ambarkhana',
  'Upashahar',
  'Shibganj',
  'Kumarpara',
] as const;

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-IN')}`;
}

export function formatBnNumber(num: number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((d) => bnDigits[parseInt(d, 10)] || d)
    .join('');
}

export const BRAND_TOKENS = {
  colors: {
    primary: '#0F766E', // Rich teal - trustworthy, modern, distinctive
    primaryHover: '#0D655E',
    primaryLight: '#F0FDFA',
    primaryBorder: '#99F6E4',
    secondary: '#D97706', // Warm amber accent
    secondaryHover: '#B45309',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    foreground: '#0F172A',
    muted: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
};
