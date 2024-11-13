// src/components/Layout/Navbar/MegaMenus/TechnologiesMenu.jsx
import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Smartphone,
  Database,
  Cloud,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MegaMenuBackground from "./MegaMenuBackground";

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  mobile: Smartphone,
  database: Database,
  cloud: Cloud,
};

export default function TechnologiesMenu() {
  const { t } = useTranslation("navigation");
  const categories = Object.keys(categoryIcons);

  const getTechnologies = (categoryKey) => {
    try {
      return Object.entries(
        t(`technologies.categories.${categoryKey}.technologies`, {
          returnObjects: true,
        })
      );
    } catch (error) {
      console.error(`Error getting technologies for ${categoryKey}:`, error);
      return [];
    }
  };

  return (
    <MegaMenuBackground>
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-5 gap-8">
          {categories.map((categoryKey, idx) => {
            const Icon = categoryIcons[categoryKey];
            const technologies = getTechnologies(categoryKey);

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-2 mb-4">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t(`technologies.categories.${categoryKey}.title`)}
                  </h3>
                </div>

                {/* Technologies List */}
                <div className="space-y-2">
                  {technologies.map(([key, name], techIdx) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + techIdx * 0.1 }}
                    >
                      <Link
                        to={`/technologies/${categoryKey}/${key}`}
                        className="group block"
                      >
                        <div
                          className="relative overflow-hidden rounded-lg py-2.5 px-3
                        bg-gray-50 dark:bg-gray-800/50 hover:bg-primary-50 
                        dark:hover:bg-primary-900/20 transition-colors"
                        >
                          <h4
                            className="font-medium text-gray-900 dark:text-white 
                          group-hover:text-primary-600 dark:group-hover:text-primary-400 
                          transition-colors text-sm"
                          >
                            {name}
                          </h4>

                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                              delay: idx * 0.1 + techIdx * 0.1,
                              duration: 0.5,
                            }}
                            className="absolute bottom-0 left-0 h-0.5 bg-primary-500/20"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 
          dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200/50 
          dark:border-primary-700/50 flex items-center justify-between"
        >
          <div className="text-primary-600 dark:text-primary-400">
            <h4 className="font-medium">{t("technologies.cta.title")}</h4>
            <p className="text-sm">{t("technologies.cta.description")}</p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full 
            transition-colors shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40"
          >
            {t("technologies.cta.button")}
          </Link>
        </motion.div>
      </div>
    </MegaMenuBackground>
  );
}
