import Image from "next/image";
import React from "react";
import Card from "./components/Card";
import DesktopCarasoul from "../blogs-details/components/DesktopCarasoul";
import Carasoul from "../blogs/components/Carasoul";
import HeaderSection from "@/components/HeaderSection";
import fetchData from "@/actions/server";
import Filteration from "./components/Filteration";
import BlogCarousel from "@/components/BlogCarousel";

const page = async () => {
  const services = await fetchData(`${process.env.BACKEND_URL}/consultations`)
  const catgory = await fetchData(`${process.env.BACKEND_URL}/categories`)
  const blogs = await  fetchData(`${process.env.BACKEND_URL}/blogs`);
  
  return (
    <div>
      <HeaderSection/>
      <div className="overflow-hidden">
        <div className="banner-container">
          <div className="relative flex items-center justify-center h-32 banner sm:h-64">
            {/* Set height and make container relative */}
            <Image
              src="/consulting.webp"
              alt="banner"
              fill // replaces layout="fill"
              priority
              className="object-cover" // replaced objectFit="cover"
            />
            <h1 className="absolute max-w-2xl p-4 font-bold text-center text-white text-ms sm:text-xl md:text-3xl">
              Top 10 tips for making your SaaS product sticky
            </h1>
          </div>
        </div>
      </div>
      <heading>
        <title>All Services in Academy</title>
      </heading>
      <div className="min-h-screen px-4 py-12 bg-gray-100">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold">
            This All Service In Academy
          </h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipiscing elit interdum
            ullamcorper sed pharetra sene.
          </p>
        </div>
        {/* Filter Bar */}
        <Filteration category={catgory} data={services}/>
        
       
      </div>
      <div className="flex flex-col justify-center gap-4 mt-10">
        <h1 className="flex justify-center text-3xl font-bold">
          Artificial Intelligence
        </h1>
        <p className="flex justify-center text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit interdum
          ullamcorper sed pharetra sene.
        </p>
        
        <BlogCarousel data={blogs}/>
      </div>
    </div>
  );
};

export default page;
