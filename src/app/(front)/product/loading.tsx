export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-heading text-3xl font-medium text-foreground mb-2">
        สินค้าทั้งหมด
      </h1>
      <p className="text-muted-foreground mb-8">รายการสินค้าจากฐานข้อมูล eCommerce</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border/50 bg-card p-6 animate-pulse">
            <div className="h-6 w-2/3 rounded bg-muted mb-3" />
            <div className="h-4 w-1/2 rounded bg-muted mb-2" />
            <div className="h-4 w-1/3 rounded bg-muted mb-4" />
            <div className="h-9 w-full rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
