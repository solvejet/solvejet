// src/components/ErrorFallback.jsx
export default function ErrorFallback({ error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-red-900">
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Something went wrong!
        </h2>
        <pre className="mt-4 text-sm">{error.message}</pre>
      </div>
    </div>
  );
}
