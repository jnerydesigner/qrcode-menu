/*
  Warnings:

  - The primary key for the `products_ingredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingredientId` on the `products_ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `products_ingredients` table. All the data in the column will be lost.
  - Added the required column `ingredient_id` to the `products_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `products_ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."products_ingredients" DROP CONSTRAINT "products_ingredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products_ingredients" DROP CONSTRAINT "products_ingredients_productId_fkey";

-- AlterTable
ALTER TABLE "public"."products_ingredients" DROP CONSTRAINT "products_ingredients_pkey",
DROP COLUMN "ingredientId",
DROP COLUMN "productId",
ADD COLUMN     "ingredient_id" UUID NOT NULL,
ADD COLUMN     "product_id" UUID NOT NULL,
ADD CONSTRAINT "products_ingredients_pkey" PRIMARY KEY ("product_id", "ingredient_id");

-- AddForeignKey
ALTER TABLE "public"."products_ingredients" ADD CONSTRAINT "products_ingredients_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_ingredients" ADD CONSTRAINT "products_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
