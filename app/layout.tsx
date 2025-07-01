import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "LMS - Modern Learning Management System",
    template: "%s | LMS"
  },
  description: "LMS is a next-generation Learning Management System designed to make education accessible, engaging, and effective for everyone.",
  metadataBase: new URL("https://the-lms-one.vercel.app"),
  openGraph: {
    title: "LMS - Modern Learning Management System",
    description: "LMS is a next-generation Learning Management System designed to make education accessible, engaging, and effective for everyone.",
    url: "https://your-domain.com",
    siteName: "LMS",
    images: [
      {
        url: "/logo-rectangle.png",
        width: 1200,
        height: 630,
        alt: "LMS Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LMS - Modern Learning Management System",
    description: "LMS is a next-generation Learning Management System designed to make education accessible, engaging, and effective for everyone.",
    images: ["/logo-rectangle.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  icons: {
    icon: "/favicon.ico"
  },
  themeColor: "#ffffff"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
