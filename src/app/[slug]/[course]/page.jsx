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
        "Accept-Language": "en",
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
        "Accept-Language": "en",
      },
    }
  )
  return courses.json();
}


const page = async ({params}) => {

  const {course} = params;
  // Fetch both city and specialization data
  const [courseData, specializationData] = await Promise.all([
    fetchCourses(),
    fetchSpecializationData(),
  ]);

  const specialization1 = await fetch(`${process.env.BACKEND_URL}/specializations`,{
    headers : {
      'Content-Type': 'application/json',
      'Accept-Language' : 'en'
    },
  }).then(
    (res) => res.json()
  )


  const Category1 = await fetch(`${process.env.BACKEND_URL}/categories`,{
    headers : {
      'Content-Type': 'application/json',
      'Accept-Language' : 'en'
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
        <meta name="title" content={data.meta_title} />
        <meta name="keywords" content={data.meta_keywords} />
        <meta name="description" content={data.meta_description} />
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