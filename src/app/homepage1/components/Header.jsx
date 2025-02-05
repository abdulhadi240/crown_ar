'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { menu } from "../../../components/Menu";
import MobileMenu from "../../../components/MobileMenu";
import Login_ from "@/components/Login_";

const FaLock = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaLock)
);

export const metadata = {
  title: "British Academy - Leading in Training & Development",
  description:
    "The British Academy specializes in management, business, media, and public relations training and development.",
  keywords: "training, development, business, media, public relations, courses",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "British Academy - Training & Development",
    description:
      "Join the British Academy for specialized courses in business, media, and public relations.",
    url: "https://www.britishacademy.com",
    images: [
      {
        url: "/og-image.jpg",
        alt: "British Academy Training",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const Header = ({ secondary, icon_white , bg }) => {
  const [scrolled, setScrolled] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) {  // Change this value based on when you want the effect to trigger
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

  return (
    <>
      <header className="md:hidden z-50">
        <MobileMenu color={icon_white ? 'white' : 'black'} bg={bg}/>
      </header>

      <section>
        {/* Main Navigation */}
        <nav
          className={`relative z-50 text-sm items-center justify-between hidden p-4 text-white bg-primary ${secondary ? 'bg-opacity-100' : 'bg-opacity-70'} md:flex transition-all duration-300 ease-in-out sticky top-0 ${
            scrolled ? 'bg-white shadow-lg' : ''
          }`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src={scrolled ? "/logo13-white.png" : "/logo13.png"}  // Update the logo based on scroll
                alt="British Academy logo"
                width={120}
                height={120}
                priority
                className={`absolute top-0 -mt-7 transition-all duration-300 ease-in-out ${
                  scrolled ? 'filter brightness-0 invert' : ''
                }`}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden space-x-6 sm:flex ml-16 sm:gap-4">
            {menu.map((item, index) => (
              <Link key={index} href={item.link} className="hover:text-white/80">
                {item.name}
              </Link>
            ))}
          </div>

          {/* Login and Sign Up */}
          <Login_/>
          
        </nav>
      </section>
    </>
  );
};

export default Header;
