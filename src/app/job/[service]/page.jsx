import React from "react";
import fetchData from "@/actions/server";
import Design from "@/app/homepage1/components/Design";
import BlogCarousel from "@/components/BlogCarousel";
import Wrapper from "@/components/Wrapper";
import Apply from "../components/Apply";

export const revalidate = 60;
export const dynamicParams = true;

async function fetchJobData(slug) {
  return fetchData(`${process.env.BACKEND_URL}/jobs/${slug}`);
}

export async function generateMetadata({ params }) {
  const { service } = params;
  const service1 = decodeURIComponent(service);

  const [consultingData] = await Promise.all([fetchJobData(service1)]);

  const data = consultingData;

  if (!data) {
    return {
      title: "الصفحة غير موجودة",
      description: "الصفحة المطلوبة غير متاحة.",
    };
  }

  return {
    title: data?.data?.meta_title || "أكاديمية كراون للتدريب والتطوير",
    description:
      data?.data?.meta_description || "استكشف أفضل الدورات والمدونات",
    keywords:
      data?.data?.meta_keywords || "تدريب، دورات، مدونات، تطوير",
    alternates: {
      canonical: `https://ar.clinstitute.co.uk/job/${service}`,
    },
    openGraph: {
      title: data?.data?.meta_title,
      description: data?.data?.meta_description,
      url: `https://ar.clinstitute.co.uk/job/${service}`,
      images: [
        {
          url: data?.data?.image || "/Logocrown.webp",
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
      images: [data?.data?.image || "/Logocrown.webp"],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.BACKEND_URL}/jobs`, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,
    },
  }).then((res) => res.json());
  return posts.data.map((post) => ({
    id: post.id,
  }));
}

export default async function JobPosting({ params }) {
  const { service } = params;
  const service1 = decodeURIComponent(service);

  const blogs = await fetch(
    `${process.env.BACKEND_URL}/blogs?per_page=5&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,
      },
    }
  ).then((res) => res.json());

  const job_data = await fetchJobData(service1);
  const data = job_data.data;

  return (
    <>
      <Design secondary={true} bg={true}></Design>
      <div className="max-w-6xl mx-auto py-6 text-base mt-10">
        <div className="bg-white shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="w-[300%] h-12 bg-primary md:-mx-12 -z-10" />
          </div>

          {/* قسم العنوان */}
          <div className="flex flex-col lg:flex-row z-50">
            <div className="flex-1 p-4 md:p-6 lg:border-r lg:border-gray-200">
              <h1 className="text-2xl md:text-3xl font-bold font-inter tracking-tight mb-4 text-primary">
                {data.title}
              </h1>
              <h2 className="text-base text-gray-600 leading-relaxed font-inter">
                {data.short_description}
              </h2>
            </div>

            <div className="p-4 md:p-6 lg:w-96 flex flex-col justify-between z-50">
              <Apply />
              <div className="space-y-3">
                <div className="flex items-center gap-3 justify-start">
                  <h3 className="font-medium min-w-[80px] text-primary">الراتب:</h3>
                  <span className="text-gray-600">
                    {data.min_salary} - {data.max_salary}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium min-w-[80px] text-primary">نوع الوظيفة:</span>
                  <span className="text-gray-600">{data.job_type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium min-w-[80px] text-primary">الصناعة:</span>
                  <span className="text-gray-600">{data.company.industry}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">حالة الوظيفة:</span>
                  <span className="text-gray-600">{data.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* الوصف الوظيفي */}
          <div className="mt-6 p-3">
            <h2 className="text-2xl font-bold text-primary mb-3">الوصف الوظيفي</h2>
            <div
              className="text-gray-700 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>
      </div>

      {/* قسم المدونات ذات الصلة */}
      <div className="flex justify-center">
        <h1 className="mt-10 mb-10 text-primary text-center flex justify-center text-3xl font-bold">
          مقالات ذات صلة قد تهمك
        </h1>
      </div>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Wrapper>
          <BlogCarousel data={blogs} />
        </Wrapper>
      </div>
    </>
  );
}
