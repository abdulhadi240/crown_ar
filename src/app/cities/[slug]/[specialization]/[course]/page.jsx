import React, { Suspense } from "react";
import Content_extend from "@/app/course_detail/components/Content_extend";
import Details from "@/app/course_detail/components/Details";
import fetchData, { GetSpecialization } from "@/actions/server";
import Head from "next/head";
import BlogPage from "@/app/blogs-details/components/BlogPage";
import NotFound from "@/app/not-found";
import HeaderSection from "@/components/HeaderSection";
import CarasoulCourse from "@/components/CarasoulCourse";

async function fetchCourseData() {
  return fetchData(`${process.env.BACKEND_URL}/courses`);
}

async function fetchBlogData() {
  return fetchData(`${process.env.BACKEND_URL}/blogs`);
}

async function fetchCourseDetail(slug) {
  return fetchData(`${process.env.BACKEND_URL}/courses/${slug}`);
}

async function fetchBlogDetail(slug) {
  return fetchData(`${process.env.BACKEND_URL}/blogs/${slug}`);
}

const page = async ({ params }) => {
  const { course } = params;

  const [course1, blog, courseData, blogData] = await Promise.all([
    fetchCourseData(),
    fetchBlogData(),
    fetchCourseDetail(course),
    fetchBlogDetail(course),
  ]);

  const courses = course1?.data?.find((c) => c.slug === course);
  const blogs = blog?.data?.find((s) => s.slug === course);

  if (!courses && !blogs) {
    return <NotFound />;
  }

  const course_carasoul = await fetchData(`${process.env.BACKEND_URL}/courses`)

  const data = courseData || blogData;
  const type = courses ? "courses" : "blogs";

  const category = await GetSpecialization();

  return (
    <>
      <Head>
      <title>{data.data[0].meta_title}</title>
      <meta name="title" content={data.data[0].meta_title} />
      <meta name="description" content={data.data[0].meta_description} />
      <meta name="keywords" content={data.data[0].meta_keywords} />
      <meta name="author" content={data.data[0].meta_author || "British Academy for Training & Development"} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.data[0].meta_title} />
      <meta property="og:description" content={data.data[0].meta_description} />
      <meta property="og:image" content={data.data[0].image || "/logobat.webp"} />
      <meta property="og:url" content={data.data[0].meta_url || `https://clinstitute.co.uk/cities`} />
      <meta property="og:site_name" content={data.data[0].site_name || "British Academy for Training & Development"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.data[0].meta_title} />
      <meta name="twitter:description" content={data.data[0].meta_description} />
      <meta name="twitter:image" content={data.data[0].image || "/logobat.webp"} />
      <meta name="twitter:site" content={data.data[0].twitter_site || "@yourTwitterHandle"} />
      <link rel="canonical" href={`https://clinstitute.co.uk/cities`} />
      <link rel="icon" href="/favicon.ico" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: data.data[0].meta_title,
            description: data.data[0].meta_description,
            url: data.data[0].meta_url || `https://clinstitute.co.uk/cities`,
            image: data.data[0].image || "//logobat.webp",
            author: {
              "@type": "Person",
              name: data.meta_author || "British Academy for Training & Development",
            },
          }),
        }}
      />
    </Head>
      <HeaderSection />
      {type === "courses" ? (
        <div>
          <Content_extend categories={category}>
            <div className="mt-10 font-semibold text-center md:text-left title text-xl">
              {data?.data?.title}
            </div>
            <Suspense fallback={"loading..."}>
              <Details course={data} />
            </Suspense>
          </Content_extend>
          <h1 className="md:ml-32 mx-6  mt-10 text-xl font-bold text-center md:text-start md:mb-10 text-primary">
            Trending Courses
          </h1>
          <div className="">
            <CarasoulCourse data={course_carasoul} carasoul={true} />{" "}
          </div>
        </div>
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
