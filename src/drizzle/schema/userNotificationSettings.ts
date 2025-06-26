import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { createdAt, updatedAt } from "../schemahelpers";
import { relations } from "drizzle-orm";

export const UserNotificationSettingsTable = pgTable(
  "user_notification_settings",
  {
    userId: varchar({ length: 255 })
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    newJobNotifications: boolean().notNull().default(true),
    aiPrompt: varchar({ length: 255 }).notNull(),
    createdAt,
    updatedAt,
  }
);

export const UserNotificationSettingsTableRelations = relations(
  UserNotificationSettingsTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserNotificationSettingsTable.userId],
      references: [UserTable.id],
    }),
  })
);  
