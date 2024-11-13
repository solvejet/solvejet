// src/components/SEOHead.jsx
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function SEOHead() {
  const { t, i18n } = useTranslation(["common", "home"]);

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t("home:welcome")}</title>
      <meta name="description" content={t("home:description")} />
      <meta property="og:title" content={t("home:welcome")} />
      <meta property="og:description" content={t("home:description")} />
      <meta property="og:locale" content={i18n.language} />
      <link
        rel="alternate"
        href={window.location.href}
        hrefLang={i18n.language}
      />
      {i18n.languages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          href={`${window.location.origin}/${lang}`}
          hrefLang={lang}
        />
      ))}
    </Helmet>
  );
}
