import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";

export type ProductCardItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  imageName: string | null;
};

type Props = {
  products: ProductCardItem[];
};

function getProductImage(product: ProductCardItem) {
  return product.imageName
    ? `/product-image/${product.imageName}`
    : "/product-image/nopic.png";
}

const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

const FeaturesProduct = ({ products }: Props) => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col px-6 py-16 sm:py-24">
      <div className="mb-16">
        <h2 className="text-center font-heading text-5xl md:text-6xl font-medium tracking-tight text-foreground">
          สินค้าทั้งหมด
        </h2>
        <p className="mt-4 text-center text-muted-foreground text-lg max-w-2xl mx-auto">
          ค้นหาสินค้าที่ตรงตามความต้องการของคุณจากคลังสินค้าขนาดใหญ่
        </p>
      </div>

      {products.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed border-border/50 px-6 py-20 text-center text-muted-foreground">
          <p className="text-base">ยังไม่มีสินค้าในฐานข้อมูล</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article className="flex flex-col rounded-lg border border-border/50 bg-card hover:shadow-lg transition-shadow overflow-hidden" key={product.id}>
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image
                  alt={product.name}
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={getProductImage(product)}
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-4 p-6">
                {/* Category & ID */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-muted-foreground">#{product.id}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {product.categoryName}
                  </span>
                </div>

                {/* Product Name */}
                <div>
                  <h3 className="font-heading font-medium text-lg line-clamp-2 text-foreground">
                    {product.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-muted-foreground min-h-10">
                  {product.description}
                </p>

                {/* Price */}
                <p className="text-2xl font-bold font-heading text-foreground pt-2">
                  {priceFormatter.format(product.price)}
                </p>

                {/* Cart Button */}
                <div className="mt-auto pt-2">
                  <CartButton product={product} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturesProduct;
