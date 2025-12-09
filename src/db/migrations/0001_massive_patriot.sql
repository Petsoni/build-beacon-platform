-- MANUAL ADDITION
CREATE TYPE project_status AS ENUM (
  'NDA',
  'In Development',
  'Finished',
  'Finding ideas'
);

CREATE TABLE "developer_project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" varchar(256) NOT NULL,
	"status" project_status DEFAULT 'In Development',
	"link" text
);
--> statement-breakpoint
ALTER TABLE "developer_project" ADD CONSTRAINT "developer_project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "title_idx" ON "developer_project" USING btree ("title");