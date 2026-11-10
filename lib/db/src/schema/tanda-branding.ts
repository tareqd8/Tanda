import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const tandaBrandingTable = pgTable("tanda_branding", {
  id: text("id").primaryKey().default("site"),
  logoObjectPath: text("logo_object_path"),
  logoFilename: text("logo_filename"),
  logoContentType: text("logo_content_type"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertTandaBrandingSchema = createInsertSchema(
  tandaBrandingTable,
).omit({ updatedAt: true });

export type InsertTandaBranding = z.infer<typeof insertTandaBrandingSchema>;
export type TandaBranding = typeof tandaBrandingTable.$inferSelect;
