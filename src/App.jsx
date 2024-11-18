import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import TranslationProvider from "./components/TranslationProvider";
import DefaultSEO from "./components/SEO/DefaultSEO";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import "./i18n";

// Create router with all future flags
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      errorElement: <ErrorFallback />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: ":locale",
          children: [
            {
              index: true,
              element: <Home />,
            },
            // Add other localized routes here
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <TranslationProvider>
          <DefaultSEO />
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
        </TranslationProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
