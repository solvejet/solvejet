import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  ChevronRight,
  ArrowLeft,
  Building2,
  Factory,
  Layout,
  Users,
  X,
} from "lucide-react";

const MobileMenu = ({ isOpen, onClose, items }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  // Reset state when location changes
  useEffect(() => {
    onClose();
    setActiveSubmenu(null);
  }, [location.pathname, onClose]);

  // Stop propagation on menu click to prevent closing
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 
                backdrop-blur-sm z-[60]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={handleMenuClick}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white/95 
                dark:bg-gray-900/95 backdrop-blur-sm shadow-xl z-[70]"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="px-4 space-y-1">
                    {items.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setActiveSubmenu(item.key)}
                        className="flex items-center justify-between w-full p-3 
                          rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                          transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-900 dark:text-white font-medium">
                            {item.title}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </motion.div>

            {/* Submenus with higher z-index */}
            <AnimatePresence>
              {activeSubmenu && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  onClick={handleMenuClick}
                  className="fixed inset-0 z-[80] bg-white/95 dark:bg-gray-900/95 
                    backdrop-blur-sm"
                >
                  <div className="flex flex-col h-full">
                    <div
                      className="flex items-center justify-between p-4 
                      border-b border-gray-200 dark:border-gray-700"
                    >
                      <button
                        onClick={() => setActiveSubmenu(null)}
                        className="flex items-center space-x-2 text-gray-600 
                          dark:text-gray-300"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">
                          {
                            items.find((item) => item.key === activeSubmenu)
                              ?.title
                          }
                        </span>
                      </button>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 
                          rounded-lg"
                      >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                      {items
                        .find((item) => item.key === activeSubmenu)
                        ?.component()}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MobileMenu;
