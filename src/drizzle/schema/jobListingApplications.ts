import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemahelpers";
import { JobListingTable } from "./jobListings";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

export const applicationStages = [
  "applied",
  "shortlisted",
  "interviewing",
  "hired",
  "rejected",
] as const;
export type ApplicationStage = (typeof applicationStages)[number];
export const applicationStageEnum = pgEnum(
  "job_listing_applications_stage",
  applicationStages
);

export const JobListingApplicationTable = pgTable(
  "job_listing_applications",
  {
    jobListingId: uuid()
      .references(() => JobListingTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar({ length: 255 })
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    coverLetter: varchar({ length: 255 }).notNull(),
    rating: integer(),
    stage: applicationStageEnum().default("applied").notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.jobListingId, table.userId] })]
);

export const JobListingApplicationTableRelations = relations(
  JobListingApplicationTable,
  ({ one }) => ({
    jobListing: one(JobListingTable, {
      fields: [JobListingApplicationTable.jobListingId],
      references: [JobListingTable.id],
    }),
    user: one(UserTable, {
      fields: [JobListingApplicationTable.userId],
      references: [UserTable.id],
    }),
  })
);
