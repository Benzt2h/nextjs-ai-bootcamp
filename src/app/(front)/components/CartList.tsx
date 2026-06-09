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
    return <div className="text-center mt-20 text-muted-foreground text-lg">ตะกร้าสินค้าว่างเปล่า...</div>
  }

  return (
    <div className="mx-auto max-w-4xl mt-20 px-6">
      <h1 className="font-heading font-bold text-[28px] leading-[1.25] mb-6">ตะกร้าสินค้า</h1>
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>รหัสสินค้า</TableHead>
                <TableHead>ชื่อสินค้า</TableHead>
                <TableHead>ราคา</TableHead>
                <TableHead>จำนวน</TableHead>
                <TableHead>รวม</TableHead>
                <TableHead>เครื่องมือ</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                items.map((i) => (
                    <TableRow key={i.productId}>
                        <TableCell>{i.productId}</TableCell>
                        <TableCell>{i.name}</TableCell>
                        <TableCell>{i.price}</TableCell>
                        <TableCell>{i.qty}</TableCell>
                        <TableCell>{(i.price * i.qty).toFixed(2)}</TableCell>
                        <TableCell>
                            <Button variant="destructive" size="sm" onClick={() => { removeItem(i.productId); } } >
                                <Trash className="size-4" />
                            </Button>    
                        </TableCell>  
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>

      <div className="text-right mt-8">
          <div className="font-heading font-bold text-2xl">
               รวมทั้งหมด: {totalPrice.toFixed(2)}   
          </div>  
          <div className="mt-6 flex justify-end gap-4">
            <Button variant="secondary" onClick={() => { clearCart(); } }>ลบสินค้าทั้งหมด</Button> 
            <Button onClick={() => { 
                clearCart();
                router.replace('/product');
             } }>ยืนยันการสั่งซื้อ</Button>
          </div>
      </div>      

    </div>
  );
}