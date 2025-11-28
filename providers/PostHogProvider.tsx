"use client";

import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, ReactNode } from "react";

// Initialize PostHog only on the client side
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    ui_host: "https://app.posthog.com", // Can be removed if api_host is the same and not self-hosting
    person_profiles: "identified_only", // Only create profiles for identified users
    capture_pageview: false, // Disable automatic pageview capture, as we'll handle it manually
  });
}

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  // Manual pageview capture for Next.js App Router
  useEffect(() => {
    if (pathname) {
      posthog.capture("$pageview");
    }
  }, [pathname]);

  // Note: User identification (posthog.identify) logic would typically go here
  // using your authentication solution's client-side session hook (e.g., from Better Auth).
  // For example:
  // const { data: session } = useBetterAuthSession(); // Replace with actual Better Auth hook
  // useEffect(() => {
  //   if (session?.user?.id && session.user.email) {
  //     posthog.identify(session.user.id, { email: session.user.email });
  //   } else if (session === null) {
  //     posthog.reset(); // Clear user identity if logged out
  //   // For tracking unauthenticated users, you might want to call posthog.identify()
  //   // with an anonymous ID if no session exists, or rely on PostHog's auto-capture
  //   // for anonymous users if `person_profiles: "always"` is used.
  //   }
  // }, [session]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
