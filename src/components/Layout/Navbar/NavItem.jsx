import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function NavItem({
  navigationKey,
  active = false,
  onHover = () => {},
  onLeave = () => {},
  megaMenu,
}) {
  const { t } = useTranslation("navigation");

  return (
    <div
      className="relative h-20 flex items-center"
      onMouseEnter={onHover}
      onMouseLeave={(e) => {
        const toElement = e.relatedTarget;
        const isToMegaMenu = toElement?.closest(".mega-menu-container");
        const isToNavItem = toElement?.closest(".nav-item");

        if (!isToMegaMenu && !isToNavItem) {
          onLeave();
        }
      }}
    >
      {/* Navigation Button */}
      <motion.button
        className="nav-item group flex items-center space-x-1.5 px-3 py-2 h-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span
          className="text-gray-900 dark:text-gray-100 font-medium 
          group-hover:text-primary-600 dark:group-hover:text-primary-400 
          transition-colors"
        >
          {t(`${navigationKey}.title`)}
        </span>
        <motion.div
          animate={{ rotate: active ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className="w-4 h-4 text-gray-400 group-hover:text-primary-600 
            dark:text-gray-500 dark:group-hover:text-primary-400"
          />
        </motion.div>
      </motion.button>

      {/* Mega Menu */}
      <AnimatePresence>
        {active && (
          <>
            {/* Safe hover area */}
            <div
              className="absolute h-4 -bottom-4 left-0 right-0 z-50 mega-menu-margin"
              onMouseEnter={onHover}
            />

            {/* Mega Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed left-0 right-0 mega-menu-container shadow-xl"
              style={{ top: "5rem" }}
              onMouseLeave={(e) => {
                const toElement = e.relatedTarget;
                const isToNavItem = toElement?.closest(".nav-item");

                if (!isToNavItem) {
                  onLeave();
                }
              }}
              onMouseEnter={onHover}
            >
              {megaMenu}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

NavItem.propTypes = {
  navigationKey: PropTypes.oneOf([
    "capabilities",
    "industries",
    "technologies",
    "company",
  ]).isRequired,
  active: PropTypes.bool,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
  megaMenu: PropTypes.node,
};
