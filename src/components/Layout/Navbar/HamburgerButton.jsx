// src/components/Layout/MobileMenu/HamburgerButton.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex items-center justify-center focus:outline-none 
        focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-lg
        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-50"
      aria-expanded={isOpen}
      aria-label="Toggle Menu"
    >
      <div className="w-6 h-6 relative flex items-center justify-center">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -8,
          }}
          transition={{ duration: 0.2 }}
          className="absolute w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? 20 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 8,
          }}
          transition={{ duration: 0.2 }}
          className="absolute w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full"
        />
      </div>
    </button>
  );
}

HamburgerButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
