import Image from "next/image";
import React from "react";
import SectionTitle from "../../Homepage/components/SectionTitle";
import SearchFilters_cities from "./components/SearchFilters_cities";
import HeaderSection from "@/components/HeaderSection";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const slug1 = decodeURIComponent(slug)
  const product = await fetch(
    `${process.env.BACKEND_URL}/cities/${slug1}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

      },
    }
  ).then((res) => res.json());

  const title =
    product?.data?.meta_title || "British Academy for Training & Development";
  const description =
    product?.data?.meta_description ||
    "British Academy for Training & Development";
  const keywords =
    product?.data?.meta_keywords ||
    "British Academy for Training & Development";

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      type: "website",
      locale: `${process.env.LOCALE_LANGUAGE}`,
      site_name: "Crown Academy for Training & Development",
      description: "Crown Academy for Training & Development",
      url: `https://ar.client-academy.vercel.app/show_cities/${slug1}`,
      images: [product?.data[0]?.image],
    },
    twitter: {
      site_name: "British Academy for Training & Development",
      description: "British Academy for Training & Development",
      url: `https://ar.client-academy.vercel.app/show_cities/${slug1}`,
      images: [
        {
          url: "/Logocrown.png",
          width: 800,
          height: 600,
          alt: "Og Image Alt",
        },
      ],
      card: "summary_large_image",
      creator: "Crown Acadmey",
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.BACKEND_URL}/courses/`, {
    headers: {
      "Content-Type": "application/json",
       "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

    },
  }).then((res) => res.json());
  return posts.data.map((post) => ({
    id: post.id,
  }));
}

const page = async ({ params }) => {
  const { slug } = params;
  const slug1 = decodeURIComponent(slug)
  const post = await fetch(
    `${process.env.BACKEND_URL}/courses/${slug1}/cities`,
    {
      headers: {
        "Content-Type": "application/json",
         "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

      },
    }
  ).then((res) => res.json());
  console.log(post);
  console.log(params);

  const specialization = await fetch(
    `${process.env.BACKEND_URL}/specializations`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,
      },
    }
  ).then((res) => res.json());

  const Category = await fetch(`${process.env.BACKEND_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
       "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

    },
  }).then((res) => res.json());

  return (
    <>
      <HeaderSection />
      <div>
        <section className="mt-12 mb-12 text-center">
          <SectionTitle title="Courses by" highlight={slug1} />

          <div className="flex justify-center my-6">
            <Image
              src="/map.png" // Replace with actual world map image
              alt="World Map"
              width={1000}
              height={200}
            />
          </div>
        </section>
        <SearchFilters_cities
          post={post}
          params={params}
          specialization={specialization}
          Category={Category}
        />
      </div>
    </>
  );
};

export default page;
