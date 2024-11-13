// src/components/SEO/DefaultSEO.jsx
import { Helmet } from "react-helmet-async";
import { DEFAULT_SEO } from "../../constants/seo";

export default function DefaultSEO() {
  return (
    <Helmet>
      <title>{DEFAULT_SEO.title}</title>
      <meta name="description" content={DEFAULT_SEO.description} />
      <meta property="og:type" content={DEFAULT_SEO.openGraph.type} />
      <meta property="og:site_name" content={DEFAULT_SEO.openGraph.siteName} />
      <meta property="og:locale" content={DEFAULT_SEO.openGraph.locale} />
      <meta name="twitter:card" content={DEFAULT_SEO.twitter.cardType} />
      <meta name="twitter:site" content={DEFAULT_SEO.twitter.site} />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}
