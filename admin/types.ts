export type VehicleStatus = 'available' | 'rented' | 'maintenance';

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  plateNumber: string;
  dailyPrice: number;
  status: VehicleStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  nationalId?: string | null;
  driverLicense?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  plateNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  dailyPrice: number;
  deposit: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

