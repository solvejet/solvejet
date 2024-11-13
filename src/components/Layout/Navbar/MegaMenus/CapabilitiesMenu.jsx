// src/components/Layout/Navbar/MegaMenus/CapabilitiesMenu.jsx
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Code,
  Users,
  Brain,
  Cloud,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MegaMenuBackground from "./MegaMenuBackground";

const serviceIcons = {
  webDevelopment: Monitor,
  mobileDevelopment: Smartphone,
  customSoftware: Code,
  staffAugmentation: Users,
  aiDevelopment: Brain,
  cloudServices: Cloud,
};

export default function CapabilitiesMenu() {
  const { t } = useTranslation("navigation");
  const services = Object.keys(serviceIcons);

  const getFeaturedItems = () => {
    try {
      return t("capabilities.featured.items", { returnObjects: true }) || [];
    } catch (error) {
      console.error("Error getting featured items:", error);
      return [];
    }
  };

  const getServiceHighlights = (serviceKey) => {
    try {
      return (
        t(`capabilities.services.${serviceKey}.highlights`, {
          returnObjects: true,
        }) || []
      );
    } catch (error) {
      console.error(`Error getting highlights for ${serviceKey}:`, error);
      return [];
    }
  };

  return (
    <MegaMenuBackground>
      <div className="max-w-7xl mx-auto py-6 px-8">
        <div className="flex gap-8">
          {/* Main Services Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4">
              {services.map((serviceKey, idx) => {
                const Icon = serviceIcons[serviceKey];
                const highlights = getServiceHighlights(serviceKey);

                return (
                  <motion.div
                    key={serviceKey}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group h-full"
                  >
                    <Link
                      to={`/services/${serviceKey}`}
                      className="flex flex-col h-full p-4 rounded-lg border border-transparent 
                      bg-gray-50/50 dark:bg-gray-800/50 transition-all duration-200 
                      hover:bg-primary-50/50 dark:hover:bg-primary-900/20
                      hover:border-primary-200 dark:hover:border-primary-800
                      hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <div className="flex items-start space-x-4 h-full">
                        <div className="flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="flex flex-col flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                            {t(`capabilities.services.${serviceKey}.title`)}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {t(
                              `capabilities.services.${serviceKey}.description`
                            )}
                          </p>
                          <ul className="space-y-1">
                            {Array.isArray(highlights) &&
                              highlights.map((highlight, i) => (
                                <li
                                  key={i}
                                  className="flex items-center text-xs text-gray-600 dark:text-gray-300"
                                >
                                  <ChevronRight className="w-3 h-3 mr-1 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Featured Section */}
          <div className="w-72 border-l border-gray-200 dark:border-gray-700 pl-8">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-4">
              {t("capabilities.featured.title")}
            </h4>
            <div className="space-y-4">
              {getFeaturedItems().map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="group"
                >
                  <Link
                    to="/portfolio"
                    className="flex items-start space-x-3 group p-2 rounded-lg 
                    hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <img
                      src={`/api/placeholder/120/80`}
                      alt={project.title}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <div>
                      <h5 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                        {project.title}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}

              <Link
                to="/portfolio"
                className="group flex items-center space-x-2 text-sm text-primary-600 
                dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 
                transition-colors mt-6"
              >
                <span>{t("capabilities.featured.viewAll")}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MegaMenuBackground>
  );
}
