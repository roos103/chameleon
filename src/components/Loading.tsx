export function Loading() {
  return (
    <div className="grid place-items-center py-24 text-center">
      <div className="animate-bounce text-6xl">🦎</div>
      <p className="mt-2 font-display text-muted">Loading…</p>
    </div>
  );
}

export function LoadError() {
  return (
    <div className="card mx-auto mt-10 max-w-md text-center">
      <p className="text-4xl">😵‍💫</p>
      <h1 className="mt-2 font-display text-xl font-bold">We couldn&apos;t load your profile</h1>
      <p className="mt-1 text-muted">Check your internet connection and refresh the page.</p>
    </div>
  );
}
