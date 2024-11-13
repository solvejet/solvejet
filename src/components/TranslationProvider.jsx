// src/components/TranslationProvider.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function TranslationProvider({ children }) {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialTranslations = async () => {
      try {
        const userLang = localStorage.getItem("i18nextLng") || "en";
        await i18n.changeLanguage(userLang);

        // Preload other languages
        const languages = ["en", "es"];
        await Promise.all(
          languages
            .filter((lang) => lang !== userLang)
            .map((lang) => i18n.loadLanguages(lang))
        );
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialTranslations();
  }, [i18n]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return children;
}

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
