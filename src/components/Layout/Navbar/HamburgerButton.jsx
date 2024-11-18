// src/components/Layout/Navbar/HamburgerButton.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex items-center justify-center focus:outline-none 
        focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-lg
        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-expanded={isOpen}
      aria-label="Toggle Menu"
    >
      <span className="sr-only">Toggle Menu</span>
      <div className="w-6 h-6 relative">
        <motion.span
          initial={false}
          animate={{
            top: isOpen ? "50%" : "25%",
            transform: isOpen
              ? "translateY(-50%) rotate(45deg)"
              : "translateY(0) rotate(0)",
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full"
        />
        <motion.span
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            transform: `translateX(${isOpen ? "100%" : "0"})`,
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 left-0 w-6 h-0.5 -translate-y-1/2 
            bg-gray-900 dark:bg-white rounded-full"
        />
        <motion.span
          initial={false}
          animate={{
            bottom: isOpen ? "50%" : "25%",
            transform: isOpen
              ? "translateY(50%) rotate(-45deg)"
              : "translateY(0) rotate(0)",
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full"
        />
      </div>
    </button>
  );
};

HamburgerButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HamburgerButton;
