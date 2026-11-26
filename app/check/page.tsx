import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckPageBody } from "@/components/check-page-body";
import { pagesSiteUrl } from "@/lib/hosting";
import { parseCheckInput, scorePrecheck, toCheckQuery } from "@/lib/precheck";
import { defaultSiteUrl, siteUrl } from "@/lib/site";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "AppGate Pack free wrapper precheck scorecard: HIGH wrapper risk for a Capacitor app, with 4.2, 4.3, and metadata flags. Not a review prediction.",
} as const;

const staticTitle = "Free Guideline 4.2 / 4.3 precheck for Capacitor & WebView apps";
const staticDescription =
  "Will Apple reject your wrapper app? Paste your stack and three native features for a free, shareable HIGH / MED / LOW card for Guidelines 4.2, 4.3, and metadata. No login. Not a guarantee: Apple decides.";

function checkShareMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  if (process.env.NEXT_PUBLIC_GITHUB_PAGES === "1") {
    return checkShareMetadata(staticTitle, staticDescription, "/check");
  }
  const input = parseCheckInput(await searchParams);
  if (!input) {
    return checkShareMetadata(staticTitle, staticDescription, "/check");
  }
  const result = scorePrecheck(input);
  return checkShareMetadata(
    `${input.name}: wrapper risk ${result.overall}`,
    `${result.blurb} 4.2 ${result.flags["4.2"].level}, 4.3 ${result.flags["4.3"].level}, metadata ${result.flags.metadata.level}. Not a guarantee — Apple decides.`,
    `/check?${toCheckQuery(input)}`,
  );
}

export default async function CheckPage({ searchParams }: Props) {
  if (process.env.NEXT_PUBLIC_GITHUB_PAGES === "1") {
    const shareUrl = `${pagesSiteUrl(defaultSiteUrl)}/check/`;
    const { CheckClient } = await import("@/components/check-client");
    return (
      <Suspense fallback={<CheckPageBody input={null} shareUrl={shareUrl} />}>
        <CheckClient />
      </Suspense>
    );
  }

  const input = parseCheckInput(await searchParams);
  const shareUrl = input
    ? `${siteUrl()}/check?${toCheckQuery(input)}`
    : `${siteUrl()}/check`;
  return <CheckPageBody input={input} shareUrl={shareUrl} />;
}
