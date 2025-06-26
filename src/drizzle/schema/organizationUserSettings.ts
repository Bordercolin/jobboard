import { boolean, integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { OrganizationTable } from "./organizations";
import { createdAt, updatedAt } from "../schemahelpers";
import { relations } from "drizzle-orm";

export const OrganizationUserSettingsTable = pgTable(
  "organization_user_settings",
  {
    organizationId: varchar({ length: 255 })
      .references(() => OrganizationTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar({ length: 255 })
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    newApplicationNotifications: boolean().notNull().default(true),
    minimumRating: integer(),
    createdAt,
    updatedAt,
  },
  (table) => [
    primaryKey({ columns: [table.organizationId, table.userId] }),
  ]
);

export const OrganizationUserSettingsTableRelations = relations(
  OrganizationUserSettingsTable,
  ({ one }) => ({
    organization: one(OrganizationTable, {
      fields: [OrganizationUserSettingsTable.organizationId],
      references: [OrganizationTable.id],
    }),
    user: one(UserTable, {
      fields: [OrganizationUserSettingsTable.userId],
      references: [UserTable.id],
    }),
  })
);
