import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required — copy .env.example to .env.local");
}

const globalForDb = globalThis as typeof globalThis & {
  __funscholarMysqlPool?: mysql.Pool;
};

// Hosted MySQL (TiDB Cloud among them) refuses plaintext connections, and the
// resulting error says nothing useful about why. Default to TLS whenever the
// host isn't local, so a forgotten flag can't cost an afternoon. DB_SSL
// overrides in either direction.
const isLocalHost = /@(localhost|127\.0\.0\.1|\[::1\])[:/]/.test(databaseUrl);
const useTls = process.env.DB_SSL ? process.env.DB_SSL === "true" : !isLocalHost;

/**
 * Cached in every environment, production included. Serverless hosts spin up a
 * fresh module instance per cold start, so without this each one would open its
 * own pool and the open connections would stack until the server refused new
 * ones — managed MySQL plans commonly cap the account at around 20.
 */
export const pool =
  globalForDb.__funscholarMysqlPool ??
  mysql.createPool({
    uri: databaseUrl,
    // Small on purpose. Many instances holding a few connections each stays
    // under the cap; mysql2's default of 10 does not.
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 3),
    // minVersion matches what TiDB Cloud documents for mysql2, and is a sane
    // floor for any other provider.
    ssl: useTls ? { minVersion: "TLSv1.2", rejectUnauthorized: true } : undefined,
  });

globalForDb.__funscholarMysqlPool = pool;

export const db = drizzle(pool);
