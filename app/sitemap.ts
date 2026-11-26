import type { MetadataRoute } from "next";
import { isGithubPages, pagesSiteUrl } from "@/lib/hosting";

export const dynamic = "force-static";

const VERCEL_URL = "https://appgate-pack.vercel.app";
const SITE_URL = isGithubPages ? pagesSiteUrl(VERCEL_URL) : VERCEL_URL;

const PATHS = [
  "",
  "/check",
  "/free/4-2-capacitor",
  "/kit",
  "/sample",
  "/overnight",
  "/digest",
  "/legal/disclaimer",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.map((path) => ({
    url: isGithubPages ? `${SITE_URL}${path}/` : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
