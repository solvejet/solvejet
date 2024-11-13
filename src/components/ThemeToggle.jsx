// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark");
    localStorage.theme = newIsDark ? "dark" : "light";
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className={`text-[#2E2E2E] dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${className}`}
      aria-label={t("toggleTheme")}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </motion.button>
  );
}
