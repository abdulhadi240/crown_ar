import Image from "next/image";
import React from "react";
import Card from "./components/Card";
import DesktopCarasoul from "../blogs-details/components/DesktopCarasoul";
import Carasoul from "../blogs/components/Carasoul";


const services = [
  {
    number: 1,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 2,
    title: "Lorem Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 3,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 4,
    title: "Lorem Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 5,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 6,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 7,
    title: "Lorem Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 8,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 1,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 2,
    title: "Lorem Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 3,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 4,
    title: "Lorem Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 5,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 6,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 7,
    title: "Lorem Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    number: 8,
    title: "Lorem Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const page = () => {
  return (
    <div>
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
        <div className="max-w-3xl mx-auto mb-8">
          <div className="grid items-center grid-cols-2 gap-4 sm:flex-row sm:flex">
            <input
              type="text"
              placeholder="Name Services"
              className="flex-1 p-3 text-sm border rounded-lg shadow-md"
            />
            <select className="flex-1 p-3 border rounded-lg shadow-md">
              <option className="">Category</option>
            </select>
            <input
              type="month"
              className="flex-1 p-3 text-sm border rounded-lg shadow-md"
            ></input>
            <button className="px-10 py-3 text-sm text-center text-white transition rounded-lg sm:px-16 bg-primary hover:bg-primary/70">
              Search
            </button>
          </div>
        </div>
        {/* Services List */}
        <div className="grid grid-cols-1 gap-8 md:mx-28 max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.number}
              number={service.number}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 mt-10">
        <h1 className="flex justify-center text-3xl font-bold">
          Artificial Intelligence
        </h1>
        <p className="flex justify-center text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit interdum
          ullamcorper sed pharetra sene.
        </p>
        <div className="hidden sm:flex sm:justify-center">
          <DesktopCarasoul />
        </div>
        <div className="flex justify-center sm:hidden">
          <Carasoul />
        </div>
      </div>
    </div>
  );
};

export default page;
