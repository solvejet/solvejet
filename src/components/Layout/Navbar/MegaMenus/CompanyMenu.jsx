// src/components/Layout/Navbar/MegaMenus/CompanyMenu.jsx
import { motion } from "framer-motion";
import {
  Building,
  Users,
  Briefcase,
  Medal,
  BookOpen,
  Target,
  ArrowRight,
  HeartHandshake,
  BadgeDollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MegaMenuBackground from "./MegaMenuBackground";

// Default data for fallbacks
const DEFAULT_COMPANY_DATA = {
  about: {
    title: "About Us",
    description: "Our journey of innovation since 2010",
    stats: [
      { label: "Years Experience", value: "13+" },
      { label: "Global Clients", value: "1000+" },
      { label: "Team Members", value: "250+" },
    ],
    links: [
      {
        icon: BookOpen,
        label: "Our Story",
        path: "/about/story",
      },
      {
        icon: Medal,
        label: "Leadership",
        path: "/about/leadership",
      },
      {
        icon: Target,
        label: "Mission & Vision",
        path: "/about/mission",
      },
    ],
  },
  partnerships: {
    hr: {
      title: "HR Partnership",
      description: "Build your dream team with our talent solutions",
    },
    sales: {
      title: "Sales Partnership",
      description: "Expand your business with our solutions",
    },
    buttons: {
      learnMore: "Learn More",
    },
  },
  careers: {
    title: "Careers",
    openings: [
      {
        role: "Senior React Developer",
        location: "Remote",
      },
      {
        role: "UI/UX Designer",
        location: "New York",
      },
    ],
    viewAll: "View All Positions",
  },
};

export default function CompanyMenu() {
  const { t, i18n } = useTranslation("company");

  // Helper function to get stats with fallback
  const getStats = () => {
    try {
      const translatedStats = t("company.sections.about.stats", {
        returnObjects: true,
      });
      if (translatedStats && typeof translatedStats === "object") {
        return [
          {
            label:
              translatedStats.experience ||
              DEFAULT_COMPANY_DATA.about.stats[0].label,
            value: "13+",
          },
          {
            label:
              translatedStats.clients ||
              DEFAULT_COMPANY_DATA.about.stats[1].label,
            value: "1000+",
          },
          {
            label:
              translatedStats.team || DEFAULT_COMPANY_DATA.about.stats[2].label,
            value: "250+",
          },
        ];
      }
      return DEFAULT_COMPANY_DATA.about.stats;
    } catch (error) {
      console.warn("Using fallback stats:", error);
      return DEFAULT_COMPANY_DATA.about.stats;
    }
  };

  // Helper function to get about links with fallback
  const getAboutLinks = () => {
    try {
      return [
        {
          icon: BookOpen,
          label: t(
            "company.sections.about.links.story",
            DEFAULT_COMPANY_DATA.about.links[0].label
          ),
          path: "/about/story",
        },
        {
          icon: Medal,
          label: t(
            "company.sections.about.links.leadership",
            DEFAULT_COMPANY_DATA.about.links[1].label
          ),
          path: "/about/leadership",
        },
        {
          icon: Target,
          label: t(
            "company.sections.about.links.mission",
            DEFAULT_COMPANY_DATA.about.links[2].label
          ),
          path: "/about/mission",
        },
      ];
    } catch (error) {
      console.warn("Using fallback about links:", error);
      return DEFAULT_COMPANY_DATA.about.links;
    }
  };

  // Helper function to get job openings with fallback
  const getJobOpenings = () => {
    try {
      return [
        {
          role: t(
            "company.sections.careers.openings.developer",
            DEFAULT_COMPANY_DATA.careers.openings[0].role
          ),
          location: t(
            "company.sections.careers.locations.remote",
            DEFAULT_COMPANY_DATA.careers.openings[0].location
          ),
        },
        {
          role: t(
            "company.sections.careers.openings.designer",
            DEFAULT_COMPANY_DATA.careers.openings[1].role
          ),
          location: t(
            "company.sections.careers.locations.newyork",
            DEFAULT_COMPANY_DATA.careers.openings[1].location
          ),
        },
      ];
    } catch (error) {
      console.warn("Using fallback job openings:", error);
      return DEFAULT_COMPANY_DATA.careers.openings;
    }
  };

  const stats = getStats();
  const aboutLinks = getAboutLinks();
  const jobOpenings = getJobOpenings();

  return (
    <MegaMenuBackground>
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="max-w-[1720px] mx-auto px-24 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5"
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 
              dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/50">
                    <Building className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t(
                        "company.sections.about.title",
                        DEFAULT_COMPANY_DATA.about.title
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t(
                        "company.sections.about.description",
                        DEFAULT_COMPANY_DATA.about.description
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {aboutLinks.map((link, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        to={`/${i18n.language}${link.path}`}
                        className="group flex items-center p-2 space-x-2 rounded-lg
                        hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                      >
                        <link.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span
                          className="text-sm text-gray-600 dark:text-gray-300
                        group-hover:text-primary-600 dark:group-hover:text-primary-400"
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Partnerships Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-4"
            >
              <div className="grid grid-rows-2 gap-4">
                {/* HR Partnership */}
                <div
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 
                dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-900/50">
                      <HeartHandshake className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t(
                          "company.sections.partnerships.types.hr.title",
                          DEFAULT_COMPANY_DATA.partnerships.hr.title
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                        {t(
                          "company.sections.partnerships.types.hr.description",
                          DEFAULT_COMPANY_DATA.partnerships.hr.description
                        )}
                      </p>
                      <Link
                        to={`/${i18n.language}/partnerships/hr`}
                        className="inline-flex items-center space-x-2 text-sm font-medium
                        text-rose-600 dark:text-rose-400 hover:text-rose-700 
                        dark:hover:text-rose-300 transition-colors group mt-2"
                      >
                        <span>
                          {t(
                            "company.sections.partnerships.buttons.learnMore",
                            DEFAULT_COMPANY_DATA.partnerships.buttons.learnMore
                          )}
                        </span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sales Partnership */}
                <div
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 
                dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/50">
                      <BadgeDollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t(
                          "company.sections.partnerships.types.sales.title",
                          DEFAULT_COMPANY_DATA.partnerships.sales.title
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                        {t(
                          "company.sections.partnerships.types.sales.description",
                          DEFAULT_COMPANY_DATA.partnerships.sales.description
                        )}
                      </p>
                      <Link
                        to={`/${i18n.language}/partnerships/sales`}
                        className="inline-flex items-center space-x-2 text-sm font-medium
                        text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 
                        dark:hover:text-emerald-300 transition-colors group mt-2"
                      >
                        <span>
                          {t(
                            "company.sections.partnerships.buttons.learnMore",
                            DEFAULT_COMPANY_DATA.partnerships.buttons.learnMore
                          )}
                        </span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Careers Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-3"
            >
              <div
                className="bg-white dark:bg-gray-800/90 rounded-xl p-4 border border-gray-100 
              dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/50">
                    <Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t(
                      "company.sections.careers.title",
                      DEFAULT_COMPANY_DATA.careers.title
                    )}
                  </h3>
                </div>

                <div className="space-y-2">
                  {jobOpenings.map((job, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group p-2 rounded-lg hover:bg-orange-50 
                      dark:hover:bg-orange-900/20 transition-colors"
                    >
                      <Link
                        to={`/${i18n.language}/careers`}
                        className="flex flex-col"
                      >
                        <span className="text-sm text-gray-900 dark:text-white font-medium">
                          {job.role}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {job.location}
                        </span>
                      </Link>
                    </motion.div>
                  ))}

                  <Link
                    to={`/${i18n.language}/careers`}
                    className="inline-flex items-center space-x-2 text-sm font-medium
                    text-orange-600 dark:text-orange-400 hover:text-orange-700 
                    dark:hover:text-orange-300 transition-colors group mt-2 p-2"
                  >
                    <span>
                      {t(
                        "company.sections.careers.viewAll",
                        DEFAULT_COMPANY_DATA.careers.viewAll
                      )}
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MegaMenuBackground>
  );
}
