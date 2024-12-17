import React from "react";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import HeaderSection from "@/components/HeaderSection";


// --------- GENERATE METADATA FUNCTION ---------
export async function generateMetadata() {
  const data = await fetch(`${process.env.BACKEND_URL}/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

    },
    revalidate: 100,
  });

  const res = await data.json();

  const metaData = res?.data?.[0] || {};

  return {
    title: metaData.meta_title || "British Academy for Training & Development",
    description:
      metaData.meta_description ||
      "Explore courses offered by city at British Academy for Training & Development.",
    keywords: metaData.meta_keywords || "training, courses, cities, education",
    alternates: {
      canonical: `https://clinstitute.co.uk/cities`,
    },
    openGraph: {
      title: metaData.meta_title || "British Academy for Training & Development",
      description:
        metaData.meta_description ||
        "Explore courses offered by city at British Academy for Training & Development.",
      url: `https://clinstitute.co.uk/cities`,
      images: [
        {
          url: metaData.image || "/logobat.webp",
          width: 800,
          height: 600,
          alt: metaData.meta_title || "British Academy Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaData.meta_title || "British Academy for Training & Development",
      description:
        metaData.meta_description ||
        "Explore courses offered by city at British Academy for Training & Development.",
      images: [metaData.image || "/logobat.webp"],
    },
  };
}


const Page = async () => {
  const data = await fetch(`${process.env.BACKEND_URL}/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

    },
    revalidate: 100,
  });

  const res = await data.json();
  console.log(res);


  
  return (
    <>
      <HeaderSection />
      <div className="container p-4 mx-auto">
        {/* Heading and World Map */}
        <section className="mt-12 mb-12 text-center">
          <h2 className="text-2xl font-bold text-[#1B2559] dark:text-white">
            Courses By <span className="text-secondary">City</span>
          </h2>
          <div className="flex justify-center my-6">
            <Image
              src="/map.png" // Replace with actual world map image
              alt="World Map"
              width={1000}
              height={200}
              priority
            />
          </div>
        </section>

        {/* Search Bar (Visible on Mobile Only) */}
        <div className="flex items-center pl-2 mb-8 rounded-lg lg:hidden border-primary bg-primary">
          <IoIosSearch size={25} color="white" />
          <input
            type="text"
            placeholder="Search City"
            className="w-full p-2 text-white border rounded-md placeholder:text-white border-primary bg-primary focus:outline-none focus:ring-primary"
          />
        </div>

        {/* Courses Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {res.data.map(
              (course, index) =>
                index > 0 && (
                  <div
                    key={course.id}
                    className="w-64 p-2 bg-white rounded-lg shadow-md "
                  >
                    <Image
                      src={course.image || "/image.webp"}
                      alt={course.name}
                      width={300}
                      height={200}
                      className="w-64 rounded-lg h-72 brightness-75"
                    />
                    <div className="mt-4 text-start">
                      <h3 className="text-sm font-semibold  dark:text-black">
                        {course.name}
                      </h3>
                      <div className="flex justify-center mb-4">
                        <Link
                          href={`/${course.slug}`}
                          className="flex justify-center w-auto px-24 py-2 mx-4 mt-2 text-sm text-center text-white rounded bg-primary hover:bg-secondary"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
