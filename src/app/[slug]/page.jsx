import React from "react";
import SearchFiltersCities from "../cities/[slug]/components/SearchFilters_cities";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Head from "next/head";
import NotFound from "../not-found";
import fetchData, { GetAllCategory, GetSpecificSpecialization } from "@/actions/server";
import Content_extend from "../course_detail/components/Content_extend";
import Courses_Card from "../account/components/Courses_Card";
import Programs from "@/components/Programs";
import HeaderSection from "@/components/HeaderSection";


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

async function fetchCategoryData() {
  return fetchData(`${process.env.BACKEND_URL}/categories`);
}

// Dynamic Page Component
export default async function Page({ params }) {
  const { slug } = params;

  const [cityData, specializationData, cityCourses, programs, programCourses ,SpecializationCategory , categoryData] =
    await Promise.all([
      fetchCityData(),
      fetchSpecializationData(),
      fetchCityCourses(slug),
      fetchProgramData(),
      fetchProgramCourses(slug),
      fetchSpecializationCategory(),
      fetchCategoryData()
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
        <HeaderSection/>
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
          <Programs params={slug} data={data} city={cityData} specialization={specializationData} SpecializationCategory={SpecializationCategory} category={categoryData}/>
      
        )}
      </>
    );
  
}


export async function generateStaticParams() {
  const [cityData, specializationData, programs ,SpecializationCategory , categoryData] =
    await Promise.all([
      fetchCityData(),
      fetchSpecializationData(),
      fetchProgramData(),
      fetchSpecializationCategory(),
      fetchCategoryData()
    ]);

  // Generate paths from city, specialization, and program data
  const cityPaths = cityData?.data?.map((city) => ({ slug: city.slug })) || [];
  const specializationPaths =
    specializationData?.data?.map((specialization) => ({ slug: specialization.slug })) || [];
  const programPaths = programs?.data?.map((program) => ({ slug: program.slug })) || [];

  return [...cityPaths, ...specializationPaths, ...programPaths];
}