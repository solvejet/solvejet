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

export default function CompanyMenu() {
  const { t, i18n } = useTranslation("navigation");

  const getStats = () => {
    try {
      return t("company.sections.about.stats", { returnObjects: true });
    } catch (error) {
      console.error("Error getting company stats:", error);
      return {};
    }
  };

  const stats = [
    { label: getStats().experience, value: "13+" },
    { label: getStats().clients, value: "1000+" },
    { label: getStats().team, value: "250+" },
  ];

  const aboutLinks = [
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
  ];

  const jobOpenings = [
    {
      role: t("company.sections.careers.openings.developer"),
      location: t("company.sections.careers.locations.remote"),
    },
    {
      role: t("company.sections.careers.openings.designer"),
      location: t("company.sections.careers.locations.newyork"),
    },
  ];

  return (
    <MegaMenuBackground>
      <div className="max-w-7xl mx-auto py-6 px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-5"
          >
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/50">
                  <Building className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t("company.sections.about.title")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("company.sections.about.description")}
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
                        hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
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
              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-900/50">
                    <HeartHandshake className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t("company.sections.partnerships.types.hr.title")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                      {t("company.sections.partnerships.types.hr.description")}
                    </p>
                    <Link
                      to={`/${i18n.language}/partnerships/hr`}
                      className="inline-flex items-center space-x-2 text-sm font-medium
                        text-rose-600 dark:text-rose-400 hover:text-rose-700 
                        dark:hover:text-rose-300 transition-colors group mt-2"
                    >
                      <span>{t("company.sections.partnerships.buttons.learnMore")}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sales Partnership */}
              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/50">
                    <BadgeDollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t("company.sections.partnerships.types.sales.title")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                      {t("company.sections.partnerships.types.sales.description")}
                    </p>
                    <Link
                      to={`/${i18n.language}/partnerships/sales`}
                      className="inline-flex items-center space-x-2 text-sm font-medium
                        text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 
                        dark:hover:text-emerald-300 transition-colors group mt-2"
                    >
                      <span>{t("company.sections.partnerships.buttons.learnMore")}</span>
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
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/50">
                  <Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t("company.sections.careers.title")}
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
                    <Link to={`/${i18n.language}/careers`} className="flex flex-col">
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
                  <span>{t("common.viewAll")}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MegaMenuBackground>
  );
}