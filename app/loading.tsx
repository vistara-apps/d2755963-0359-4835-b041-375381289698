export default function Loading() {
  return (
    <div className="container py-6">
      <div className="animate-pulse space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
        </div>
        
        <div className="card p-6 space-y-4">
          <div className="h-6 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
        
        <div className="card p-6 space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}
