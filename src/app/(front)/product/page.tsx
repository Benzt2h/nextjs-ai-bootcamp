import FeaturesProduct from "@/components/features-product";
import { getProducts } from "@/services/product-service";
import type { Metadata } from "next";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด",
  description: "รายการสินค้าจากฐานข้อมูล eCommerce",
};

export default async function ProductPage() {
  await connection();
  const products = await getProducts();

  return (
    <main>
      <FeaturesProduct products={products} />
    </main>
  );
}
