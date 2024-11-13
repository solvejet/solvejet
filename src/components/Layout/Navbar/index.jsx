import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import NavItem from "./NavItem";
import MobileMenu from "../MobileMenu/index";
import CapabilitiesMenu from "./MegaMenus/CapabilitiesMenu";
import IndustriesMenu from "./MegaMenus/IndustriesMenu";
import TechnologiesMenu from "./MegaMenus/TechnologiesMenu";
import CompanyMenu from "./MegaMenus/CompanyMenu";
import ChatNowButton from "./ChatNowButton";
import { useTranslation } from "react-i18next";

const navItems = [
  {
    key: "capabilities",
    component: CapabilitiesMenu,
  },
  {
    key: "industries",
    component: IndustriesMenu,
  },
  {
    key: "technologies",
    component: TechnologiesMenu,
  },
  {
    key: "company",
    component: CompanyMenu,
  },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation("navigation");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isClickOutside(event)) {
        setActiveMenu(null);
        setIsMobileMenuOpen(false);
      }
    };

    const isClickOutside = (event) => {
      const isNavbarClick = event.target.closest(".navbar-container");
      const isMegaMenuClick = event.target.closest(".mega-menu-container");
      const isMobileMenuClick = event.target.closest(".mobile-menu-container");

      return !isNavbarClick && !isMegaMenuClick && !isMobileMenuClick;
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle menu toggle
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close any open mega menus when mobile menu is opened
    if (!isMobileMenuOpen) {
      setActiveMenu(null);
    }
  };

  // Handle mobile link click
  const handleMobileLinkClick = (path) => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <>
      <nav
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-lg shadow-lg" : ""
        }`}
      >
        <div
          className={`navbar-container bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
            border-b border-gray-200 dark:border-gray-800 transition-all duration-300 
            ${isScrolled ? "py-2" : "py-4"}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Logo />

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-stretch lg:space-x-2">
                {navItems.map((item) => (
                  <NavItem
                    key={item.key}
                    navigationKey={item.key}
                    active={activeMenu === item.key}
                    onHover={() => setActiveMenu(item.key)}
                    onLeave={() => setActiveMenu(null)}
                    megaMenu={<item.component />}
                  />
                ))}
                <div className="flex items-center pl-4">
                  <ChatNowButton />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 
                  dark:text-gray-300 dark:hover:text-white focus:outline-none"
                aria-label={
                  isMobileMenuOpen
                    ? t("common.navigation.close")
                    : t("common.navigation.menu")
                }
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Integration */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          items={navItems}
          onLinkClick={handleMobileLinkClick}
          className="lg:hidden mobile-menu-container"
        />
      </nav>

      {/* Semi-transparent overlay for mega menus on desktop */}
      <AnimatePresence>
        {activeMenu && !isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 hidden lg:block"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Semi-transparent overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
