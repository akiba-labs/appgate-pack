"use client";

import { useSearchParams } from "next/navigation";
import { CheckPageBody } from "@/components/check-page-body";
import { pagesSiteUrl } from "@/lib/hosting";
import { parseCheckInput } from "@/lib/precheck";
import { defaultSiteUrl } from "@/lib/site";

export function CheckClient() {
  const params = useSearchParams();
  const input = parseCheckInput(new URLSearchParams(params.toString()));
  const shareUrl = `${pagesSiteUrl(defaultSiteUrl)}/check/`;
  return <CheckPageBody input={input} shareUrl={shareUrl} shareNote={Boolean(input)} />;
}
