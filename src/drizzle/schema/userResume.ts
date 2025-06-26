import { pgTable, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { createdAt, updatedAt } from "../schemahelpers";
import { relations } from "drizzle-orm";

export const UserResumeTable = pgTable("user_resume", {
  userId: varchar({ length: 255 })
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull()
    .primaryKey(),
  resumeFileUrl: varchar({ length: 255 }).notNull(),
  resumeFileKey: varchar({ length: 255 }).notNull(),
  aiSummary: varchar({ length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const UserResumeTableRelations = relations(
  UserResumeTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserResumeTable.userId],
      references: [UserTable.id],
    }),
  })
);
