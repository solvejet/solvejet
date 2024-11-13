// src/components/Layout/MobileMenu/index.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  X,
  ChevronRight,
  ChevronDown,
  Monitor,
  Smartphone,
  Code,
  Users,
  Brain,
  Cloud,
  Building,
  Heart,
  Truck,
  GraduationCap,
  Landmark,
  Factory,
  Layout,
  Server,
  Database,
  BookOpen,
  Medal,
  Target,
  HeartHandshake,
  BadgeDollarSign,
  Briefcase,
  MessageSquare,
} from "lucide-react";

const serviceIcons = {
  webDevelopment: Monitor,
  mobileDevelopment: Smartphone,
  customSoftware: Code,
  staffAugmentation: Users,
  aiDevelopment: Brain,
  cloudServices: Cloud,
};

const industryIcons = {
  ecommerce: Building,
  healthcare: Heart,
  finance: Landmark,
  education: GraduationCap,
  logistics: Truck,
  manufacturing: Factory,
};

const techIcons = {
  frontend: Layout,
  backend: Server,
  mobile: Smartphone,
  database: Database,
  cloud: Cloud,
};

export default function MobileMenu({ isOpen, onClose }) {
  const { t, i18n } = useTranslation("navigation");
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Reset active submenu when menu closes
  useEffect(() => {
    if (!isOpen) {
      setActiveSubmenu(null);
    }
  }, [isOpen]);

  const menuSections = [
    {
      key: "capabilities",
      items: Object.entries(serviceIcons).map(([key, Icon]) => ({
        key,
        icon: Icon,
        title: t(`capabilities.services.${key}.title`),
        description: t(`capabilities.services.${key}.description`),
      })),
    },
    {
      key: "industries",
      items: Object.entries(industryIcons).map(([key, Icon]) => ({
        key,
        icon: Icon,
        title: t(`industries.sections.${key}.title`),
        description: t(`industries.sections.${key}.description`),
      })),
    },
    {
      key: "technologies",
      items: Object.entries(techIcons).map(([key, Icon]) => ({
        key,
        icon: Icon,
        title: t(`technologies.categories.${key}.title`),
        technologies: t(`technologies.categories.${key}.technologies`, {
          returnObjects: true,
        }),
      })),
    },
    {
      key: "company",
      items: [
        {
          title: t("company.sections.about.title"),
          description: t("company.sections.about.description"),
          icon: Building,
          links: [
            {
              icon: BookOpen,
              label: t("company.sections.about.links.story"),
              path: "/about/story",
            },
            {
              icon: Medal,
              label: t("company.sections.about.links.leadership"),
              path: "/about/leadership",
            },
            {
              icon: Target,
              label: t("company.sections.about.links.mission"),
              path: "/about/mission",
            },
          ],
        },
        {
          title: t("company.sections.partnerships.types.hr.title"),
          description: t("company.sections.partnerships.types.hr.description"),
          icon: HeartHandshake,
          path: "/partnerships/hr",
        },
        {
          title: t("company.sections.partnerships.types.sales.title"),
          description: t(
            "company.sections.partnerships.types.sales.description"
          ),
          icon: BadgeDollarSign,
          path: "/partnerships/sales",
        },
        {
          title: t("company.sections.careers.title"),
          description: t("company.sections.careers.description"),
          icon: Briefcase,
          path: "/careers",
        },
      ],
    },
  ];

  const handleLinkClick = (path) => {
    onClose();
    setActiveSubmenu(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Translucent Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm 
              bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl z-50"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
              <div
                className="flex items-center justify-between p-4 border-b 
                border-gray-200 dark:border-gray-800"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("common.navigation.menu")}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg
                    text-gray-500 dark:text-gray-400 transition-colors"
                  aria-label={t("common.navigation.close")}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="h-[calc(100vh-145px)] overflow-y-auto">
              <div className="p-4 space-y-4">
                {menuSections.map((section) => (
                  <div key={section.key} className="relative">
                    {/* Section Title */}
                    <button
                      onClick={() =>
                        setActiveSubmenu(
                          activeSubmenu === section.key ? null : section.key
                        )
                      }
                      className="flex items-center justify-between w-full p-3
                        text-gray-900 dark:text-white rounded-lg
                        hover:bg-gray-100 dark:hover:bg-gray-800/50 
                        transition-colors"
                    >
                      <span className="font-medium">
                        {t(`${section.key}.title`)}
                      </span>
                      <motion.div
                        animate={{
                          rotate: activeSubmenu === section.key ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    {/* Section Content */}
                    <AnimatePresence>
                      {activeSubmenu === section.key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 px-2 space-y-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.key || item.title}
                                to={`/${i18n.language}${
                                  item.path || `/${section.key}/${item.key}`
                                }`}
                                onClick={() => handleLinkClick(item.path)}
                                className="flex items-start p-3 rounded-lg
                                  hover:bg-primary-50/50 dark:hover:bg-primary-900/20
                                  group transition-colors"
                              >
                                <item.icon
                                  className="w-5 h-5 mt-0.5 text-primary-600 
                                  dark:text-primary-400 flex-shrink-0"
                                />
                                <div className="ml-3 flex-1">
                                  <h4
                                    className="font-medium text-gray-900 
                                    dark:text-white group-hover:text-primary-600 
                                    dark:group-hover:text-primary-400 transition-colors"
                                  >
                                    {item.title}
                                  </h4>
                                  {item.description && (
                                    <p
                                      className="text-sm text-gray-600 
                                      dark:text-gray-400 mt-0.5"
                                    >
                                      {item.description}
                                    </p>
                                  )}
                                  {item.links && (
                                    <div
                                      className="mt-2 space-y-1 pl-1 border-l-2 
                                      border-primary-100 dark:border-primary-800"
                                    >
                                      {item.links.map((link, idx) => (
                                        <Link
                                          key={idx}
                                          to={`/${i18n.language}${link.path}`}
                                          onClick={() =>
                                            handleLinkClick(link.path)
                                          }
                                          className="flex items-center space-x-2 
                                            text-sm text-gray-600 dark:text-gray-400
                                            hover:text-primary-600 
                                            dark:hover:text-primary-400 py-1"
                                        >
                                          <link.icon className="w-4 h-4" />
                                          <span>{link.label}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                  {item.technologies && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      {Object.entries(item.technologies).map(
                                        ([key, name]) => (
                                          <span
                                            key={key}
                                            className="text-xs px-2 py-1 rounded-full
                                              bg-primary-50 dark:bg-primary-900/50
                                              text-primary-700 dark:text-primary-300"
                                          >
                                            {name}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                                <ChevronRight
                                  className="w-4 h-4 text-gray-400 
                                  dark:text-gray-600 group-hover:text-primary-600 
                                  dark:group-hover:text-primary-400 transition-colors 
                                  opacity-0 group-hover:opacity-100"
                                />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div
              className="sticky bottom-0 p-4 bg-white/80 dark:bg-gray-900/80 
              backdrop-blur-lg border-t border-gray-200 dark:border-gray-800"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full px-6 py-3 
                  bg-primary-600 hover:bg-primary-700 text-white rounded-xl
                  font-medium transition-colors space-x-2 shadow-lg 
                  shadow-primary-600/20 hover:shadow-primary-600/40"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t("common.buttons.chatNow")}</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
