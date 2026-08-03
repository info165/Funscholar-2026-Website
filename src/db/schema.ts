import {
  boolean,
  customType,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/** LONGBLOB isn't in drizzle's mysql helpers, so declare it explicitly. */
const longblob = customType<{ data: Buffer; driverData: Buffer }>({
  dataType: () => "longblob",
});

/**
 * Messages submitted through the contact form.
 * Read these in phpMyAdmin — newest first by `created_at`.
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 190 }).notNull(),
  organization: varchar("organization", { length: 190 }),
  message: text("message").notNull(),
  /** Tick this in phpMyAdmin once an enquiry has been dealt with. */
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Blog posts. Add rows directly in phpMyAdmin.
 *
 * Thumbnails work two ways:
 *  - `thumbnail_url` — path to a file in /public (e.g. /images/blogs/post.jpg).
 *    Preferred: the browser caches it and the database stays small.
 *  - `thumbnail_data` + `thumbnail_mime` — upload the image straight into the
 *    row with phpMyAdmin's file picker. Served via /api/blogs/[id]/thumbnail.
 *
 * If both are set, `thumbnail_url` wins.
 */
export const blogs = mysqlTable("blogs", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  excerpt: text("excerpt").notNull(),
  /** Full article body. Optional — the listing only needs the excerpt. */
  content: text("content"),
  readTime: varchar("read_time", { length: 40 }).default("5 min read").notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 400 }),
  thumbnailData: longblob("thumbnail_data"),
  thumbnailMime: varchar("thumbnail_mime", { length: 100 }),
  /** Untick to hide a post without deleting it. */
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type Blog = typeof blogs.$inferSelect;
