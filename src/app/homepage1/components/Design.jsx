import Image from "next/image";
import React from "react";
import Header from "./Header";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Inputs from "./Inputs";

const Design = () => {
  
  return (
    <>
      <div className="relative w-full h-[700px] overflow-hidden">
        {/* Background Image */}
        <Link href={'/'}>
        <Image
          src="/hero-bg.webp"
          layout="fill"
          objectFit="cover"
          alt="Hero Background"
          className="absolute inset-0 brightness-75"
          priority
          loading="eager"
        />
        </Link>

        {/* Navbar (z-index 10 for visibility over the image) */}
        <div className="relative z-10">
          <Header />
          <div className="flex flex-col items-center justify-center h-full px-4">
            {/* Heading and Subheading */}
            <div className="text-center">
              <h1 className="max-w-3xl mt-5 text-3xl font-semibold text-white md:text-6xl">
                Developing People To Improve Performance
              </h1>
              <p className="max-w-xl mx-auto mt-4 text-sm text-white md:text-xl">
                The world's most trusted training partner for improving knowledge, skills, and capabilities.
              </p>
            </div>

            {/* Search Bar */}
            <Inputs/>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-3 mt-6 text-center text-white md:grid-cols-4">
              <div>
                <span className="block text-xl font-bold">3.5+</span>
                <span>million attendees</span>
              </div>
              <div>
                <span className="block text-xl font-bold">500+</span>
                <span>advisors</span>
              </div>
              <div>
                <span className="block text-xl font-bold">65,000+</span>
                <span>organisations</span>
              </div>
              <div>
                <span className="block text-xl font-bold">600+</span>
                <span>courses</span>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col gap-4 mt-6 md:flex-row">
              <Link href={'/'} className="px-8 hover:bg-primary transition-all py-4 text-sm font-bold text-white uppercase rounded-full bg-secondary hover:bg-opacity-90">
                Explore Advantage Plan
              </Link>
              <Link href={'/diploma'} className="px-8 hover:bg-primary transition-all py-4 text-sm font-bold text-white uppercase rounded-full bg-secondary hover:bg-opacity-90">
                View Course Catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;
