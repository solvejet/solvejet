// src/components/LanguageSelector/index.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function LanguageSelector({ className = "" }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

  const handleLanguageChange = async (langCode) => {
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem("i18nextLng", langCode);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1.5 text-[#2E2E2E] dark:text-gray-200 
          hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center space-x-1.5">
          <span>{currentLanguage.flag}</span>
          <span>{currentLanguage.code.toUpperCase()}</span>
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 
                bg-white dark:bg-gray-800 border border-gray-200 
                dark:border-gray-700 py-1"
            >
              {LANGUAGES.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex items-center justify-between w-full px-4 py-2 
                    text-xs text-[#2E2E2E] dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <span className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {lang.label}
                    </span>
                  </span>
                  {i18n.language === lang.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
