import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MonitorPlay,
  Smartphone,
  Code,
  Users,
  BrainCircuit,
  CloudCog,
  ArrowRight,
} from "lucide-react";

const serviceIcons = {
  webDevelopment: MonitorPlay,
  mobileDevelopment: Smartphone,
  customSoftware: Code,
  staffAugmentation: Users,
  aiDevelopment: BrainCircuit,
  cloudServices: CloudCog,
};

const SolutionCard = ({ serviceKey, Icon }) => {
  const { t } = useTranslation("capabilities");

  // Safely get highlights with a fallback
  const getHighlights = () => {
    try {
      return (
        t(`capabilities.services.${serviceKey}.highlights`, {
          returnObjects: true,
        }) || []
      );
    } catch (error) {
      console.warn(`Could not load highlights for ${serviceKey}`, error);
      return [];
    }
  };

  const highlights = getHighlights();

  return (
    <Link to={`/services/${serviceKey}`} className="block group">
      <div
        className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800/90 
        hover:shadow-xl transition-all duration-300 h-full border border-gray-100 
        dark:border-gray-700/50"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-500/5 
          dark:from-primary-400/10 dark:to-primary-400/5 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300"
        />

        <div className="relative p-4 h-full">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className="p-2.5 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100/50 
                dark:from-primary-900/30 dark:to-primary-800/30 
                group-hover:scale-110 transition-transform duration-300"
              >
                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                  {t(`capabilities.services.${serviceKey}.title`, serviceKey)}
                </h4>
                <ArrowRight
                  className="w-4 h-4 text-primary-500 dark:text-primary-400 
                  opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
                  transition-all duration-300"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {t(`capabilities.services.${serviceKey}.description`, "")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.isArray(highlights) &&
                  highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs
                      font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/50 
                      dark:text-primary-300 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 
                      transition-colors duration-300"
                    >
                      {highlight}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function CapabilitiesMenu() {
  const { t, i18n } = useTranslation("capabilities");

  // Safely get featured projects with a fallback
  const getFeaturedProjects = () => {
    try {
      return t("capabilities.featured.items", { returnObjects: true }) || [];
    } catch (error) {
      console.warn("Could not load featured projects", error);
      return [];
    }
  };

  const featuredProjects = getFeaturedProjects();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-[1720px] mx-auto">
        <div className="p-6">
          <div className="flex gap-8">
            {/* Main Solutions */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(serviceIcons).map(([key, Icon], idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <SolutionCard serviceKey={key} Icon={Icon} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Featured Section */}
            <div className="w-[320px] border-l border-gray-200 dark:border-gray-700 pl-6">
              <h3
                className="text-xs uppercase tracking-wider font-medium text-gray-500 
                dark:text-gray-400 mb-3"
              >
                {t("capabilities.featured.title", "Featured Projects")}
              </h3>
              <div className="space-y-2">
                {Array.isArray(featuredProjects) &&
                  featuredProjects.map((project, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        to={`/${i18n.language}/projects/${
                          project.title?.toLowerCase().replace(/\s+/g, "-") ||
                          "project"
                        }`}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-white 
                        dark:bg-gray-800 hover:shadow-md group transition-all duration-300"
                      >
                        <div className="flex items-start space-x-3 min-w-0">
                          <img
                            src="/api/placeholder/120/80"
                            alt={project.title || "Project"}
                            className="w-20 h-16 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <div
                              className="text-sm font-medium text-gray-900 dark:text-white
                            group-hover:text-primary-600 dark:group-hover:text-primary-400
                            transition-colors truncate"
                            >
                              {project.title || "Project Title"}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {project.description || "Project Description"}
                            </p>
                            <span
                              className="inline-block text-xs font-medium text-primary-600 
                            dark:text-primary-400 mt-1"
                            >
                              {project.stats || "Project Stats"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                <Link
                  to={`/${i18n.language}/projects`}
                  className="inline-flex items-center space-x-2 text-sm font-medium
                    text-primary-600 dark:text-primary-400 hover:text-primary-700
                    dark:hover:text-primary-300 transition-colors mt-2 p-2 group"
                >
                  <span>
                    {t("capabilities.featured.viewAll", "View All Projects")}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
