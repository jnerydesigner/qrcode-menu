/*
  Warnings:

  - You are about to drop the `ProductIngredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductIngredient" DROP CONSTRAINT "ProductIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductIngredient" DROP CONSTRAINT "ProductIngredient_productId_fkey";

-- DropTable
DROP TABLE "public"."ProductIngredient";

-- CreateTable
CREATE TABLE "public"."products_ingredients" (
    "productId" UUID NOT NULL,
    "ingredientId" UUID NOT NULL,

    CONSTRAINT "products_ingredients_pkey" PRIMARY KEY ("productId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "public"."products_ingredients" ADD CONSTRAINT "products_ingredients_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products_ingredients" ADD CONSTRAINT "products_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "public"."ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
