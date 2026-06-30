export default function Loading() {
  return (
    <div className="container-tight py-20">
      <div className="space-y-6 max-w-3xl">
        <div className="h-3 w-24 rounded skeleton-shimmer" />
        <div className="h-14 w-3/4 rounded skeleton-shimmer" />
        <div className="h-3 w-1/2 rounded skeleton-shimmer" />
      </div>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[4/5] rounded-sm skeleton-shimmer" />
            <div className="h-3 w-3/4 rounded skeleton-shimmer" />
            <div className="h-3 w-1/4 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
