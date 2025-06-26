import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemahelpers";
import { relations } from "drizzle-orm";
import { UserResumeTable } from "./userResume";
import { UserNotificationSettingsTable } from "./userNotificationSettings";
import { OrganizationUserSettingsTable } from "./organizationUserSettings";

export const UserTable = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  imageUrl: varchar({ length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const UserTableRelations = relations(UserTable, ({ one, many }) => ({
  userNotificationSettings: one(UserNotificationSettingsTable),
  userResume: one(UserResumeTable),
  organizationUserSettings: many(OrganizationUserSettingsTable),
}));
