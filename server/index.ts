import express from 'express';
import cors from 'cors';
import { openDb, migrate } from './db.js';
import {
  bookingCreateSchema,
  bookingUpdateSchema,
  customerCreateSchema,
  customerUpdateSchema,
  loginSchema,
  vehicleCreateSchema,
  vehicleUpdateSchema,
} from './validation.js';
import { daysBetweenInclusive, newId, nowIso } from './utils.js';

const PORT = Number(process.env.PORT || 3001);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

const app = express();
app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ limit: '1mb' }));

const db = openDb();
migrate(db);

// Demo-grade token store (in-memory).
const validTokens = new Set<string>();

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.header('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: nowIso() });
});

app.post('/api/auth/login', (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid body' });
  if (parsed.data.password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Invalid password' });

  const token = newId('token');
  validTokens.add(token);
  res.json({ token });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  const header = req.header('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  if (token) validTokens.delete(token);
  res.json({ ok: true });
});

// ---------------- Vehicles ----------------
app.get('/api/vehicles', requireAuth, (_req, res) => {
  const rows = db
    .prepare(
      `SELECT id, name, category, plate_number as plateNumber, daily_price as dailyPrice, status, notes, created_at as createdAt, updated_at as updatedAt
       FROM vehicles
       ORDER BY updated_at DESC`,
    )
    .all();
  res.json(rows);
});

app.post('/api/vehicles', requireAuth, (req, res) => {
  const parsed = vehicleCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const id = newId('veh');
  const t = nowIso();
  const v = parsed.data;

  try {
    db.prepare(
      `INSERT INTO vehicles (id, name, category, plate_number, daily_price, status, notes, created_at, updated_at)
       VALUES (@id, @name, @category, @plateNumber, @dailyPrice, @status, @notes, @createdAt, @updatedAt)`,
    ).run({
      id,
      name: v.name,
      category: v.category,
      plateNumber: v.plateNumber,
      dailyPrice: v.dailyPrice,
      status: v.status ?? 'available',
      notes: v.notes ?? null,
      createdAt: t,
      updatedAt: t,
    });
  } catch (e: any) {
    if (String(e?.message || '').includes('UNIQUE')) {
      return res.status(409).json({ error: 'Plate number already exists' });
    }
    return res.status(500).json({ error: 'Database error' });
  }

  res.status(201).json({ id });
});

app.patch('/api/vehicles/:id', requireAuth, (req, res) => {
  const parsed = vehicleUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const id = req.params.id;

  const existing = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const updates = parsed.data;
  const t = nowIso();

  try {
    db.prepare(
      `UPDATE vehicles SET
         name = COALESCE(@name, name),
         category = COALESCE(@category, category),
         plate_number = COALESCE(@plateNumber, plate_number),
         daily_price = COALESCE(@dailyPrice, daily_price),
         status = COALESCE(@status, status),
         notes = COALESCE(@notes, notes),
         updated_at = @updatedAt
       WHERE id = @id`,
    ).run({
      id,
      name: updates.name ?? null,
      category: updates.category ?? null,
      plateNumber: updates.plateNumber ?? null,
      dailyPrice: updates.dailyPrice ?? null,
      status: updates.status ?? null,
      notes: updates.notes ?? null,
      updatedAt: t,
    });
  } catch (e: any) {
    if (String(e?.message || '').includes('UNIQUE')) {
      return res.status(409).json({ error: 'Plate number already exists' });
    }
    return res.status(500).json({ error: 'Database error' });
  }

  res.json({ ok: true });
});

app.delete('/api/vehicles/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  try {
    const result = db.prepare('DELETE FROM vehicles WHERE id = ?').run(id);
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  } catch {
    return res.status(409).json({ error: 'Vehicle is referenced by bookings' });
  }
  res.json({ ok: true });
});

// ---------------- Customers ----------------
app.get('/api/customers', requireAuth, (_req, res) => {
  const rows = db
    .prepare(
      `SELECT id, full_name as fullName, phone, national_id as nationalId, driver_license as driverLicense, notes, created_at as createdAt, updated_at as updatedAt
       FROM customers
       ORDER BY updated_at DESC`,
    )
    .all();
  res.json(rows);
});

