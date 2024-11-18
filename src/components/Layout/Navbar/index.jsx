import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";
import Logo from "./Logo";
import NavItem from "./NavItem";
import MobileMenu from "../MobileMenu";
import CapabilitiesMenu from "./MegaMenus/CapabilitiesMenu";
import IndustriesMenu from "./MegaMenus/IndustriesMenu";
import TechnologiesMenu from "./MegaMenus/TechnologiesMenu";
import CompanyMenu from "./MegaMenus/CompanyMenu";
import ChatNowButton from "./ChatNowButton";
import HamburgerButton from "./HamburgerButton";

// Navbar-specific error fallback
const NavbarErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="fixed top-0 left-0 right-0 bg-red-50 dark:bg-red-900 p-4 text-center z-50">
    <p className="text-red-600 dark:text-red-400">
      Navigation Error: {error?.message || "Something went wrong"}
    </p>
    {resetErrorBoundary && (
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 text-sm bg-red-600 text-white rounded
          hover:bg-red-700 transition-colors"
      >
        Reset
      </button>
    )}
  </div>
);

NavbarErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  resetErrorBoundary: PropTypes.func,
};

const navItems = [
  {
    key: "capabilities",
    component: CapabilitiesMenu,
    path: "/capabilities",
  },
  {
    key: "industries",
    component: IndustriesMenu,
    path: "/industries",
  },
  {
    key: "technologies",
    component: TechnologiesMenu,
    path: "/technologies",
  },
  {
    key: "company",
    component: CompanyMenu,
    path: "/company",
  },
];

function Navbar() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation(["navigation", "common"]);
  const location = useLocation();

  // Enhanced scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Route change handler
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--scrollbar-width)";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMobileMenuOpen]);

  // Calculate scrollbar width on mount
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );
  }, []);

  // Error boundary reset handler
  const handleErrorReset = useCallback(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    navigate("/");
  }, [navigate]);

  // Memoized path localization
  const getLocalizedPath = useCallback(
    (path) => `/${i18n.language}${path}`,
    [i18n.language]
  );

  // Memoized localized nav items
  const localizedNavItems = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        title: t(`navigation.${item.key}.title`),
        description: t(`navigation.${item.key}.description`),
        path: getLocalizedPath(item.path),
      })),
    [t, getLocalizedPath]
  );

  return (
    <ErrorBoundary
      FallbackComponent={NavbarErrorFallback}
      onReset={handleErrorReset}
      onError={(error, errorInfo) => {
        console.error("Navigation Error:", error);
        console.error("Error Info:", errorInfo);
      }}
    >
      <nav
        className={`fixed top-10 left-0 right-0 z-30 transition-all duration-300 
          bg-white dark:bg-gray-900 ${isScrolled ? "shadow-lg" : ""}`}
      >
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-[1720px] mx-auto px-4 lg:px-24">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Logo />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-16">
                {navItems.map((item) => (
                  <NavItem
                    key={item.key}
                    navigationKey={`navigation.${item.key}`}
                    active={activeMenu === item.key}
                    onHover={() => setActiveMenu(item.key)}
                    onLeave={() => setActiveMenu(null)}
                    megaMenu={<item.component />}
                    href={getLocalizedPath(item.path)}
                  />
                ))}

                {/* Chat Now Button */}
                <div className="pl-16 border-l border-gray-200 dark:border-gray-700">
                  <ChatNowButton>
                    {t("navigation.buttons.chatNow")}
                  </ChatNowButton>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex lg:hidden">
                <HamburgerButton
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          items={localizedNavItems}
        />

        {/* Mega Menu Container */}
        <AnimatePresence>
          {activeMenu && (
            <div className="z-30">
              {navItems.find((item) => item.key === activeMenu)?.component()}
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default Navbar;
