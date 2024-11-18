import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";
import ThemeToggle from "../../ThemeToggle";
import LanguageSelector from "../../LanguageSelector";
import { useTranslation } from "react-i18next";

function SocialLink({ href, icon: Icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 
        dark:hover:text-primary-400 transition-colors"
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
}

export default function TopBar() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-sm relative z-[60]">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-[1720px] mx-auto px-4 lg:px-24"
      >
        <div className="flex items-center justify-between h-10">
          {/* Contact Info */}
          <div className="hidden sm:flex items-center space-x-4 lg:space-x-16">
            <a
              href="mailto:contact@solvejet.net"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 
                hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden lg:inline">contact@solvejet.net</span>
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 
                hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">+1 (234) 567-890</span>
            </a>
          </div>

          {/* Mobile Contact Icons */}
          <div className="flex sm:hidden items-center space-x-4">
            <a
              href="mailto:contact@solvejet.net"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 
                dark:hover:text-primary-400 transition-colors"
              aria-label="Email us"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+1234567890"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 
                dark:hover:text-primary-400 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links & Controls */}
          <div className="flex items-center">
            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
              <SocialLink
                href="https://linkedin.com/company/solvejet"
                icon={Linkedin}
                label="LinkedIn"
              />
              <SocialLink
                href="https://twitter.com/solvejet"
                icon={Twitter}
                label="Twitter"
              />
            </div>

            {/* Controls */}
            <div
              className="flex items-center space-x-4 lg:space-x-10 pl-4 lg:pl-10 
              border-l border-gray-200 dark:border-gray-700"
            >
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
