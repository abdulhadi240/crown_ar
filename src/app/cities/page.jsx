import React from "react";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import HeaderSection from "@/components/HeaderSection";

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
    <Head>
      {/* Basic SEO Tags */}
      <title>{res.data[0].meta_title}</title>
      <meta name="title" content={res.data[0].meta_title} />
      <meta name="description" content={res.data[0].meta_description} />
      <meta name="keywords" content={res.data[0].meta_keywords} />
      <meta name="author" content={res.data[0].meta_author || "British Academy for Training & Development"} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph (OG) Tags for Social Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={res.data[0].meta_title} />
      <meta property="og:description" content={res.data[0].meta_description} />
      <meta property="og:image" content={res.data[0].image || "/logobat.webp"} />
      <meta property="og:url" content={res.data[0].meta_url || `https://clinstitute.co.uk/cities`} />
      <meta property="og:site_name" content={res.data[0].site_name || "British Academy for Training & Development"} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={res.data[0].meta_title} />
      <meta name="twitter:description" content={res.data[0].meta_description} />
      <meta name="twitter:image" content={res.data[0].image || "/logobat.webp"} />
      <meta name="twitter:site" content={res.data[0].twitter_site || "@yourTwitterHandle"} />

      {/* Canonical URL */}
      <link rel="canonical" href={`https://clinstitute.co.uk/cities`} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: res.data[0].meta_title,
            description: res.data[0].meta_description,
            url: res.data[0].meta_url || `https://clinstitute.co.uk/cities`,
            image: res.data[0].image || "//logobat.webp",
            author: {
              "@type": "Person",
              name: data.meta_author || "British Academy for Training & Development",
            },
          }),
        }}
      />
    </Head>
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
