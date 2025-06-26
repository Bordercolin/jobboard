CREATE TYPE "public"."job_listing_applications_stage" AS ENUM('applied', 'shortlisted', 'interviewing', 'hired', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."job_listings_experience_level" AS ENUM('entry', 'mid', 'senior');--> statement-breakpoint
CREATE TYPE "public"."job_listings_status" AS ENUM('published', 'delisted', 'draft');--> statement-breakpoint
CREATE TYPE "public"."job_listings_type" AS ENUM('full-time', 'part-time', 'internship');--> statement-breakpoint
CREATE TYPE "public"."job_listings_location_requirement" AS ENUM('remote', 'on-site', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."job_listings_wage_interval" AS ENUM('hourly', 'yearly');--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"imageUrl" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_notification_settings" (
	"userId" varchar(255) NOT NULL,
	"newJobNotifications" boolean DEFAULT true NOT NULL,
	"aiPrompt" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_resume" (
	"userId" varchar(255) PRIMARY KEY NOT NULL,
	"resumeFileUrl" varchar(255) NOT NULL,
	"resumeFileKey" varchar(255) NOT NULL,
	"aiSummary" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_user_settings" (
	"organizationId" varchar(255) NOT NULL,
	"userId" varchar(255) NOT NULL,
	"newApplicationNotifications" boolean DEFAULT true NOT NULL,
	"minimumRating" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "organization_user_settings_organizationId_userId_pk" PRIMARY KEY("organizationId","userId")
);
--> statement-breakpoint
CREATE TABLE "job_listing_applications" (
	"jobListingId" uuid NOT NULL,
	"userId" varchar(255) NOT NULL,
	"coverLetter" varchar(255) NOT NULL,
	"rating" integer,
	"stage" "job_listing_applications_stage" DEFAULT 'applied' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "job_listing_applications_jobListingId_userId_pk" PRIMARY KEY("jobListingId","userId")
);
--> statement-breakpoint
CREATE TABLE "job_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"wage" integer,
	"wageInterval" "job_listings_wage_interval",
	"state" varchar(255),
	"city" varchar(255),
	"isFeatured" boolean DEFAULT false NOT NULL,
	"locationRequirement" "job_listings_location_requirement" NOT NULL,
	"experienceLevel" "job_listings_experience_level" NOT NULL,
	"status" "job_listings_status" NOT NULL,
	"type" "job_listings_type" NOT NULL,
	"postedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"imageUrl" varchar(255),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_notification_settings" ADD CONSTRAINT "user_notification_settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_resume" ADD CONSTRAINT "user_resume_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_user_settings" ADD CONSTRAINT "organization_user_settings_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_user_settings" ADD CONSTRAINT "organization_user_settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_listing_applications" ADD CONSTRAINT "job_listing_applications_jobListingId_job_listings_id_fk" FOREIGN KEY ("jobListingId") REFERENCES "public"."job_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_listing_applications" ADD CONSTRAINT "job_listing_applications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_listings" ADD CONSTRAINT "job_listings_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "job_listings_state_index" ON "job_listings" USING btree ("state");