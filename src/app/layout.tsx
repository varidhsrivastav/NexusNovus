import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google'
// import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
// import { Toaster as SonnarToaster } from '@/components/ui/sonner'
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
const font = DM_Sans({ subsets: ['latin'] })

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "NexusNovus",
  description: "All in one agency Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={font.className}
      >
      <ThemeProvider
       attribute="class"
       defaultTheme="system"
       enableSystem
       disableTransitionOnChange>
        <ModalProvider>
        {children}
        <Toaster/>
        </ModalProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
