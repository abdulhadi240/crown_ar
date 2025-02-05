import HeaderSection from "@/components/HeaderSection";
import Image from "next/image";
import Stats from "./components/Stats";
import { CheckCircle } from "lucide-react";
import Carasoul from "./components/Carasoul";
import Link from "next/link";
import Hero from "./components/Hero";
import Design from "../homepage1/components/Design";


const benefits = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
];

const team = [
  {
    name: "Cameron Robinson",
    role: "Product Designer",
    image: "/about.webp",
  },
  {
    name: "Carmen Williams",
    role: "Product Designer",
    image: "/about.webp",
  },
  {
    name: "Cameron Robinson",
    role: "Product Designer",
    image: "/about.webp",
  },
  {
    name: "Cameron Robinson",
    role: "Product Designer",
    image: "/about.webp",
  },
];

export default function ConsultingPage({params}) {
  console.log(params.locale);
  
  return (
    <>
      <Design secondary bg></Design>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-base">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 uppercase">About our Institute</h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipiscing elit officia unde
            omnis
          </p>
        </div>

        {/* Hero Section */}
        <Hero/>

        {/* What We Do Section */}
        <div className="my-16">
          <h2 className="text-2xl font-bold mb-4">What we do</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempus Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempus Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempus Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempus Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempus Lorem
          </p>
        </div>
        <div className="flex justify-center mb-20">
          <div className="flex flex-row gap-16 justify-center md:p-6 md:px-10 rounded-full md:bg-[#f9f9f9] flex-wrap">
            <Stats number={100} icon={"M"} text={"Client Satisfaction"} />
            <Stats number={24} icon={"h"} text={"Client Satisfaction"} />
            <Stats number={98} icon={"k+"} text={"Client Satisfaction"} />
            <Stats number={208} icon={"+"} text={"Client Satisfaction"} />
          </div>
        </div>

        {/* Our Lorem Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Lorem</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in
              ante viverra, rutrum erat rutrum, consectetur mi. Proin at maximus
              est. Nullam purus ex, iaculis sed erat sed, blandit tincidunt
              quam. Cras scelerisque id quam sed dignissim.
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in
              ante viverra, rutrum erat rutrum, consectetur mi. Proin at maximus
              est. Nullam purus ex, iaculis sed erat sed, blandit tincidunt
              quam.
            </p>
          </div>
          <div>
            <Image
              src="/aboutus.webp"
              alt="Digital tablet"
              width={500}
              height={300}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-8">
            loreme loremloreme lorem
            <br />
            loreme lorem
          </h2>
          <div className="grid md:grid-cols-2 items-start gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <div className="w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  in ante viverra, rutrum erat rutrum, consectetur mi. Proin at
                  maximus est. Nullam purus ex.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <div className="w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">Team work</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  in ante viverra, rutrum erat rutrum, consectetur mi. Proin at
                  maximus est. Nullam purus ex.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <div className="w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">Team work</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  in ante viverra, rutrum erat rutrum, consectetur mi. Proin at
                  maximus est. Nullam purus ex.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <div className="w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">Team work</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  in ante viverra, rutrum erat rutrum, consectetur mi. Proin at
                  maximus est. Nullam purus ex.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* What Will You Get Section */}
        <div className="">
          <div className="grid md:grid-cols-2 md:mx-20 mb-20 ">
            <div className="hidden md:block relative">
              <Image
                src="/about.webp"
                alt="Person pointing"
                width={500}
                height={500}
                className="rounded-lg z-50 p-4"
              />
              <div className="bg-[#efd8c9] absolute bottom-0 w-[70%] -z-10 rounded-lg h-[70%]"/>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center flex-col">
                <h2 className="text-2xl text-center font-bold mb-6">
                  What Will You Get?
                </h2>
                <div className="flex justify-center">
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start md:gap-4 gap-2"
                      >
                        <CheckCircle className=" w-10 md:w-6 h-6 text-blue-900 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600">{benefit}</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Lorem ipsum dolor sit amet
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-start md:text-center">Colleague & team members</h2>
          </div>

          <div className="">
            <Carasoul />
          </div>
        </div>
      </main>
    </>
  );
}
