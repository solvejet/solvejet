// src/pages/Home.jsx
import PageSEO from "../components/SEO/PageSEO";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation(["home"]);

  const seoConfig = {
    title: t("home:welcome"),
    description: t("home:description"),
    canonical: `https://solvejet.net/${i18n.language}`,
    alternates: [
      { href: "https://solvejet.net/en", hrefLang: "en" },
      { href: "https://solvejet.net/es", hrefLang: "es" },
    ],
    openGraph: {
      images: [
        {
          url: "/images/home-og.jpg",
          width: 1200,
          height: 630,
          alt: t("home:welcome"),
        },
      ],
    },
  };

  return (
    <>
      <PageSEO {...seoConfig} />
      {/* Rest of your page content */}
    </>
  );
}
