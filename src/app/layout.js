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
  keywords: "Training Courses, Professional Development, Diploma Programs, Master's Programs, Consulting Services, Team Building Workshops, Project Management Courses, Leadership Training, Human Resources Courses, Quality Management Training, Health and Safety Courses, Engineering Training, Information Technology Courses, Public Relations Training, Financial Management Courses, Business Training, Corporate Training Solutions, Employee Development Programs, Online Training Courses, Management Training, Skill Development Workshops, Executive Coaching, Business Consultancy, Workplace Training Programs, Human Resource Management, Continuous Professional Development, Leadership Skills Development, Certified Training Programs, Career Advancement Courses, Workplace Safety Training, Training Institute, Vocational Training Courses",
  openGraph: {
    type: "website",
    locale: "en_US",
    site_name: "Crown Institute for Training & Development",
    description: "Crown Institute for Training & Development",
    url: "https://clinstitute.co.uk/",
    images: [
      {
        url: "https://clinstitute.co.uk/Logocrown.webp",
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
        url: "https://clinstitute.co.uk/Logocrown.webp",
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
<html lang="ar" dir="rtl">    <AuthProvider>
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
