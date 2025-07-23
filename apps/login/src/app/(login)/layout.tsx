import "@/styles/globals.scss";
import "@kernel/ui/dist/styles/shadcn.css";
import "tw-animate-css";

import AuthProvider from "@/components/auth-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Lato } from "next/font/google";
import { ReactNode, Suspense } from "react";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className={`${lato.className}`} suppressHydrationWarning>
      <head />
      <body>
        <h1 className="fixed top-4 left-8 text-primary text-[26px] font-bold">
          Kernel
        </h1>
        <ThemeProvider>
          <Suspense
            fallback={
              <div
                className={`relative min-h-screen bg-background-light-600 dark:bg-background-dark-600 flex flex-col justify-center`}
              >
                <div className="relative mx-auto max-w-[440px] py-8 w-full">
                  <Skeleton>
                    <div className="h-40"></div>
                  </Skeleton>
                </div>
              </div>
            }
          >
            <AuthProvider>
              <LanguageProvider>
                <div
                  className={`relative min-h-screen bg-background-light-600 dark:bg-background-dark-600 flex flex-col justify-center`}
                >
                  <div className="relative mx-auto max-w-[440px] py-8 w-full ">
                    {children}
                  </div>
                </div>
              </LanguageProvider>
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
