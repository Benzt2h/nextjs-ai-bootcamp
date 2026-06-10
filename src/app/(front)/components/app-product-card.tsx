'use client'

type Props = {
  name: string;
  price: number;
  stock?: number;
  onAddToCart: (name: string) => void;
}

export default function AppProductCard({ name, price, stock = 0, onAddToCart }: Props) {
  return (
    <div className="w-60 border border-primary p-6 bg-background">
      <h2 className="font-heading font-bold text-lg">{name}</h2>
      <p className="text-muted-foreground">ราคา: {price} บาท</p>
      {
        stock > 0 && (
          <div className="mt-3">
            <p>คงเหลือ: {stock}</p>
            <button className="mt-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase tracking-[0.02em] hover:bg-primary/90 transition-colors" onClick={ () => onAddToCart(name) }>เพิ่มลงตะกร้า</button>
          </div>
        )
      }
      
    </div>
  );
}