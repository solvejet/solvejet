import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NavItem({
  navigationKey,
  active = false,
  onHover = () => {},
  onLeave = () => {},
  megaMenu,
  href,
}) {
  const { t } = useTranslation();

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Navigation Button */}
      <Link to={href}>
        <motion.button
          className="nav-item group flex items-center space-x-2 h-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className="text-gray-900 dark:text-gray-100 font-medium text-sm
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
      </Link>

      {/* Mega Menu Container */}
      <AnimatePresence>
        {active && (
          <div className="absolute top-full left-0 right-0 z-40">
            <div className="h-2" /> {/* Spacer to prevent hover gap */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 z-40"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              {megaMenu}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

NavItem.propTypes = {
  navigationKey: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
  megaMenu: PropTypes.node,
  href: PropTypes.string.isRequired,
};
