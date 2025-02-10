"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { menu } from "../../../components/Menu";
import MobileMenu from "../../../components/MobileMenu";
import Login_ from "@/components/Login_";
import { useRouter } from "next/navigation";
import Head from "next/head";

const FaLock = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaLock)
);

export const metadata = {
  title: "Crown Academy - Leading in Training & Development",
  description:
    "The Crown Academy specializes in management, business, media, and public relations training and development.",
  keywords: "training, development, business, media, public relations, courses",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Crown Academy- Training & Development",
    description:
      "Join the Crown Academy for specialized courses in business, media, and public relations.",
    url: "https://clinstitute.co.uk/",
    images: [
      {
        url: "/Logocrown.webp",
        alt: "Crown AcademyTraining",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const Header = ({ secondary, icon_white, bg }) => {
  const router = useRouter();
  const currentPath = router.asPath; // Get current page path dynamically
  const [scrolled, setScrolled] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    console.log(window.scrollY); // Debugging the scroll position
    if (window.scrollY > 50) {
      // Change this value based on when you want the effect to trigger
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Set up the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Site Navigation JSON-LD
  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": "https://clinstitute.co.uk/#site-navigation",
    name: "Crown Institute",
    url: "https://clinstitute.co.uk",
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: "Home",
        url: "https://clinstitute.co.uk/",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Diploma",
        url: "https://clinstitute.co.uk/diploma",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Masters",
        url: "https://clinstitute.co.uk/masters",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Training Course",
        url: "https://clinstitute.co.uk/training-courses",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Cities",
        url: "https://clinstitute.co.uk/cities",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Consulting",
        url: "https://clinstitute.co.uk/consulting",
      },
      {
        "@type": "SiteNavigationElement",
        name: "About Us",
        url: "https://clinstitute.co.uk/about-us",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Contact Us",
        url: "https://clinstitute.co.uk/contact-us",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Login",
        url: "https://clinstitute.co.uk/login",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Sign Up",
        url: "https://clinstitute.co.uk/register",
      },
    ],
  };

  // Dynamic Breadcrumbs JSON-LD
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://clinstitute.co.uk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: currentPath.split("/")[1] || "Page",
        item: `https://clinstitute.co.uk${currentPath}`,
      },
    ],
  };

  // Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://clinstitute.co.uk/#organization",
        name: "Crown Institute",
        url: "https://clinstitute.co.uk",
        logo: "https://clinstitute.co.uk/logo.png",
        sameAs: [
          "https://www.facebook.com/crowninstitute",
          "https://www.linkedin.com/company/crowninstitute",
          "https://twitter.com/crowninstitute",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+44 20 1234 5678",
          contactType: "customer service",
          email: "info@clinstitute.co.uk",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Your Street, City",
          addressLocality: "London",
          postalCode: "E1 1AA",
          addressCountry: "UK",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://clinstitute.co.uk/#website",
        url: "https://clinstitute.co.uk",
        name: "Crown Institute",
        publisher: { "@id": "https://clinstitute.co.uk/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": `https://clinstitute.co.uk${currentPath}`,
        url: `https://clinstitute.co.uk${currentPath}`,
        name: currentPath.replace("/", " "),
        isPartOf: { "@id": "https://clinstitute.co.uk/#website" },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://clinstitute.co.uk/hero-image.jpg",
        },
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString(),
        inLanguage: "en",
        about: { "@id": "https://clinstitute.co.uk/#organization" },
      },
    ],
  };

  return (
    <>
      <Head>
        {/* Inject JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbsJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </Head>
      <header className="md:hidden z-[9999]">
        <MobileMenu color={icon_white ? "white" : "black"} bg={bg} />
      </header>

      <section className="fixed top-0 w-full z-[999]">
        {/* Main Navigation */}
        <nav
          className={`z-[999] text-sm items-center justify-between hidden p-4 text-white bg-primary ${
            secondary ? "bg-opacity-100" : "bg-opacity-70"
          } md:flex transition-all duration-300 ease-in-out ${
            scrolled ? "bg-opacity-100 shadow-lg z-[99999]" : "z-[50]"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src={"/logo13.png"} // Update the logo based on scroll
                alt="Crown Academy logo"
                width={120}
                height={120}
                priority
                className={`absolute top-0 -mt-7 transition-all duration-300 ease-in-out`}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden space-x-6 sm:flex ml-16 sm:gap-4">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="hover:text-white/80"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Login and Sign Up */}
          <Login_ />
        </nav>
      </section>
    </>
  );
};

export default Header;
