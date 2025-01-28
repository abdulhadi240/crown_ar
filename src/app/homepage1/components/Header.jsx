import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { menu } from "../../../components/Menu";
import MobileMenu from "../../../components/MobileMenu";

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

const Header = ({secondary , icon_white}) => {
  return (
    <>
    <header className="md:hidden">
      <MobileMenu color={icon_white ? 'white' : 'black'}/>
    </header>
      
    <section>
        {/* Main Navigation */}
        <nav className={`relative items-center justify-between hidden p-4 text-white bg-primary ${secondary ? 'bg-opacity-100' : 'bg-opacity-70'} md:flex`}>
          {/* Logo */}
          <div className="flex items-center  justify-between">
            <Link href="/">
              <Image
                src="/logocrown.webp"
                alt="British Academy logo"
                width={90}
                height={50}
                priority
                className="absolute top-0"
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
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="flex items-center text-white hover:text-blue-900"
            >
              <FaLock className="mr-1" color="white"/> Login
            </Link>
            <button className="px-4 py-2 text-white rounded bg-secondary ">
              Sign up
            </button>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Header;
