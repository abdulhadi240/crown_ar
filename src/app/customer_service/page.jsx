import React from "react";
import Card from "./Card";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Contacts from "./Contacts";
import HeaderSection from "@/components/HeaderSection";
const page = () => {
  return (
    <>
    <HeaderSection/>
      <div className="banner-container">
        <div className="relative h-32 banner sm:h-64">
          {" "}
          {/* Set height and make container relative */}
          <Image
            src="/plan.webp"
            alt="banner"
            layout="fill" // Fill the entire container
            objectFit="cover" // Maintain aspect ratio without stretching
            priority
            className="object-cover"
          />
          {/* Text box overlay */}
          <div className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-[150px] sm:w-[300px] flex justify-center items-center h-[60px] sm:h-[80px] rounded-t-2xl bg-white shadow-lg">
            <div>
              <p className="text-[10px] font-semibold text-center sm:text-xl text-primary">
                <span className="text-center text-secondary ">CUSTOMER </span>{" "}
                SERVICE
              </p>
              <p className="flex justify-center text-xs font-normal sm:text-sm text-primary">
                Home / Customer Service
              </p>
            </div>
          </div>
        </div>
      </div>
      <Contacts/>
      

      <div className="flex justify-center">
        <div className="w-full m-20 md:m-32 flex justify-center h-[1px] border-[1px] border-primary mb-10  mt-10" />
      </div>
      <div className="flex justify-center">
        <div className="w-full sm:w-[450px] bg-white dark:text-black shadow-lg p-6 h-auto sm:h-[490px]">
          <h1 className="mb-4 text-2xl font-bold text-center">
            CREATE YOUR TICKET NOW{" "}
          </h1>
          <p className="mb-4 text-sm">
            In diam consequat nec eu. Eu sem nec vel, sollicitudin ipsum viverra
            sed nibh amet. Nunc, et pharetra, duis tortor dictum nisl. Id
            vestibulum tincidunt adipiscing gravida risus.
          </p>
          <form className="">
            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary"
                required
              />
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary"
                required
              />
            </div>
            {/* Phone Input */}
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone"
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary"
                required
              />
            </div>
            {/* Message Input */}
            <div className="mb-4">
              <textarea
                placeholder="Problem"
                className="w-full h-24 py-2 border-b border-gray-300 resize-none focus:outline-none focus:border-primary"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-primary focus:border-primary/80"
            >
              Ceate Ticket
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
