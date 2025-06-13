// @ts-nocheck
import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";

const font = DM_Sans({ subsets: ['latin'] })

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
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />
          </ModalProvider>

          {/* Inject your iframe and script here */}
          <iframe
            id="chatbot-iframe"
            src="https://nexu-novus-bot.vercel.app/chatbot"
            style={{
              position: "fixed",
              bottom: "50px",
              right: "50px",
              background:"red"
            }}
            className="bg-transparent z-[1200]"
          ></iframe>

          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const iframe = document.getElementById('chatbot-iframe');
                  window.addEventListener("message", (e) => {
                    if (e.origin !== "https://nexu-novus-bot.vercel.app") return;
                    try {
                      let dimensions = JSON.parse(e.data);
                      iframe.width = dimensions.width;
                      iframe.height = dimensions.height;
                      iframe.contentWindow.postMessage("5dfb2202-dbef-4bcc-95d7-4f1acfc6de90", "https://nexu-novus-bot.vercel.app/");
                    } catch (err) {
                      console.error("Invalid message received", err);
                    }
                  });
                })();
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
