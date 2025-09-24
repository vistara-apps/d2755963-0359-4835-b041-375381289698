'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-6">
      <div className="card p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-destructive">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="btn btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
