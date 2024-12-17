import React, { Suspense } from "react";
import Content_extend from "../components/Content_extend";
import Carasoul from "../../blogs/components/Carasoul";
import DesktopCarasoul from "../../blogs-details/components/DesktopCarasoul";
import Details1 from "../components/Details1";
import { GetSpecialization, GetSpecificSpecialization } from "@/actions/server";
import NotFound from "@/app/not-found";
import Head from "next/head";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import SearchFilters_cities from '@/app/cities/[slug]/components/SearchFilters_cities'
import HeaderSection from "@/components/HeaderSection";


// Function to fetch specialization data
async function fetchSpecializationData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/specializations`,
    {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

      },
    }
  );
  return res.json();
}

async function fetchCourses() {
  const courses = await fetch(
    `${process.env.BACKEND_URL}/courses`,
    {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

      },
    }
  )
  return courses.json();
}


const page = async ({params}) => {

  const {course} = params;
  const {slug} = params;
  // Fetch both city and specialization data
  const [courseData, specializationData] = await Promise.all([
    fetchCourses(),
    fetchSpecializationData(),
  ]);

  const specialization1 = await fetch(`${process.env.BACKEND_URL}/specializations`,{
    headers : {
      'Content-Type': 'application/json',
      "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

    },
  }).then(
    (res) => res.json()
  )


  const Category1 = await fetch(`${process.env.BACKEND_URL}/categories`,{
    headers : {
      'Content-Type': 'application/json',
      "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,

    },
  }).then(
    (res) => res.json()
  )
  
 

  const category = await GetSpecialization()  

  // Match slug with city or specialization
  const courses = courseData.data.find((c) => c.slug === course);
  const specialization = specializationData.data.find((s) => s.slug === course);

    
  // If not found, throw a 404
  if (!courses && !specialization) {
    return <NotFound/>;
  }

  const data = courses || specialization;
  const type = courses ? "course" : "specialization";


  const course_specialization = await GetSpecificSpecialization(course)
  console.log(course_specialization);
  
  
  return (
    <div>
      <Head>
      {/* Basic SEO Tags */}
      <title>{data.meta_title}</title>
      <meta name="title" content={data.meta_title} />
      <meta name="description" content={data.meta_description} />
      <meta name="keywords" content={data.meta_keywords} />
      <meta name="author" content={data?.meta_author || "British Academy for Training & Development"} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph (OG) Tags for Social Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.meta_title} />
      <meta property="og:description" content={data.meta_description} />
      <meta property="og:image" content={data.image || "/logobat.webp"} />
      <meta property="og:url" content={data.meta_url || `https://clinstitute.co.uk/${slug}/${course}`} />
      <meta property="og:site_name" content={data.site_name || "British Academy for Training & Development"} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.meta_title} />
      <meta name="twitter:description" content={data.meta_description} />
      <meta name="twitter:image" content={data.image || "/logobat.webp"} />
      <meta name="twitter:site" content={data.twitter_site || "@yourTwitterHandle"} />

      {/* Canonical URL */}
      <link rel="canonical" href={`https://clinstitute.co.uk/${slug}/${course}`} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: data.meta_title,
            description: data.meta_description,
            url: data.meta_url || `https://clinstitute.co.uk/${slug}/${course}`,
            image: data.meta_image || "//logobat.webp",
            author: {
              "@type": "Person",
              name: data.meta_author || "British Academy for Training & Development",
            },
          }),
        }}
      />
    </Head>
      <HeaderSection/>
      {type === "course" ? (
        <><Content_extend categories={category}>
          <div className="mt-10 font-semibold text-center md:text-left title text-xl">
            {data?.title}
          </div>
          <Suspense fallback={"loading..."}>
            <Details1 course={data} />
          </Suspense>
        </Content_extend><h1 className="mx-6 mt-10 text-xl font-bold text-center md:text-start md:mb-10 text-primary">
            Trending Courses
          </h1><div className="hidden sm:block">
            <DesktopCarasoul />
          </div><div className="flex justify-center sm:hidden">
            <Carasoul />
          </div></>
    
      ) : (
        <div>
        <section className="mt-12 mb-12 text-center">
        <SectionTitle title="Courses by" highlight={course} />

        <div className="flex justify-center my-6">
          <Image    
            src="/map.png" // Replace with actual world map image
            alt="World Map"
            width={1000}
            height={200}
          />
        </div>
      </section>
        <SearchFilters_cities post={course_specialization} search params={course} specialization={specialization1} Category={Category1.data}/>
        
    </div>
      ) }
      </div>
      
  );
};

export default page;



// Generate dynamic paths for SSG
export async function generateStaticParams() {
  const [courseData, specializationData] = await Promise.all([
    fetchCourses(),
    fetchSpecializationData(),
  ]);

  // Collect all slugs from city and specialization data
  const coursePaths = courseData.data.map((city) => ({ slug: city.slug }));
  const specializationPaths = specializationData.data.map((specialization) => ({
    slug: specialization.slug,
  }));

  return [...coursePaths, ...specializationPaths];
}