app.post('/api/customers', requireAuth, (req, res) => {
  const parsed = customerCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const id = newId('cus');
  const t = nowIso();
  const c = parsed.data;

  db.prepare(
    `INSERT INTO customers (id, full_name, phone, national_id, driver_license, notes, created_at, updated_at)
     VALUES (@id, @fullName, @phone, @nationalId, @driverLicense, @notes, @createdAt, @updatedAt)`,
  ).run({
    id,
    fullName: c.fullName,
    phone: c.phone,
    nationalId: c.nationalId ?? null,
    driverLicense: c.driverLicense ?? null,
    notes: c.notes ?? null,
    createdAt: t,
    updatedAt: t,
  });

  res.status(201).json({ id });
});

app.patch('/api/customers/:id', requireAuth, (req, res) => {
  const parsed = customerUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const id = req.params.id;

  const existing = db.prepare('SELECT id FROM customers WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const u = parsed.data;
  const t = nowIso();

  db.prepare(
    `UPDATE customers SET
       full_name = COALESCE(@fullName, full_name),
       phone = COALESCE(@phone, phone),
       national_id = COALESCE(@nationalId, national_id),
       driver_license = COALESCE(@driverLicense, driver_license),
       notes = COALESCE(@notes, notes),
       updated_at = @updatedAt
     WHERE id = @id`,
  ).run({
    id,
    fullName: u.fullName ?? null,
    phone: u.phone ?? null,
    nationalId: u.nationalId ?? null,
    driverLicense: u.driverLicense ?? null,
    notes: u.notes ?? null,
    updatedAt: t,
  });

  res.json({ ok: true });
});

app.delete('/api/customers/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  try {
    const result = db.prepare('DELETE FROM customers WHERE id = ?').run(id);
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  } catch {
    return res.status(409).json({ error: 'Customer is referenced by bookings' });
  }
  res.json({ ok: true });
});

// ---------------- Bookings ----------------
function bookingOverlaps(vehicleId: string, startDate: string, endDate: string, excludeBookingId?: string): boolean {
  // Overlap logic: two ranges overlap if startA <= endB && startB <= endA
  const row = db
    .prepare(
      `SELECT id FROM bookings
       WHERE vehicle_id = @vehicleId
         AND status IN ('confirmed','active')
         AND start_date <= @endDate
         AND end_date >= @startDate
         ${excludeBookingId ? 'AND id != @excludeId' : ''}
       LIMIT 1`,
    )
    .get({
      vehicleId,
      startDate,
      endDate,
      excludeId: excludeBookingId,
    });
  return !!row;
}

app.get('/api/bookings', requireAuth, (_req, res) => {
  const rows = db
    .prepare(
      `SELECT
         b.id,
         b.vehicle_id as vehicleId,
         v.name as vehicleName,
         v.plate_number as plateNumber,
         b.customer_id as customerId,
         c.full_name as customerName,
         c.phone as customerPhone,
         b.start_date as startDate,
         b.end_date as endDate,
         b.daily_price as dailyPrice,
         b.deposit,
         b.total_price as totalPrice,
         b.status,
         b.notes,
         b.created_at as createdAt,
         b.updated_at as updatedAt
       FROM bookings b
       JOIN vehicles v ON v.id = b.vehicle_id
       JOIN customers c ON c.id = b.customer_id
       ORDER BY b.updated_at DESC`,
    )
    .all();
  res.json(rows);
});

