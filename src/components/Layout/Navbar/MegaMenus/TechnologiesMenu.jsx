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

// Default technologies data as fallback
const DEFAULT_TECHNOLOGIES = {
  frontend: {
    title: "Frontend",
    technologies: {
      react: "React",
      vuejs: "Vue.js",
      angular: "Angular",
      nextjs: "Next.js",
      typescript: "TypeScript",
      tailwind: "Tailwind CSS",
    },
  },
  backend: {
    title: "Backend",
    technologies: {
      nodejs: "Node.js",
      python: "Python",
      java: "Java",
      golang: "Go",
      dotnet: ".NET",
      php: "PHP",
    },
  },
  mobile: {
    title: "Mobile",
    technologies: {
      reactnative: "React Native",
      flutter: "Flutter",
      swift: "iOS/Swift",
      kotlin: "Android/Kotlin",
      xamarin: "Xamarin",
      ionic: "Ionic",
    },
  },
  database: {
    title: "Databases",
    technologies: {
      postgresql: "PostgreSQL",
      mongodb: "MongoDB",
      mysql: "MySQL",
      redis: "Redis",
      elasticsearch: "Elasticsearch",
      cassandra: "Cassandra",
    },
  },
  cloud: {
    title: "Cloud & DevOps",
    technologies: {
      aws: "AWS",
      azure: "Azure",
      gcp: "Google Cloud",
      kubernetes: "Kubernetes",
      docker: "Docker",
      terraform: "Terraform",
    },
  },
};

export default function TechnologiesMenu() {
  const { t, i18n } = useTranslation("technologies");
  const categories = Object.keys(categoryIcons);

  // Get technologies with fallback
  const getTechnologies = (categoryKey) => {
    try {
      const technologies = t(
        `technologies.categories.${categoryKey}.technologies`,
        {
          returnObjects: true,
        }
      );

      // Check if we got a valid object back
      if (
        technologies &&
        typeof technologies === "object" &&
        !Array.isArray(technologies)
      ) {
        return Object.entries(technologies);
      }

      // Fallback to default data if translation fails or returns invalid data
      return Object.entries(DEFAULT_TECHNOLOGIES[categoryKey].technologies);
    } catch (error) {
      console.warn(`Using fallback data for ${categoryKey}:`, error);
      return Object.entries(DEFAULT_TECHNOLOGIES[categoryKey].technologies);
    }
  };

  // Get category title with fallback
  const getCategoryTitle = (categoryKey) => {
    try {
      const title = t(`technologies.categories.${categoryKey}.title`);
      return title !== `technologies.categories.${categoryKey}.title`
        ? title
        : DEFAULT_TECHNOLOGIES[categoryKey].title;
    } catch (error) {
      return DEFAULT_TECHNOLOGIES[categoryKey].title;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-[1720px] mx-auto px-24 py-6">
        <div className="grid grid-cols-5 gap-6">
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
                <div className="flex items-center space-x-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/50">
                    <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    {getCategoryTitle(categoryKey)}
                  </h3>
                </div>

                {/* Technologies List */}
                <div className="space-y-1">
                  {technologies.map(([key, name], techIdx) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + techIdx * 0.05 }}
                    >
                      <Link
                        to={`/${i18n.language}/technologies/${categoryKey}/${key}`}
                        className="group block"
                      >
                        <div
                          className="relative overflow-hidden rounded-lg py-2 px-3
                          bg-white dark:bg-gray-800 hover:bg-primary-50 
                          dark:hover:bg-primary-900/20 border border-gray-100 
                          dark:border-gray-700/50 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <h4
                              className="font-medium text-gray-600 dark:text-gray-300 
                              group-hover:text-primary-600 dark:group-hover:text-primary-400 
                              transition-colors text-sm"
                            >
                              {name}
                            </h4>
                            <ArrowRight
                              className="w-4 h-4 text-primary-500 dark:text-primary-400 
                              opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
                              transition-all duration-300"
                            />
                          </div>
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
          className="mt-6 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 
            dark:border-gray-700/50 flex items-center justify-between shadow-sm"
        >
          <div className="text-gray-900 dark:text-white">
            <h4 className="font-medium">
              {t("technologies.cta.title", "Need a custom technology stack?")}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t(
                "technologies.cta.description",
                "Let's discuss your project requirements"
              )}
            </p>
          </div>
          <Link
            to={`/${i18n.language}/contact`}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white 
              rounded-full transition-colors shadow-lg shadow-primary-600/20 
              hover:shadow-primary-600/40"
          >
            {t("technologies.cta.button", "Contact Our Experts")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
