import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemahelpers";
import { relations } from "drizzle-orm";
import { JobListingTable } from "./jobListings";
import { OrganizationUserSettingsTable } from "./organizationUserSettings";

export const OrganizationTable = pgTable("organizations", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 255 }),
  createdAt,
  updatedAt,
});

export const OrganizationTableRelations = relations(
  OrganizationTable,
  ({ many }) => ({
    jobListings: many(JobListingTable),
    organizationUserSettings: many(OrganizationUserSettingsTable),
  })
);
