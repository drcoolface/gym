-- CreateEnum
CREATE TYPE "roles" AS ENUM ('USER', 'CASHIER', 'ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "subscriptionstatus" AS ENUM ('VALID', 'EXPIRED');

-- CreateTable
CREATE TABLE "membership_plans" (
    "p_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "rate" DECIMAL(10,2) NOT NULL,
    CONSTRAINT "membership_plans_pkey" PRIMARY KEY ("p_id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "sub_id" SERIAL NOT NULL,
    "u_id" INTEGER,
    "p_id" INTEGER,
    "start_date" DATE NOT NULL,
    "validity_days" INTEGER NOT NULL,
    "end_date" DATE NOT NULL,
    "status" "subscriptionstatus" NOT NULL DEFAULT 'EXPIRED',

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("sub_id")
);

-- CreateTable
CREATE TABLE "users" (
    "u_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "role" "roles" DEFAULT 'USER',
    "sub_id" INTEGER,
    "password" TEXT NOT NULL,
    "user_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("u_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_p_id_fkey" FOREIGN KEY ("p_id") REFERENCES "membership_plans"("p_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
