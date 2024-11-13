// src/App.jsx
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorFallback from "./components/ErrorFallback";
import TranslationProvider from "./components/TranslationProvider";
import DefaultSEO from "./components/SEO/DefaultSEO";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import "./i18n";

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <TranslationProvider>
          <DefaultSEO />
          <Suspense fallback={<Loading />}>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                {/* Add more routes here */}
              </Routes>
            </Router>
          </Suspense>
        </TranslationProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
