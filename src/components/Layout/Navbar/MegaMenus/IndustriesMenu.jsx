import { motion } from "framer-motion";
import {
  ShoppingCart,
  Building2,
  Heart,
  Truck,
  GraduationCap,
  Landmark,
  Factory,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MegaMenuBackground from "./MegaMenuBackground";

const industryIcons = {
  ecommerce: ShoppingCart,
  healthcare: Heart,
  finance: Landmark,
  education: GraduationCap,
  logistics: Truck,
  manufacturing: Factory,
};

export default function IndustriesMenu() {
  const { t } = useTranslation("navigation");
  const industries = Object.keys(industryIcons);

  const getCaseStudies = () => {
    try {
      return t("industries.caseStudies.items", { returnObjects: true }) || [];
    } catch (error) {
      console.error("Error getting case studies:", error);
      return [];
    }
  };

  const getIndustryHighlights = (industryKey) => {
    try {
      return (
        t(`industries.sections.${industryKey}.highlights`, {
          returnObjects: true,
        }) || []
      );
    } catch (error) {
      console.error(`Error getting highlights for ${industryKey}:`, error);
      return [];
    }
  };

  return (
    <MegaMenuBackground>
      <div
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 
      shadow-lg backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80"
      >
        <div className="relative">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent 
          dark:from-primary-900/20 dark:to-transparent opacity-50"
          />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />

          <div className="relative max-w-7xl mx-auto py-6 px-8">
            <div className="flex gap-8">
              {/* Main Industries Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-4">
                  {industries.map((industryKey, idx) => {
                    const Icon = industryIcons[industryKey];
                    const highlights = getIndustryHighlights(industryKey);

                    return (
                      <motion.div
                        key={industryKey}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group h-full"
                      >
                        <Link
                          to={`/industries/${industryKey}`}
                          className="flex flex-col h-full p-4 rounded-lg border border-transparent 
                          bg-white dark:bg-gray-800 shadow-sm transition-all duration-200 
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
                                {t(`industries.sections.${industryKey}.title`)}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {t(
                                  `industries.sections.${industryKey}.description`
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

              {/* Case Studies Section */}
              <div className="w-72 border-l border-gray-200/50 dark:border-gray-700/50 pl-8">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-4">
                  {t("industries.caseStudies.title")}
                </h4>
                <div className="space-y-4">
                  {getCaseStudies().map((study, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="group"
                    >
                      <Link
                        to="/case-studies"
                        className="flex items-start space-x-3 group p-2 rounded-lg 
                        hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <img
                          src={`/api/placeholder/120/80`}
                          alt={study.title}
                          className="w-16 h-12 rounded object-cover"
                        />
                        <div>
                          <h5 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                            {study.title}
                          </h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {study.description}
                          </p>
                          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                            {study.stat}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  <Link
                    to="/case-studies"
                    className="group flex items-center space-x-2 text-sm text-primary-600 
                    dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 
                    transition-colors mt-6"
                  >
                    <span>{t("industries.caseStudies.viewAll")}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MegaMenuBackground>
  );
}
