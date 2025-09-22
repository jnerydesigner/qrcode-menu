/*
  Warnings:

  - Added the required column `name` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ingredients" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
