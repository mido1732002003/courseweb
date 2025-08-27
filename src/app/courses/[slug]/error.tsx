"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-primary px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  )
}
