import React from "react";
import SearchFiltersCities from "../cities/[slug]/components/SearchFilters_cities";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Head from "next/head";
import NotFound from "../not-found";
import fetchData, { GetAllCategory, GetSpecificSpecialization } from "@/actions/server";
import Content_extend from "../course_detail/components/Content_extend";
import Courses_Card from "../account/components/Courses_Card";


// Fetch city, specialization, and program data
async function fetchCityData() {
  return fetchData(`${process.env.BACKEND_URL}/cities`);
}

async function fetchSpecializationCategory() {
  return fetchData(`${process.env.BACKEND_URL}/specializations_categories`);
}

async function fetchSpecializationData() {
  return fetchData(`${process.env.BACKEND_URL}/specializations`);
}

async function fetchProgramData() {
  return fetchData(`${process.env.BACKEND_URL}/programs`);
}

async function fetchCityCourses(slug) {
  return fetchData(`${process.env.BACKEND_URL}/courses/${slug}/cities`);
}

async function fetchProgramCourses(slug) {
  return fetchData(`${process.env.BACKEND_URL}/courses/${slug}/programs`);
}

// Dynamic Page Component
export default async function Page({ params }) {
  const { slug } = params;

  const [cityData, specializationData, cityCourses, programs, programCourses ,SpecializationCategory] =
    await Promise.all([
      fetchCityData(),
      fetchSpecializationData(),
      fetchCityCourses(slug),
      fetchProgramData(),
      fetchProgramCourses(slug),
      fetchSpecializationCategory()
    ]);

    const category = await GetAllCategory().catch(() => []);
    const specialization_courses = await GetSpecificSpecialization(slug).catch(() => []);
  

    const city = cityData?.data?.find((c) => c.slug === slug);
    const specialization = specializationData?.data?.find((s) => s.slug === slug);
    const program = programs?.data?.find((p) => p.slug === slug);

    
    if (!city && !specialization && !program) {
      return <NotFound />;
    }
  
    const data = city || specialization || programCourses;
    const type = city ? "city" : specialization ? "specialization" : "program";

    return (
      <>
        <Head>
          <meta name="title" content={data.meta_title} />
          <meta name="keywords" content={data.meta_keywords} />
          <meta name="description" content={data.meta_description} />
        </Head>
        {type === "city" ? (
          <div>
            <section className="mt-12 mb-12 text-center">
              <SectionTitle title="Courses by" highlight={slug} />
              <div className="flex justify-center my-6">
                <Image
                  src="/map.png" // Replace with actual world map image
                  alt="World Map"
                  width={1000}
                  height={200}
                />
              </div>
            </section>
            <SearchFiltersCities
              post={cityCourses}
              params={slug}
              specialization={specializationData}
              Category={category}
              search={true}
            />
          </div>
        ) : type === "specialization" ? (
          <div>
            <section className="mt-12 mb-12 text-center">
              <SectionTitle title="Courses by" highlight={slug} />
              <div className="flex justify-center my-6">
                <Image
                  src="/map.png" // Replace with actual world map image
                  alt="World Map"
                  width={1000}
                  height={200}
                />
              </div>
            </section>
            <SearchFiltersCities
              post={specialization_courses}
              params={slug}
              specialization={specializationData}
              Category={category}
              search={false}
            />
          </div>
        ) : (
          <>
      <div className="relative flex items-center justify-center min-h-screen bg-white">
        {/* Background Image */}
        <div className="">
          <Image
            src="/search_course.webp" // Replace with your image path
            alt="Background"
            layout="fill"
            priority
            objectFit="cover"
            className="opacity-70"
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute flex items-center justify-center w-full max-w-4xl p-6 rounded-lg ">
          <div className="flex flex-col justify-center gap-2 text-black bg-transparent">
            {/* Search Input */}
            <div className="flex justify-between p-1 bg-white rounded-md md:p-3 ">
              <input
                type="text"
                placeholder="Search in specific course"
                value={''}
              
                className="w-full px-4 py-2 text-sm border border-gray-300 border-none rounded-md md:text-base placeholder:text-sm md:flex-1 focus:outline-none focus:ring-0"
              />
              <button className="px-4 py-1 text-sm text-white transition-colors rounded-md md:text-base md:px-6 md:py-2 bg-primary hover:bg-primary/80">
                Search
              </button>
            </div>
            <div className="flex justify-center gap-2 ">
              {/* Dropdowns */}
              <div className="grid justify-center grid-cols-2 gap-2 md:space-y-0 md:flex md:space-x-2">
                <select className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary">
                  <option className="text-white bg-primary">Language</option>
                </select>
                <select className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary">
                  <option className="text-white bg-primary">Month</option>
                </select>
                <select className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary">
                  <option className="text-white bg-primary">Year</option>
                </select>
                <select className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary">
                  <option className="text-white bg-primary">Category</option>
                </select>
                <select className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary">
                  <option className="text-white bg-primary">
                    Specialization
                  </option>
                </select>
                <select className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary">
                  <option className="text-white bg-primary">Place</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
          </div>
        </div>
      </div>
      <Content_extend categories = {SpecializationCategory.data} params = {params.course}>
        <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2 md:grid-cols-3 ">
          {data?.data?.map((course) => {
            return (
              <Courses_Card data={course} params={params}/>
            )
          })}
          
        </div>
       
        <div className="flex flex-col gap-2 mt-10">
        <h1 className="flex items-center justify-center p-1 text-2xl font-bold text-center md:p-0">Mini Masters Programmes In Management</h1>
      <p className="mb-4 text-base text-center md:text-start">We offer different short and mini master courses across (Non-Academic) our branches in Europe. Course will help you improve your professional experience and give you more support to your CV. </p>
      </div>
      </Content_extend>
    </>
        )}
      </>
    );
  
}


export async function generateStaticParams() {
  const [cityData, specializationData, programs] = await Promise.all([
    fetchCityData(),
    fetchSpecializationData(),
    fetchProgramData(),
  ]);

  // Generate paths from city, specialization, and program data
  const cityPaths = cityData?.data?.map((city) => ({ slug: city.slug })) || [];
  const specializationPaths =
    specializationData?.data?.map((specialization) => ({ slug: specialization.slug })) || [];
  const programPaths = programs?.data?.map((program) => ({ slug: program.slug })) || [];

  return [...cityPaths, ...specializationPaths, ...programPaths];
}