import Image from "next/image";
import React from "react";
import Header from "./Header";
import { FaSearch } from "react-icons/fa";

const Design = () => {
  return (
    <>
      <div className="relative w-full h-[700px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero-bg.webp"
          layout="fill"
          objectFit="cover"
          alt="Hero Background"
          className="absolute inset-0 brightness-90"
          priority
          loading="eager"
        />

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
            <div className="flex justify-center w-full mt-6">
              <div className="flex items-center w-full max-w-xl p-2 bg-white rounded-full">
                <input
                  type="text"
                  className="w-full px-4 py-2 text-gray-700 bg-white rounded-full outline-none focus:ring-0 focus:border-none"
                  placeholder="What Do You Want To Learn"
                />
                <button className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary">
                  <FaSearch />
                </button>
              </div>
            </div>

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
              <button className="px-8 py-4 text-sm font-bold text-white uppercase rounded-full bg-secondary hover:bg-opacity-90">
                Explore Advantage Plan
              </button>
              <button className="px-8 py-4 text-sm font-bold text-white uppercase rounded-full bg-secondary hover:bg-opacity-90">
                View Course Catalogue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;
