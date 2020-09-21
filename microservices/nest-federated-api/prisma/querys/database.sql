DROP SCHEMA users;
CREATE SCHEMA users;

DROP TABLE IF EXISTS "users"."users";
CREATE TABLE "users"."users" (
"id" varchar   NOT NULL,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL,
"first_name" varchar(150),
"last_name" varchar(150),
"email" varchar(150) NOT NULL,
"password" varchar(150)   NOT NULL,
"phone" varchar(20),
"username" varchar(255),
"avatar" varchar(255),
"email_verified_at" timestamp(3),
PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users.email_unique" ON "users"."users"("email");

CREATE TABLE "users"."genders" (
"id" SMALLSERIAL,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL,
"name" varchar(100)   NOT NULL,
PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "users"."profiles";
CREATE TABLE "users"."profiles" (
"id" BIGSERIAL,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL,
"birthday" timestamp(3)   NOT NULL,
"gender_id" smallint NOT NULL,
"user_id" varchar,
PRIMARY KEY ("id")
);

ALTER TABLE "users"."profiles" ADD FOREIGN KEY ("user_id")REFERENCES "users"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "users"."profiles" ADD FOREIGN KEY ("gender_id")REFERENCES "users"."genders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

DROP TABLE IF EXISTS "users"."roles";
CREATE TABLE "users"."roles" (
"id" SMALLSERIAL,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL ,
"name" varchar(100)   NOT NULL ,
PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "users"."permissions";
CREATE TABLE "users"."permissions" (
"id" SMALLSERIAL,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL ,
"name" varchar(100)   NOT NULL ,
PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "users"."_roles_to_users";
CREATE TABLE "users"."_roles_to_users" (
"role_id" smallint   NOT NULL ,
"user_id" text   NOT NULL
);

CREATE UNIQUE INDEX "_roles_to_users_role_user_unique" ON "users"."_roles_to_users"("role_id", "user_id");
CREATE INDEX "_roles_to_users_user_index" ON "users"."_roles_to_users"("user_id");

ALTER TABLE "users"."_roles_to_users" ADD FOREIGN KEY ("role_id")REFERENCES "users"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "users"."_roles_to_users" ADD FOREIGN KEY ("user_id")REFERENCES "users"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE IF EXISTS "users"."_permissions_to_roles";
CREATE TABLE "users"."_permissions_to_roles" (
"permissionId" smallint   NOT NULL ,
"role_id" smallint   NOT NULL
);

CREATE UNIQUE INDEX "_permissions_to_roles_permission_role_unique" ON "users"."_permissions_to_roles"("permissionId", "role_id");
CREATE INDEX "_permissions_to_roles_role_index" ON "users"."_permissions_to_roles"("role_id");

ALTER TABLE "users"."_permissions_to_roles" ADD FOREIGN KEY ("permissionId")REFERENCES "users"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "users"."_permissions_to_roles" ADD FOREIGN KEY ("role_id")REFERENCES "users"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO users.users (id, created_at, updated_at, first_name, last_name, email, password, phone, username, avatar,
                         email_verified_at)
VALUES ('1', '2020-09-19 21:31:01.000', '2020-09-19 21:31:06.000', 'Elias', 'Ojeda', 'elias@lesqui.com', '$2b$10$JcsVnbyWt/rX/.LoigG0F.KI5uWLw7OhedVTj8E8O/0/6jTB90gYq',
        '555555555555', 'eocode', '.png', '2020-09-19 21:31:44.000');