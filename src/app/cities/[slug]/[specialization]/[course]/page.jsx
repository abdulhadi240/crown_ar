import React, { Suspense } from "react";
import Content_extend from "@/app/course_detail/components/Content_extend";
import Carasoul from "@/app/blogs/components/Carasoul";
import DesktopCarasoul from "@/app/blogs-details/components/DesktopCarasoul";
import Details from "@/app/course_detail/components/Details";
import fetchData, { GetSpecialization } from "@/actions/server";
import Head from "next/head";
import BlogPage from "@/app/blogs-details/components/BlogPage";

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

  const data = courseData || blogData;
  const type = courses ? "courses" : "blogs";

  const category = await GetSpecialization();

  return (
    <>
      <Head>
        <meta name="title" content={data.meta_title} />
        <meta name="keywords" content={data.meta_keywords} />
        <meta name="description" content={data.meta_description} />
      </Head>
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
        <h1 className="mx-6 mt-10 text-xl font-bold text-center md:text-start md:mb-10 text-primary">
          Trending Courses
        </h1>
        <div className="hidden sm:block">
          <DesktopCarasoul />
        </div>
        <div className="flex justify-center sm:hidden">
          <Carasoul />
        </div>
      </div>
      )
      : 
      (
        <div>
          <BlogPage data={data}/>
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

  const courses =
  course?.data?.map((course) => ({ slug: course.slug })) || [];
const blogs =
  blog?.data?.map((blog) => ({ slug: blog.slug })) || [];

return [...courses, ...blogs];

}
