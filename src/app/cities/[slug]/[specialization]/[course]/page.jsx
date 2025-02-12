import React, { Suspense } from "react";
import fetchData, { GetSpecialization } from "@/actions/server";
import BlogPage from "@/app/blogs-details/components/BlogPage";
import Head from "next/head";
import Design from "@/app/homepage1/components/Design";
import Details1 from "@/app/[slug]/components/Details1";
import BlogCarousel from "@/components/BlogCarousel";
import Wrapper from "@/components/Wrapper";

export const dynamic = "force-dynamic";

async function fetchCourseData() {
  return fetchData(`${process.env.BACKEND_URL}/courses`);
}

async function fetchBlogData() {
  return fetchData(`${process.env.BACKEND_URL}/blogs?per_page=5&page=1`);
}

async function fetchCourseDetail(slug) {
  return fetchData(`${process.env.BACKEND_URL}/courses/${slug}`);
}

async function fetchBlogDetail(slug) {
  return fetchData(`${process.env.BACKEND_URL}/blogs/${slug}`);
}

// --------- GENERATE METADATA FUNCTION ---------
export async function generateMetadata({ params }) {
  const { course } = params;
  const { slug } = params;
  const { specialization } = params;

  const course1 = decodeURIComponent(course)
  const slug1 = decodeURIComponent(slug)
  const specialization1 = decodeURIComponent(specialization)

  // Fetch course or blog details based on slug
  const [courseData, blogData] = await Promise.all([
    fetchCourseDetail(course1),
    fetchBlogDetail(course1),
  ]);

  const data = courseData || blogData;
  if (!data) {
    return {
      title: "الصفحة غير موجودة",
      description: "الصفحة المطلوبة غير موجودة.",
    };
  }

  return {
    title: data?.data?.meta_title || "أكاديمية كراون للتدريب والتطوير",
    description:
      data?.data?.meta_description || "استكشف أفضل الدورات والمدونات",
    keywords:
      data?.data?.meta_keywords || "التدريب، الدورات، المدونات، التطوير",
    alternates: {
      canonical: `https://ar.clinstitute.co.uk/${slug1}/${specialization1}/${course1}`,
    },
    openGraph: {
      title: data?.data?.meta_title,
      description: data?.data?.meta_description,
      url: `https://ar.clinstitute.co.uk/${slug1}/${specialization1}/${course1}`,
      images: [
        {
          url: data?.data?.image || "https://ar.clinstitute.co.uk/Logocrown.webp",
          width: 800,
          height: 600,
          alt: data?.data?.meta_title || "صورة الدورة",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.data?.meta_title,
      description: data?.data?.meta_description,
      images: [data?.data?.image || "https://r.clinstitute.co.uk/Logocrown.webp"],
    },
  };
}

const page = async ({ params }) => {
  const { course } = params;
  const course2 = decodeURIComponent(course)

  const [course1, blog, courseData, blogData] = await Promise.all([
    fetchCourseData(),
    fetchBlogData(),
    fetchCourseDetail(course2),
    fetchBlogDetail(course2),
  ]);

  const courses = course1?.data?.find((c) => c.slug === course2);
  const blogs = blog?.data?.find((s) => s.slug === course2);

  const course_carasoul = await fetchData(`${process.env.BACKEND_URL}/courses`);

  const data = courseData || blogData;
  const type = courses ? "courses" : "blogs";

  const category = await GetSpecialization();

  return (
    <>
      <Head>
      <title>
          {data?.data?.meta_title ||
            "الأكاديمية البريطانية للتدريب والتطوير"}
        </title>
        <meta
          name="title"
          content={
            data?.data?.meta_title ||
            "الأكاديمية البريطانية للتدريب والتطوير"
          }
        />
        <meta
          name="description"
          content={
            data?.data?.meta_description ||
            "الأكاديمية البريطانية للتدريب والتطوير"
          }
        />
        <meta
          name="keywords"
          content={
            data?.data?.meta_keywords ||
            "التدريب، الدورات، المدونات، التطوير"
          }
        />
        <meta
          name="author"
          content={
            data?.data?.meta_author ||
            "الأكاديمية البريطانية للتدريب والتطوير"
          }
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data?.data?.meta_title} />
        <meta
          property="og:description"
          content={data?.data?.meta_description}
        />
        <meta
          property="og:image"
          content={data?.data?.image || "/Logocrown.webp"}
        />
        <meta
          property="og:url"
          content={data?.data?.meta_url || `https://ar.clinstitute.co.uk/cities`}
        />
        <meta
          property="og:site_name"
          content={
            data?.data?.site_name ||
            "الأكاديمية البريطانية للتدريب والتطوير"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.data?.meta_title} />
        <meta
          name="twitter:description"
          content={data?.data?.meta_description}
        />
        <meta
          name="twitter:image"
          content={data?.data?.image || "/Logocrown.webp"}
        />
        <meta
          name="twitter:site"
          content={data?.data?.twitter_site || "@yourTwitterHandle"}
        />
        <link rel="canonical" href={`https://ar.clinstitute.co.uk/cities`} />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name:
                data?.data?.meta_title ||
                "الأكاديمية البريطانية للتدريب والتطوير",
              description:
                data?.data?.meta_description ||
                "الأكاديمية البريطانية للتدريب والتطوير",
              url: data?.data?.meta_url || `https://ar.clinstitute.co.uk/cities`,
              image: data?.data?.image || "//Logocrown.webp",
              author: {
                "@type": "Person",
                name:
                  data?.meta_author ||
                  "الأكاديمية البريطانية للتدريب والتطوير",
              },
            }),
          }}
        />
      </Head>
      {type === "courses" ? (
        <>
          <Design
            icon_white
            iamge={"/image_consult.png"}
            center
            search
            input={false}
            image_height={false}
          >
            <h1 className="max-w-3xl mt-5 text-4xl items-center font-semibold text-white md:text-[55px] md:leading-[60px]">
              {data?.data.title}
            </h1>
          </Design>
          <Suspense fallback={"loading..."}>
            <Details1 course={data.data} />
          </Suspense>

          <div className="flex justify-center overflow-hidden">
            <h1 className="mt-10 mb-10 text-primary text-center flex justify-center text-2xl font-bold">
            مقالات جديدة قد تجدها مثيرة للاهتمام            </h1>
          </div>
          <div className="flex flex-col overflow-hidden justify-center gap-4 sm:flex-row">
            <Wrapper>
              <BlogCarousel data={blog} />
            </Wrapper>
          </div>
        </>
      ) : (
        <div>
          <BlogPage data={data} />
        </div>
      )}
    </>
  );
};

export default page;

export async function generateStaticParams() {
  const [course, blog] = await Promise.all([
    fetchCourseData(),
    fetchBlogData(),
  ]);

  const courses = course?.data?.map((course) => ({ slug: course.slug })) || [];
  const blogs = blog?.data?.map((blog) => ({ slug: blog.slug })) || [];

  return [...courses, ...blogs];
}
