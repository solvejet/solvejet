// app/admin/not-found.tsx
import Link from 'next/link'

export default function AdminNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/admin/dashboard"
        className="mt-8 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        Return to Dashboard
      </Link>
    </div>
  )
}
