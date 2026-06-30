export default function Loading() {
  return (
    <div className="container-tight py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="aspect-[4/5] rounded-sm skeleton-shimmer" />
        <div className="space-y-4 pt-10">
          <div className="h-3 w-24 rounded skeleton-shimmer" />
          <div className="h-12 w-3/4 rounded skeleton-shimmer" />
          <div className="h-6 w-1/3 rounded skeleton-shimmer" />
          <div className="h-24 w-full rounded skeleton-shimmer mt-8" />
          <div className="h-14 w-full rounded-full skeleton-shimmer mt-8" />
        </div>
      </div>
    </div>
  );
}
