"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/lib/cart-store";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartList() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="text-center mt-32 px-6">
        <p className="text-muted-foreground text-lg">ตะกร้าสินค้าว่างเปล่า...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl mt-16 px-6 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-8">ตะกร้าสินค้า</h1>
      
      <div className="overflow-x-auto rounded-lg border border-border/50">
        <Table>
          <TableHeader>
            <TableRow className="bg-card/50 border-border/50">
              <TableHead className="font-medium">รหัสสินค้า</TableHead>
              <TableHead className="font-medium">ชื่อสินค้า</TableHead>
              <TableHead className="font-medium">ราคา</TableHead>
              <TableHead className="font-medium">จำนวน</TableHead>
              <TableHead className="font-medium">รวม</TableHead>
              <TableHead className="font-medium">เครื่องมือ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.productId} className="border-border/30 hover:bg-card/30 transition-colors">
                <TableCell className="font-mono text-sm">{i.productId}</TableCell>
                <TableCell className="font-medium">{i.name}</TableCell>
                <TableCell>{i.price.toFixed(2)} ฿</TableCell>
                <TableCell className="text-center">{i.qty}</TableCell>
                <TableCell className="font-semibold">{(i.price * i.qty).toFixed(2)} ฿</TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeItem(i.productId)}
                  >
                    <Trash className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Total & Actions */}
      <div className="mt-12 flex flex-col items-end gap-6">
        <div className="text-right">
          <p className="text-muted-foreground text-sm mb-2">รวมทั้งหมด</p>
          <p className="font-heading text-4xl font-bold">
            {totalPrice.toFixed(2)} ฿
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => clearCart()}
          >
            ลบสินค้าทั้งหมด
          </Button>
          <Button 
            onClick={() => {
              clearCart();
              router.replace('/product');
            }}
          >
            ยืนยันการสั่งซื้อ
          </Button>
        </div>
      </div>
    </div>
  );
}