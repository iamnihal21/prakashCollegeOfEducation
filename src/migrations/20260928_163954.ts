import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_payments_category" AS ENUM('tuition', 'exam', 'hostel');
  CREATE TYPE "public"."enum_payments_status" AS ENUM('pending', 'paid');
  CREATE TYPE "public"."enum_students_course" AS ENUM('bca', 'bba');
  CREATE TYPE "public"."enum_inquiries_course" AS ENUM('bca', 'bba');
  CREATE TYPE "public"."enum_home_settings_courses_course_key" AS ENUM('bca', 'bba');
  CREATE TYPE "public"."enum_home_settings_why_choose_us_icon_type" AS ENUM('MapPin', 'Wind', 'Briefcase', 'Users', 'Cpu', 'ShieldCheck', 'Sparkles', 'Building');
  CREATE TABLE "payments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"student_id" integer NOT NULL,
  	"amount" numeric NOT NULL,
  	"category" "enum_payments_category" NOT NULL,
  	"status" "enum_payments_status" DEFAULT 'pending',
  	"payment_date" timestamp(3) with time zone,
  	"transaction_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "students_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "students" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"enrollment_number" varchar NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"course" "enum_students_course" NOT NULL,
  	"needs_password_change" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "results" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"student_id" integer NOT NULL,
  	"semester" numeric NOT NULL,
  	"sgpa" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"course" "enum_inquiries_course" NOT NULL,
  	"last_qualification" varchar NOT NULL,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "placements_settings_recruiters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"industry" varchar NOT NULL,
  	"logo_id" integer
  );
  
  CREATE TABLE "home_settings_courses_careers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" varchar
  );
  
  CREATE TABLE "home_settings_courses_semesters_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"name" varchar NOT NULL,
  	"credits" numeric,
  	"type" varchar
  );
  
  CREATE TABLE "home_settings_courses_semesters" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"semester_name" varchar NOT NULL
  );
  
  CREATE TABLE "home_settings_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"course_key" "enum_home_settings_courses_course_key" NOT NULL,
  	"title" varchar NOT NULL,
  	"short_title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"duration" varchar DEFAULT '3 Years (6 Semesters)',
  	"total_credits" numeric,
  	"eligibility" varchar
  );
  
  CREATE TABLE "home_settings_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"quote" varchar NOT NULL
  );
  
  CREATE TABLE "home_settings_why_choose_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_type" "enum_home_settings_why_choose_us_icon_type" DEFAULT 'Sparkles'
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "students_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "results_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "inquiries_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "students_id" integer;
  ALTER TABLE "payments" ADD CONSTRAINT "payments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "students_sessions" ADD CONSTRAINT "students_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "placements_settings_recruiters" ADD CONSTRAINT "placements_settings_recruiters_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "placements_settings_recruiters" ADD CONSTRAINT "placements_settings_recruiters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."placements_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_courses_careers" ADD CONSTRAINT "home_settings_courses_careers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_courses_semesters_subjects" ADD CONSTRAINT "home_settings_courses_semesters_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings_courses_semesters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_courses_semesters" ADD CONSTRAINT "home_settings_courses_semesters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_courses" ADD CONSTRAINT "home_settings_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_testimonials" ADD CONSTRAINT "home_settings_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_why_choose_us" ADD CONSTRAINT "home_settings_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payments_student_idx" ON "payments" USING btree ("student_id");
  CREATE INDEX "payments_updated_at_idx" ON "payments" USING btree ("updated_at");
  CREATE INDEX "payments_created_at_idx" ON "payments" USING btree ("created_at");
  CREATE INDEX "students_sessions_order_idx" ON "students_sessions" USING btree ("_order");
  CREATE INDEX "students_sessions_parent_id_idx" ON "students_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "students_enrollment_number_idx" ON "students" USING btree ("enrollment_number");
  CREATE INDEX "students_updated_at_idx" ON "students" USING btree ("updated_at");
  CREATE INDEX "students_created_at_idx" ON "students" USING btree ("created_at");
  CREATE UNIQUE INDEX "students_email_idx" ON "students" USING btree ("email");
  CREATE INDEX "results_student_idx" ON "results" USING btree ("student_id");
  CREATE INDEX "results_updated_at_idx" ON "results" USING btree ("updated_at");
  CREATE INDEX "results_created_at_idx" ON "results" USING btree ("created_at");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE INDEX "placements_settings_recruiters_order_idx" ON "placements_settings_recruiters" USING btree ("_order");
  CREATE INDEX "placements_settings_recruiters_parent_id_idx" ON "placements_settings_recruiters" USING btree ("_parent_id");
  CREATE INDEX "placements_settings_recruiters_logo_idx" ON "placements_settings_recruiters" USING btree ("logo_id");
  CREATE INDEX "home_settings_courses_careers_order_idx" ON "home_settings_courses_careers" USING btree ("_order");
  CREATE INDEX "home_settings_courses_careers_parent_id_idx" ON "home_settings_courses_careers" USING btree ("_parent_id");
  CREATE INDEX "home_settings_courses_semesters_subjects_order_idx" ON "home_settings_courses_semesters_subjects" USING btree ("_order");
  CREATE INDEX "home_settings_courses_semesters_subjects_parent_id_idx" ON "home_settings_courses_semesters_subjects" USING btree ("_parent_id");
  CREATE INDEX "home_settings_courses_semesters_order_idx" ON "home_settings_courses_semesters" USING btree ("_order");
  CREATE INDEX "home_settings_courses_semesters_parent_id_idx" ON "home_settings_courses_semesters" USING btree ("_parent_id");
  CREATE INDEX "home_settings_courses_order_idx" ON "home_settings_courses" USING btree ("_order");
  CREATE INDEX "home_settings_courses_parent_id_idx" ON "home_settings_courses" USING btree ("_parent_id");
  CREATE INDEX "home_settings_testimonials_order_idx" ON "home_settings_testimonials" USING btree ("_order");
  CREATE INDEX "home_settings_testimonials_parent_id_idx" ON "home_settings_testimonials" USING btree ("_parent_id");
  CREATE INDEX "home_settings_why_choose_us_order_idx" ON "home_settings_why_choose_us" USING btree ("_order");
  CREATE INDEX "home_settings_why_choose_us_parent_id_idx" ON "home_settings_why_choose_us" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payments_fk" FOREIGN KEY ("payments_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_students_fk" FOREIGN KEY ("students_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_results_fk" FOREIGN KEY ("results_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_students_fk" FOREIGN KEY ("students_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_payments_id_idx" ON "payload_locked_documents_rels" USING btree ("payments_id");
  CREATE INDEX "payload_locked_documents_rels_students_id_idx" ON "payload_locked_documents_rels" USING btree ("students_id");
  CREATE INDEX "payload_locked_documents_rels_results_id_idx" ON "payload_locked_documents_rels" USING btree ("results_id");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "payload_preferences_rels_students_id_idx" ON "payload_preferences_rels" USING btree ("students_id");
  ALTER TABLE "media" DROP COLUMN "prefix";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "students_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "students" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "inquiries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "placements_settings_recruiters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_settings_courses_careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_settings_courses_semesters_subjects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_settings_courses_semesters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_settings_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_settings_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_settings_why_choose_us" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payments" CASCADE;
  DROP TABLE "students_sessions" CASCADE;
  DROP TABLE "students" CASCADE;
  DROP TABLE "results" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "placements_settings_recruiters" CASCADE;
  DROP TABLE "home_settings_courses_careers" CASCADE;
  DROP TABLE "home_settings_courses_semesters_subjects" CASCADE;
  DROP TABLE "home_settings_courses_semesters" CASCADE;
  DROP TABLE "home_settings_courses" CASCADE;
  DROP TABLE "home_settings_testimonials" CASCADE;
  DROP TABLE "home_settings_why_choose_us" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_students_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_results_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_inquiries_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_students_fk";
  
  DROP INDEX "payload_locked_documents_rels_payments_id_idx";
  DROP INDEX "payload_locked_documents_rels_students_id_idx";
  DROP INDEX "payload_locked_documents_rels_results_id_idx";
  DROP INDEX "payload_locked_documents_rels_inquiries_id_idx";
  DROP INDEX "payload_preferences_rels_students_id_idx";
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT 'media';
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "students_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "results_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "inquiries_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "students_id";
  DROP TYPE "public"."enum_payments_category";
  DROP TYPE "public"."enum_payments_status";
  DROP TYPE "public"."enum_students_course";
  DROP TYPE "public"."enum_inquiries_course";
  DROP TYPE "public"."enum_home_settings_courses_course_key";
  DROP TYPE "public"."enum_home_settings_why_choose_us_icon_type";`)
}
