// src/components/ErrorFallback.jsx
import PropTypes from "prop-types";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-red-900">
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Something went wrong!
        </h2>
        {error && (
          <pre className="mt-4 text-sm text-red-500 dark:text-red-300">
            {error.message}
          </pre>
        )}
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg
              hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  resetErrorBoundary: PropTypes.func,
};
