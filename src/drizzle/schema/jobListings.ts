import {
  boolean,
  integer,
  pgTable,
  text,
  varchar,
  pgEnum,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemahelpers";
import { OrganizationTable } from "./organizations";
import { relations } from "drizzle-orm";

export const wageIntervals = ["hourly", "yearly"] as const;
export type WageInterval = (typeof wageIntervals)[number];
export const wageIntervalEnum = pgEnum(
  "job_listings_wage_interval",
  wageIntervals
);

export const locationRequirements = ["remote", "on-site", "hybrid"] as const;
export type LocationRequirement = (typeof locationRequirements)[number];
export const locationRequirementEnum = pgEnum(
  "job_listings_location_requirement",
  locationRequirements
);

export const experienceLevels = ["entry", "mid", "senior"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum(
  "job_listings_experience_level",
  experienceLevels
);

export const jobListingStatuses = ["published", "delisted", "draft"] as const;
export type JobListingStatus = (typeof jobListingStatuses)[number];
export const jobListingStatusEnum = pgEnum(
  "job_listings_status",
  jobListingStatuses
);

export const jobListingTypes = [
  "full-time",
  "part-time",
  "internship",
] as const;
export type JobListingType = (typeof jobListingTypes)[number];
export const jobListingTypeEnum = pgEnum("job_listings_type", jobListingTypes);

export const JobListingTable = pgTable(
  "job_listings",
  {
    id,
    organizationId: varchar({ length: 255 })
      .references(() => OrganizationTable.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    wage: integer(),
    wageInterval: wageIntervalEnum(),
    state: varchar({ length: 255 }),
    city: varchar({ length: 255 }),
    isFeatured: boolean().notNull().default(false),
    locationRequirement: locationRequirementEnum().notNull(),
    experienceLevel: experienceLevelEnum().notNull(),
    status: jobListingStatusEnum().notNull(),
    type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [index().on(table.state)]
);

export const JobListingTableRelations = relations(
  JobListingTable,
  ({ one }) => ({
    organization: one(OrganizationTable, {
      fields: [JobListingTable.organizationId],
      references: [OrganizationTable.id],
    }),
  })
);
