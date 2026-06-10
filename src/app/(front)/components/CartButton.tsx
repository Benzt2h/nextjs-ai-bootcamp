"use client"

import { Button } from "@/components/ui/button";
import type { ProductCardItem } from "@/types/product";
import { useCartStore } from "@/lib/cart-store";
import { RiArrowRightLine } from "@remixicon/react";

type Props = {
  product: ProductCardItem;
};

export default function CartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);   

  const handleAddItem = () => {
     addItem({
        productId: String(product.id),
        name: product.name,
        price: product.price,
        qty: 1
     });   
  }

  return (
    <>
        <Button className="mt-6" onClick={handleAddItem}>
            หยิบใส่ตะกร้า <RiArrowRightLine />
        </Button> 
    </>
  );
}
