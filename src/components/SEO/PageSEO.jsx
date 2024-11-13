// src/components/SEO/PageSEO.jsx
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { DEFAULT_SEO } from "../../constants/seo";

export default function PageSEO({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  alternates,
  additionalMetaTags,
  additionalLinkTags,
  noindex,
  nofollow,
}) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const fullTitle = title
    ? DEFAULT_SEO.titleTemplate.replace("%s", title)
    : DEFAULT_SEO.title;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Language */}
      <html lang={currentLanguage} />

      {/* Robots */}
      {(noindex || nofollow) && (
        <meta
          name="robots"
          content={`${noindex ? "noindex" : "index"}, ${
            nofollow ? "nofollow" : "follow"
          }`}
        />
      )}

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {openGraph?.images?.map((image, index) => (
        <meta
          key={`og-image-${index}`}
          property="og:image"
          content={image.url}
        />
      ))}

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {twitter?.image && <meta name="twitter:image" content={twitter.image} />}

      {/* Alternate Languages */}
      {alternates?.map(({ href, hrefLang }) => (
        <link key={hrefLang} rel="alternate" href={href} hrefLang={hrefLang} />
      ))}

      {/* Additional Tags */}
      {additionalMetaTags?.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      {additionalLinkTags?.map((tag, index) => (
        <link key={index} {...tag} />
      ))}
    </Helmet>
  );
}

PageSEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  openGraph: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        alt: PropTypes.string,
      })
    ),
  }),
  twitter: PropTypes.shape({
    image: PropTypes.string,
  }),
  alternates: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      hrefLang: PropTypes.string.isRequired,
    })
  ),
  additionalMetaTags: PropTypes.arrayOf(PropTypes.object),
  additionalLinkTags: PropTypes.arrayOf(PropTypes.object),
  noindex: PropTypes.bool,
  nofollow: PropTypes.bool,
};
