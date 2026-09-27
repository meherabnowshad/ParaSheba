import { create } from 'zustand';

interface LocationState {
  city: string;
  area: string;
  isModalOpen: boolean;
  isLocating: boolean;
  setCity: (city: string) => void;
  setArea: (area: string) => void;
  setLocation: (city: string, area: string) => void;
  setModalOpen: (open: boolean) => void;
  detectCurrentLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set) => ({
  city: 'Dhaka',
  area: 'Dhanmondi',
  isModalOpen: false,
  isLocating: false,
  setCity: (city) => set({ city }),
  setArea: (area) => set({ area }),
  setLocation: (city, area) => set({ city, area, isModalOpen: false }),
  setModalOpen: (isModalOpen) => set({ isModalOpen }),
  detectCurrentLocation: async () => {
    set({ isLocating: true });
    // Simulate or invoke browser geolocation
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        // Default detected neighborhood in Dhaka
        set({ city: 'Dhaka', area: 'Dhanmondi', isLocating: false, isModalOpen: false });
      } catch {
        set({ isLocating: false });
      }
    } else {
      set({ isLocating: false });
    }
  },
}));
