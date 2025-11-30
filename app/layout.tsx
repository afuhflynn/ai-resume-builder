import "@/app/globals.css";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { QueryProvider } from "@/components/provider/quer-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { AnalyticsProvider } from "@/providers/PostHogProvider"; // Assuming PostHogProvider.tsx now exports AnalyticsProvider
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata = {
  title: "Resumi - AI Resume Builder",
  description: "Generate professional resumes with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <AnalyticsProvider>
          <NuqsAdapter>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
              <Toaster position="bottom-right" />
            </QueryProvider>
          </NuqsAdapter>
        </AnalyticsProvider>

        <CookieConsentBanner />
      </body>
    </html>
  );
}
