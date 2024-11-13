// src/components/Layout/Navbar/MobileMenuButton.jsx
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function MobileMenuButton({ onClick }) {
  const { t } = useTranslation("navigation");

  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 
        rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700
        dark:hover:text-gray-200 transition-colors"
      aria-label={t("common.navigation.menu")}
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
