// src/components/LanguageSelector/index.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown, Check } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang =
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
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 text-[#2E2E2E] dark:text-gray-200 
          hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs"
      >
        <span>{currentLang.flag}</span>
        <span className="uppercase font-medium">{currentLang.code}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-transparent z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-1 w-40 rounded-lg shadow-lg z-[70]
                bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                py-1 overflow-hidden"
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex items-center justify-between w-full px-4 py-2 text-xs
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <span className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span className="uppercase font-medium">{lang.code}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {lang.label}
                    </span>
                  </span>
                  {i18n.language === lang.code && (
                    <Check className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
