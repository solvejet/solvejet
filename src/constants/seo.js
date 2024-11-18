// src/constants/seo.js
export const DEFAULT_SEO = {
  title: "SolveJet",
  titleTemplate: "%s",
  description: "Advanced solution for your needs",
  openGraph: {
    type: "website",
    locale: "en",
    url: "https://solvejet.net/",
    siteName: "SolveJet",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SolveJet",
      },
    ],
  },
  twitter: {
    handle: "@solvejet",
    site: "@solvejet",
    cardType: "summary_large_image",
  },
};
