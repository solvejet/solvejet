// src/components/Layout/TopBar/index.jsx
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
      className="text-[#2E2E2E] dark:text-gray-200 hover:text-primary-600 
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
    <div className="bg-gray-100 dark:bg-gray-800 text-sm relative z-[60]">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex items-center justify-between h-8">
          {/* Contact Info */}
          <div className="flex items-center space-x-4">
            <a
              href="mailto:contact@solvejet.net"
              className="flex items-center space-x-2 text-[#2E2E2E] dark:text-gray-200 
                hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs"
            >
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">contact@solvejet.net</span>
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 text-[#2E2E2E] dark:text-gray-200 
                hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+1 (234) 567-890</span>
            </a>
          </div>

          {/* Social Links & Controls */}
          <div className="flex items-center relative z-[50]">
            {/* Social Links */}
            <div
              className="flex items-center space-x-3 mr-4 border-r border-gray-300 
              dark:border-gray-700 pr-4"
            >
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

            <div className="flex items-center space-x-3">
              <ThemeToggle className="scale-75" />
              <div className="border-l border-gray-300 dark:border-gray-700 pl-3">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
