// src/components/Layout/MobileMenu/index.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ChevronRight, ArrowLeft, X } from "lucide-react";

export default function MobileMenu({ isOpen, onClose, items }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const { t } = useTranslation();

  // Reset state when location changes
  useEffect(() => {
    onClose();
    setActiveSubmenu(null);
  }, [location.pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Main Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-[280px] max-w-[85vw] bg-white 
              dark:bg-gray-900 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-end">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg
                  text-gray-500 dark:text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-2">
                {items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSubmenu(item.key)}
                    className="w-full flex items-center justify-between p-3 rounded-lg
                      hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-gray-900 dark:text-white font-medium">
                      {item.title}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Submenu */}
          <AnimatePresence>
            {activeSubmenu && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-full bg-white dark:bg-gray-900 z-50"
              >
                {/* Submenu Header */}
                <div
                  className="p-4 border-b border-gray-200 dark:border-gray-800 
                  flex items-center justify-between"
                >
                  <button
                    onClick={() => setActiveSubmenu(null)}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">
                      {items.find((item) => item.key === activeSubmenu)?.title}
                    </span>
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Submenu Content */}
                <div className="overflow-y-auto h-[calc(100%-4rem)] p-4">
                  {items
                    .find((item) => item.key === activeSubmenu)
                    ?.component()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
      path: PropTypes.string,
    })
  ).isRequired,
};
