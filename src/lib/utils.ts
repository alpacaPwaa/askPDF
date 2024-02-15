import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  // If we're on the client side, return the relative path
  if (typeof window !== "undefined") return path;

  // If the VERCEL_URL environment variable is set, use it to construct the absolute URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;

  // If the VERCEL_URL environment variable is not set, use localhost as the base URL for development SSR
  return `http://localhost:3000${path}`;
}

export function constructMetadata({
  title = "SmartCat the perfect chat document for students",
  description = "SmartCat is a free and open-source PDF analyzer powered by AI.",
  image = "/thumbnail.png",
  icons = "favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      //type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@alpaca",
    },
    icons,
    metadataBase: new URL("https://ask-pdf-rho.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function generateViewport() {
  return {
    themeColor: "#FFF",
  };
}
