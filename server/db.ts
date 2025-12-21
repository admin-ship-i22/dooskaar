import Database from 'better-sqlite3';
import path from 'node:path';

export type Db = Database.Database;

export function openDb(): Db {
  const databasePath = process.env.DATABASE_PATH || 'server/data.sqlite';
  const resolved = path.isAbsolute(databasePath)
    ? databasePath
    : path.resolve(process.cwd(), databasePath);

  const db = new Database(resolved);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export function migrate(db: Db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      plate_number TEXT NOT NULL UNIQUE,
      daily_price INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'available', -- available | rented | maintenance
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      national_id TEXT,
      driver_license TEXT,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      vehicle_id TEXT NOT NULL,
      customer_id TEXT NOT NULL,
      start_date TEXT NOT NULL, -- ISO date (YYYY-MM-DD)
      end_date TEXT NOT NULL,   -- ISO date (YYYY-MM-DD)
      daily_price INTEGER NOT NULL,
      deposit INTEGER NOT NULL DEFAULT 0,
      total_price INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed | active | completed | cancelled
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE RESTRICT,
      FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE RESTRICT
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_id ON bookings(vehicle_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date, end_date);
  `);
}

