import React from 'react';
import fetchData from '@/actions/server';
import Design from '@/app/homepage1/components/Design';
import BlogCarousel from '@/components/BlogCarousel';
import HeaderSection from '@/components/HeaderSection';
import Wrapper from '@/components/Wrapper';
import Image from 'next/image';
import Consult_form from '@/components/Consult_form';
import Apply from '../components/Apply';

export const revalidate = 60;
export const dynamicParams = true;

async function fetchConsultData(slug) {
  return fetchData(`${process.env.BACKEND_URL}/consultations/${slug}`);
}

export async function generateMetadata({ params }) {
  const { service } = params;

  const [consultingData] = await Promise.all([
    fetchConsultData(service),
  ]);

  const data = consultingData;

  if (!data) {
    return {
      title: "Page Not Found",
      description: "The requested page does not exist.",
    };
  }

  return {
    title: data?.data?.meta_title || "British Academy for Training & Development",
    description: data?.data?.meta_description || "Explore top courses and blogs",
    keywords: data?.data?.meta_keywords || "training, courses, blogs, development",
    alternates: {
      canonical: `https://clinstitute.co.uk/consulting-services/${service}`,
    },
    openGraph: {
      title: data?.data?.meta_title,
      description: data?.data?.meta_description,
      url: `https://clinstitute.co.uk/consulting-services/${service}`,
      images: [
        {
          url: data?.data?.image || "/logobat.webp",
          width: 800,
          height: 600,
          alt: data?.data?.meta_title || "Course Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.data?.meta_title,
      description: data?.data?.meta_description,
      images: [data?.data?.image || "/logobat.webp"],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.BACKEND_URL}/consultations`, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,
    },
  }).then((res) => res.json());
  return posts.data.map((post) => ({
    id: post.id,
  }));
}

export default async function JobPosting() {
  const blogs = await fetch(`${process.env.BACKEND_URL}/blogs?per_page=5&page=1`, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,
    },
  }).then((res) => res.json());
  return (
    <><Design secondary={true}></Design><div className="max-w-6xl mx-auto py-6 ">
      <div className="bg-white shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="w-[300%] h-12 bg-primary md:-mx-12 -z-10" />
            {/*
              - w-[300%]: The line is significantly wider than the container,
                so its edges are more visible on the sides.
              - h-16: The line's thickness (4rem). Adjust as you like.
              - bg-primary: Tailwind color class (replace with your own color if needed).
            */}
          </div>
          
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row z-50">
          {/* Left Column */}
          <div className="flex-1 p-4 md:p-6 lg:border-r lg:border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold font-inter tracking-tight mb-4 text-primary">Management Course Trainer</h1>
            <p className="text-base text-gray-600 leading-relaxed font-inter">
              We are seeking a passionate and experienced Management Course Trainer to join our team and deliver
              high-quality training programs. In this role, you will develop and conduct engaging sessions, equipping
              learners with the skills and knowledge to excel in management roles. This position offers an opportunity
              to make a significant impact by shaping the leaders of tomorrow.
            </p>
          </div>

          {/* Right Column */}
          <div className="p-4 md:p-6 lg:w-96 flex flex-col justify-between z-50">
          <Apply/>
            <div className="space-y-3">
            
              <div className="flex items-center gap-3">
                <span className="font-medium min-w-[80px]">Salary:</span>
                <span className="text-gray-600">80,000 - 120,000</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium min-w-[80px]">Job Type:</span>
                <span className="text-gray-600">Full Time</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium min-w-[80px]">Team:</span>
                <span className="text-gray-600">30 - 50 people</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-500">⚡</span>
                <span className="text-gray-600">Remote / On-Site (Flexible)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="p-4 md:p-6 border-t border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold font-inter text-primary mb-4">Key Responsibilities:</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li className="leading-relaxed">Design, develop, and deliver interactive management training courses.</li>
            <li className="leading-relaxed">
              Assess learner needs and adapt training content to ensure relevance and impact.
            </li>
            <li className="leading-relaxed">
              Facilitate workshops, webinars, and in-person sessions for diverse audiences.
            </li>
            <li className="leading-relaxed">Evaluate learner performance and provide constructive feedback.</li>
            <li className="leading-relaxed">
              Stay updated on industry trends to incorporate the latest best practices into training.
            </li>
          </ul>
        </div>

        {/* Qualifications and Skills */}
        <div className="p-4 md:p-6 border-t border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold font-inter text-primary mb-4">Qualifications and Skills:</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li className="leading-relaxed">
              Proven experience as a trainer, facilitator, or educator in management or a related field.
            </li>
            <li className="leading-relaxed">
              Strong knowledge of management principles, leadership skills, and organisational strategies.
            </li>
            <li className="leading-relaxed">Exceptional communication, presentation, and interpersonal skills.</li>
            <li className="leading-relaxed">Ability to engage and motivate diverse groups of learners.</li>
            <li className="leading-relaxed">Relevant certifications (e.g., PMP, Leadership Training) are a plus.</li>
          </ul>
        </div>
      </div>
    </div>
            {/* Latest Blog Section */}
            <div className="flex justify-center">
          <h1 className="mt-10 mb-10 text-primary text-center flex justify-center text-3xl font-bold">
          Related Articles You May Find Interesting
          </h1>
        </div>


        <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Wrapper>
          <BlogCarousel data={blogs} />
          </Wrapper>
        </div>
    </>
  )
}

