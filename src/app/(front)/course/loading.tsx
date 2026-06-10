export default function CourseLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-heading text-3xl font-medium text-foreground mb-2">
        หลักสูตรทั้งหมด
      </h1>
      <p className="text-muted-foreground mb-8">รายการคอร์สเรียนทั้งหมด</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border/50 bg-card p-6 animate-pulse">
            <div className="h-40 w-full rounded-md bg-muted mb-4" />
            <div className="h-5 w-3/4 rounded bg-muted mb-2" />
            <div className="h-4 w-full rounded bg-muted mb-1" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
