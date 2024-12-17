import React from "react";
import SearchFiltersCities from "../cities/[slug]/components/SearchFilters_cities";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Head from "next/head";
import NotFound from "../not-found";
import fetchData, { GetAllCategory, GetSpecificSpecialization } from "@/actions/server";
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
      <meta property="og:url" content={data.meta_url || `https://clinstitute.co.uk/${slug}`} />
      <meta property="og:site_name" content={data.site_name || "British Academy for Training & Development"} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.meta_title} />
      <meta name="twitter:description" content={data.meta_description} />
      <meta name="twitter:image" content={data.image || "/logobat.webp"} />
      <meta name="twitter:site" content={data.twitter_site || "@yourTwitterHandle"} />

      {/* Canonical URL */}
      <link rel="canonical" href={`https://clinstitute.co.uk/${slug}`} />

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
            url: data.meta_url || `https://clinstitute.co.uk/${slug}`,
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