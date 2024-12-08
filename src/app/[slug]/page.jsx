import React from "react";
import SearchFiltersCities from "../cities/[slug]/components/SearchFilters_cities";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Head from "next/head";
import { GetAllCategory, GetSpecificSpecialization } from "@/actions/server";
import NotFound from "../not-found";


// Function to fetch city data
async function fetchCityData() {
  const res = await fetch("https://backendbatd.clinstitute.co.uk/api/cities", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds for fresh data
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en",
    },
  });
  return res.json();
}

// Function to fetch specialization data
async function fetchSpecializationData() {
  const res = await fetch(
    "https://backendbatd.clinstitute.co.uk/api/specializations",
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

async function fetchCityCourses(slug) {
  const courses = await fetch(
    `${process.env.BACKEND_URL}/courses/${slug}/cities`,
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



// Dynamic Page Component
export default async function Page({ params }) {
  const { slug } = params;

  // Fetch both city and specialization data
  const [cityData, specializationData,cityCourses] = await Promise.all([
    fetchCityData(),
    fetchSpecializationData(),
    fetchCityCourses(slug),
  ]);

  const category = await GetAllCategory()
  const specialization_courses = await GetSpecificSpecialization(slug)

  console.log(category);
  

  // Match slug with city or specialization
  const city = cityData.data.find((c) => c.slug === slug);
  const specialization = specializationData.data.find((s) => s.slug === slug);

    
  // If not found, throw a 404
  if (!city && !specialization) {
    return <NotFound/>;
  }

  const data = city || specialization;
  const type = city ? "city" : "specialization";

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
          <SearchFiltersCities post={cityCourses} params={slug} specialization={specializationData} Category={category} search={true}/>
        </div>
      ) : (
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
          <SearchFiltersCities post={specialization_courses} params={slug} specialization={specializationData} Category={category} search={false}/>
        </div>
      )}
    </>
  );
}


// Generate dynamic paths for SSG
export async function generateStaticParams() {
  const [cityData, specializationData] = await Promise.all([
    fetchCityData(),
    fetchSpecializationData(),
  ]);

  // Collect all slugs from city and specialization data
  const cityPaths = cityData.data.map((city) => ({ slug: city.slug }));
  const specializationPaths = specializationData.data.map((specialization) => ({
    slug: specialization.slug,
  }));

  return [...cityPaths, ...specializationPaths];
}
