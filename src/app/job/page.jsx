
import React from "react";
import HeaderSearch from "./components/HeaderSearch";
import StatsSection from "./components/StatsSection";
import JobCard from "./components/JobCard";
import HeaderSection from "@/components/HeaderSection";

const page = () => {
  const jobs = [
    {
      title: "Senior UX Designer",
      type: "Full-Time",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },
    {
      title: "Technical Support Specialist",
      type: "Part-Time",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },
    {
      title: "Senior UX Designer",
      type: "Internship",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },
    {
      title: "Technical Support Specialist",
      type: "Part-Time",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },
    {
      title: "Senior UX Designer",
      type: "Full-Time",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },{
      title: "Technical Support Specialist",
      type: "Internship",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },
    {
      title: "Senior UX Designer",
      type: "Full-Time",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },{
      title: "Technical Support Specialist",
      type: "Part-Time",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },
    {
      title: "Senior UX Designer",
      type: "Internship",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },{
      title: "Technical Support Specialist",
      type: "Part-Time",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },
    {
      title: "Senior UX Designer",
      type: "Internship",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      location: "Dhaka, Bangladesh",
    },
    // Add more jobs here
  ];
  return (
    <div>
      <HeaderSection/>
      <div className="container mx-auto md:p-4">
        <HeaderSearch />
        <div className="flex items-center justify-between mt-8 ml-2">
          <h2 className="text-2xl font-bold">Job Listings</h2>
          <button className="px-6 py-2 mr-2 text-white rounded-md bg-primary">
            Filters
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 mx-5 mt-6 md:mx-10 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