app.post('/api/bookings', requireAuth, (req, res) => {
  const parsed = bookingCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const b = parsed.data;
  if (b.endDate < b.startDate) return res.status(400).json({ error: 'endDate must be >= startDate' });

  const vehicle = db
    .prepare('SELECT id, daily_price as dailyPrice, status FROM vehicles WHERE id = ?')
    .get(b.vehicleId) as { id: string; dailyPrice: number; status: string } | undefined;
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  if (vehicle.status === 'maintenance') return res.status(409).json({ error: 'Vehicle in maintenance' });

  const customer = db.prepare('SELECT id FROM customers WHERE id = ?').get(b.customerId);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  if (bookingOverlaps(b.vehicleId, b.startDate, b.endDate)) {
    return res.status(409).json({ error: 'Vehicle is not available in selected dates' });
  }

  const dailyPrice = b.dailyPrice ?? vehicle.dailyPrice;
  const deposit = b.deposit ?? 0;
  const days = daysBetweenInclusive(b.startDate, b.endDate);
  const totalPrice = Math.max(0, days * dailyPrice - deposit);

  const id = newId('bok');
  const t = nowIso();

  db.prepare(
    `INSERT INTO bookings (id, vehicle_id, customer_id, start_date, end_date, daily_price, deposit, total_price, status, notes, created_at, updated_at)
     VALUES (@id, @vehicleId, @customerId, @startDate, @endDate, @dailyPrice, @deposit, @totalPrice, @status, @notes, @createdAt, @updatedAt)`,
  ).run({
    id,
    vehicleId: b.vehicleId,
    customerId: b.customerId,
    startDate: b.startDate,
    endDate: b.endDate,
    dailyPrice,
    deposit,
    totalPrice,
    status: b.status ?? 'confirmed',
    notes: b.notes ?? null,
    createdAt: t,
    updatedAt: t,
  });

  res.status(201).json({ id, totalPrice, days });
});

app.patch('/api/bookings/:id', requireAuth, (req, res) => {
  const parsed = bookingUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const id = req.params.id;
  const existing = db
    .prepare(
      `SELECT id, vehicle_id as vehicleId, customer_id as customerId, start_date as startDate, end_date as endDate, daily_price as dailyPrice, deposit, status
       FROM bookings WHERE id = ?`,
    )
    .get(id) as
    | {
        id: string;
        vehicleId: string;
        customerId: string;
        startDate: string;
        endDate: string;
        dailyPrice: number;
        deposit: number;
        status: string;
      }
    | undefined;
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const u = parsed.data;
  const nextVehicleId = u.vehicleId ?? existing.vehicleId;
  const nextCustomerId = u.customerId ?? existing.customerId;
  const nextStart = u.startDate ?? existing.startDate;
  const nextEnd = u.endDate ?? existing.endDate;

  if (nextEnd < nextStart) return res.status(400).json({ error: 'endDate must be >= startDate' });

  const vehicle = db
    .prepare('SELECT id, daily_price as dailyPrice, status FROM vehicles WHERE id = ?')
    .get(nextVehicleId) as { id: string; dailyPrice: number; status: string } | undefined;
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  if (vehicle.status === 'maintenance') return res.status(409).json({ error: 'Vehicle in maintenance' });

  const customer = db.prepare('SELECT id FROM customers WHERE id = ?').get(nextCustomerId);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  // If booking remains "blocking" statuses, enforce availability check.
  const nextStatus = u.status ?? existing.status;
  const blocksAvailability = nextStatus === 'confirmed' || nextStatus === 'active';
  if (blocksAvailability && bookingOverlaps(nextVehicleId, nextStart, nextEnd, id)) {
    return res.status(409).json({ error: 'Vehicle is not available in selected dates' });
  }

  const dailyPrice = u.dailyPrice ?? existing.dailyPrice ?? vehicle.dailyPrice;
  const deposit = u.deposit ?? existing.deposit ?? 0;
  const days = daysBetweenInclusive(nextStart, nextEnd);
  const totalPrice = Math.max(0, days * dailyPrice - deposit);

  const t = nowIso();
  db.prepare(
    `UPDATE bookings SET
       vehicle_id = @vehicleId,
       customer_id = @customerId,
       start_date = @startDate,
       end_date = @endDate,
       daily_price = @dailyPrice,
       deposit = @deposit,
       total_price = @totalPrice,
       status = @status,
       notes = COALESCE(@notes, notes),
       updated_at = @updatedAt
     WHERE id = @id`,
  ).run({
    id,
    vehicleId: nextVehicleId,
    customerId: nextCustomerId,
    startDate: nextStart,
    endDate: nextEnd,
    dailyPrice,
    deposit,
    totalPrice,
    status: nextStatus,
    notes: u.notes ?? null,
    updatedAt: t,
  });

  res.json({ ok: true, totalPrice, days });
});

app.delete('/api/bookings/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  const result = db.prepare('DELETE FROM bookings WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

// Basic error handler (ensure JSON).
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});

