import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Heart,
  Truck,
  GraduationCap,
  Landmark,
  Factory,
  ArrowRight,
  ChevronRight,
  Trophy,
  BarChart3,
  Target,
} from "lucide-react";
import MegaMenuBackground from "./MegaMenuBackground";

// Industry icons mapping
const industryIcons = {
  ecommerce: Building2,
  healthcare: Heart,
  finance: Landmark,
  education: GraduationCap,
  logistics: Truck,
  manufacturing: Factory,
};

// Default translations fallback
const DEFAULT_INDUSTRIES_DATA = {
  sections: {
    ecommerce: {
      title: "E-commerce",
      description: "Digital retail solutions and platforms",
      highlights: ["Online Stores", "Marketplaces", "Payment Systems"],
    },
    healthcare: {
      title: "Healthcare",
      description: "Digital health and medical solutions",
      highlights: ["Telemedicine", "EHR Systems", "Health Analytics"],
    },
    finance: {
      title: "Finance",
      description: "Financial technology solutions",
      highlights: ["Banking", "Insurance", "Investment"],
    },
    education: {
      title: "Education",
      description: "Educational technology platforms",
      highlights: ["E-Learning", "LMS", "EdTech"],
    },
    logistics: {
      title: "Logistics",
      description: "Supply chain and delivery solutions",
      highlights: ["Fleet Management", "Tracking", "Optimization"],
    },
    manufacturing: {
      title: "Manufacturing",
      description: "Industry 4.0 solutions",
      highlights: ["IoT", "Automation", "Quality Control"],
    },
  },
  stats: {
    projects: "Projects Completed",
    satisfaction: "Client Satisfaction",
  },
  caseStudies: {
    title: "Featured Case Studies",
    viewAll: "View All Case Studies",
  },
};

const IndustryCard = ({ industryKey, Icon }) => {
  const { t } = useTranslation("industries");

  // Get section data with fallback
  const getSectionData = () => {
    try {
      return {
        title:
          t(`industries.sections.${industryKey}.title`) ||
          DEFAULT_INDUSTRIES_DATA.sections[industryKey].title,
        description:
          t(`industries.sections.${industryKey}.description`) ||
          DEFAULT_INDUSTRIES_DATA.sections[industryKey].description,
        highlights:
          t(`industries.sections.${industryKey}.highlights`, {
            returnObjects: true,
          }) || DEFAULT_INDUSTRIES_DATA.sections[industryKey].highlights,
      };
    } catch (error) {
      console.warn(`Fallback to default data for ${industryKey}:`, error);
      return DEFAULT_INDUSTRIES_DATA.sections[industryKey];
    }
  };

  const sectionData = getSectionData();

  return (
    <Link to={`/industries/${industryKey}`} className="group block h-full">
      <div
        className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 
        hover:shadow-xl transition-all duration-300 h-full border border-gray-100 
        dark:border-gray-700/50 p-4"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div
              className="p-2.5 rounded-lg bg-primary-50 dark:bg-primary-900/50 
              group-hover:scale-110 transition-transform duration-300"
            >
              <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {sectionData.title}
              </h4>
              <ArrowRight
                className="w-4 h-4 text-primary-500 dark:text-primary-400 
                opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
              {sectionData.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {sectionData.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs 
                    font-medium bg-primary-50 dark:bg-primary-900/50 text-primary-600 
                    dark:text-primary-400"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CaseStudyCard = ({ study }) => (
  <Link
    to={`/case-studies/${
      study.title?.toLowerCase().replace(/\s+/g, "-") || "case-study"
    }`}
    className="flex items-start space-x-3 p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 
      rounded-lg group transition-all duration-300"
  >
    <img
      src="/api/placeholder/80/60"
      alt={study.title || "Case Study"}
      className="w-16 h-12 rounded object-cover"
    />
    <div className="flex-1 min-w-0">
      <h4
        className="text-sm font-medium text-gray-900 dark:text-white 
        group-hover:text-primary-600 dark:group-hover:text-primary-400 
        transition-colors truncate"
      >
        {study.title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
        {study.description}
      </p>
      <span className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-1 inline-block">
        {study.stat}
      </span>
    </div>
  </Link>
);

export default function IndustriesMenu() {
  const { t, i18n } = useTranslation("industries");

  const caseStudies = [
    {
      title: t(
        "industries.caseStudies.items.healthcare.title",
        "Healthcare Digital Transformation"
      ),
      description: t(
        "industries.caseStudies.items.healthcare.description",
        "Revolutionizing patient care with telemedicine platform"
      ),
      stat: t(
        "industries.caseStudies.items.healthcare.stat",
        "+156% Patient Satisfaction"
      ),
    },
    {
      title: t(
        "industries.caseStudies.items.ecommerce.title",
        "E-commerce Innovation"
      ),
      description: t(
        "industries.caseStudies.items.ecommerce.description",
        "AI-powered recommendation engine implementation"
      ),
      stat: t(
        "industries.caseStudies.items.ecommerce.stat",
        "+43% Revenue Growth"
      ),
    },
  ];

  return (
    <div
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 
      shadow-lg"
    >
      <div className="max-w-[1720px] mx-auto px-24 py-6">
        <div className="flex gap-8">
          {/* Main Industries Section */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(industryIcons).map(([key, Icon], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <IndustryCard industryKey={key} Icon={Icon} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats & Case Studies */}
          <div className="w-72 border-l border-gray-200 dark:border-gray-700 pl-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="rounded-lg bg-primary-50 dark:bg-primary-900/20 p-3 text-center">
                <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  500+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {t(
                    "industries.stats.projects",
                    DEFAULT_INDUSTRIES_DATA.stats.projects
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-primary-50 dark:bg-primary-900/20 p-3 text-center">
                <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  98%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {t(
                    "industries.stats.satisfaction",
                    DEFAULT_INDUSTRIES_DATA.stats.satisfaction
                  )}
                </div>
              </div>
            </div>

            {/* Case Studies */}
            <div>
              <h3
                className="text-xs uppercase tracking-wider font-medium text-gray-500 
                dark:text-gray-400 mb-2"
              >
                {t(
                  "industries.caseStudies.title",
                  DEFAULT_INDUSTRIES_DATA.caseStudies.title
                )}
              </h3>
              <div className="space-y-1">
                {caseStudies.map((study, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <CaseStudyCard study={study} />
                  </motion.div>
                ))}
              </div>

              <Link
                to={`/${i18n.language}/case-studies`}
                className="group inline-flex items-center space-x-2 text-xs font-medium
                  text-primary-600 dark:text-primary-400 hover:text-primary-700
                  dark:hover:text-primary-300 transition-colors mt-3 p-2"
              >
                <span>
                  {t(
                    "industries.caseStudies.viewAll",
                    DEFAULT_INDUSTRIES_DATA.caseStudies.viewAll
                  )}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
