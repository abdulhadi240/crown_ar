import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Crown Institute for Training & Development",
  description: "Crown Institute for Training & Development",
  keywords: "Next.js, Tailwind CSS, TypeScript",
  openGraph: {
    type: "website",
    locale: "en_US",
    site_name: "Crown Institute for Training & Development",
    description: "Crown Institute for Training & Development",
    url: "https://clinstitute.co.uk/",
    images: [
      {
        url: "/logocrown.webp",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
  },
  twitter: {
    site_name: "Crown Institute",
    description: "Crown Institute for Training & Development",
    url: "https://clinstitute.co.uk/",
    images: [
      {
        url: "/logocrown.webp",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
    card: "summary_large_image",
    creator: "Crown Institute",
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
    <AuthProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-black dark:text-white`}
      >
        {children}
        <Footer />
      </body>
      </AuthProvider>
    </html>
  );
}
