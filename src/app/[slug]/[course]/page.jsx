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


export async function generateMetadata({ params }) {
  const { course, slug } = params;

  // Fetch course and specialization data
  const [courseData, specializationData] = await Promise.all([
    fetchCourses(),
    fetchSpecializationData(),
  ]);

  // Match data based on the slug or course
  const courses = courseData?.data?.find((c) => c.slug === course);
  const specialization = specializationData?.data?.find((s) => s.slug === course);

  // Fallback to 404 if no valid data found
  const data = courses || specialization;
  if (!data) {
    return {
      title: "Page Not Found",
      description: "The requested page does not exist.",
    };
  }

  return {
    title: data.meta_title || "British Academy for Training & Development",
    description: data.meta_description || "Discover specialized courses and training programs.",
    keywords: data.meta_keywords || "courses, specialization, training, programs",
    alternates: {
      canonical: `https://clinstitute.co.uk/${slug}/${course}`,
    },
    openGraph: {
      title: data.meta_title || "British Academy for Training & Development",
      description: data.meta_description || "Explore top-notch training programs and courses.",
      url: `https://clinstitute.co.uk/${slug}/${course}`,
      images: [
        {
          url: data.image || "/logobat.webp",
          width: 800,
          height: 600,
          alt: data.meta_title || "Course Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta_title || "British Academy for Training & Development",
      description: data.meta_description || "Explore specialized training programs and courses.",
      images: [data.image || "/logobat.webp"],
    },
  };
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