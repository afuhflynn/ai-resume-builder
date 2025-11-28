import "@/app/globals.css";
import { QueryProvider } from "@/components/provider/quer-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Toaster } from "sonner";

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
      </body>
    </html>
  );
}
