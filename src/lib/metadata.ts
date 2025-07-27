// src/lib/metadata.ts
import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://solvejet.net";

export function generateMetadata({
  title,
  description = "SolveJet is a leading software development company and Google Cloud Partner with ISO certification. Recognized as a top development firm by Clutch, GoodFirms, and DesignRush for delivering innovative software solutions.",
  image = "/og-default.jpg",
  url = "/",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | SolveJet`
    : "SolveJet - Your Ultimate Solution Platform";
  const fullUrl = `${baseUrl}${url}`;
  const fullImage = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: "SolveJet",
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || "SolveJet",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImage],
      creator: "@solvejet",
    },
  };
}
