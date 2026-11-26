import type { Metadata } from "next";
import { DisclaimerCallout } from "@/components/disclaimer-callout";
import { API_PAUSED_NOTE } from "@/lib/hosting";
import { stripeLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Overnight Pack intake",
  description:
    "Paste your App Store rejection. Get a custom evidence + Resolution Center pack within about 12 hours. We never log into App Store Connect.",
};

function OvernightIntro() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        Optional · packs later
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">
        Paste the rejection. Get a pack before US morning.
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">
        Tokyo night window ≈ US overnight. Include the full Review message.
        Optional: guideline code, listing URL, notes on Capacitor / WebView /
        native features already shipped.
      </p>
      <ul className="mt-6 space-y-2 text-sm leading-6 text-muted">
        <li>Custom guideline match and fix-vs-appeal note</li>
        <li>Evidence checklist keyed to your binary, not a generic blog post</li>
        <li>Paste-ready Resolution Center draft</li>
        <li>You submit. We do not log into App Store Connect.</li>
      </ul>
      <div className="mt-8">
        <DisclaimerCallout compact />
      </div>
    </div>
  );
}

export default async function OvernightPage() {
  if (process.env.NEXT_PUBLIC_GITHUB_PAGES === "1") {
    return (
      <main className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <OvernightIntro />
        <p className="rounded-xl border border-line bg-card p-6 text-sm leading-6 text-muted sm:p-8">
          {API_PAUSED_NOTE}
        </p>
      </main>
    );
  }

  const { OvernightForm } = await import("@/components/overnight-form");
  const paymentConfigured = Boolean(stripeLink("overnight"));

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr]">
      <OvernightIntro />
      <OvernightForm paymentConfigured={paymentConfigured} />
    </main>
  );
}
