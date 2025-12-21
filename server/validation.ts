import { z } from 'zod';
import { isIsoDate } from './utils.js';

export const vehicleStatusSchema = z.enum(['available', 'rented', 'maintenance']);

export const vehicleCreateSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  plateNumber: z.string().min(1),
  dailyPrice: z.number().int().nonnegative(),
  status: vehicleStatusSchema.optional(),
  notes: z.string().optional(),
});

export const vehicleUpdateSchema = vehicleCreateSchema.partial();

export const customerCreateSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(6),
  nationalId: z.string().optional(),
  driverLicense: z.string().optional(),
  notes: z.string().optional(),
});

export const customerUpdateSchema = customerCreateSchema.partial();

export const bookingStatusSchema = z.enum(['confirmed', 'active', 'completed', 'cancelled']);

export const bookingCreateSchema = z.object({
  vehicleId: z.string().min(1),
  customerId: z.string().min(1),
  startDate: z.string().refine(isIsoDate, 'startDate must be YYYY-MM-DD'),
  endDate: z.string().refine(isIsoDate, 'endDate must be YYYY-MM-DD'),
  dailyPrice: z.number().int().nonnegative().optional(),
  deposit: z.number().int().nonnegative().optional(),
  status: bookingStatusSchema.optional(),
  notes: z.string().optional(),
});

export const bookingUpdateSchema = bookingCreateSchema.partial();

export const loginSchema = z.object({
  password: z.string().min(1),
});

