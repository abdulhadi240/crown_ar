'use client';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import JobCard from '@/app/positions/components/JobCard';

const dummyJobData = [
  {
    slug: 1,
    title: "Software Engineer",
    salary: "$70,000 - $90,000",
    company: "Tech Corp",
    location: "New York, NY",
    type: "Full-Time",
  },
  {
    slug: 2,
    title: "Graphic Designer",
    salary: "$50,000 - $60,000",
    company: "Design Studio",
    location: "Los Angeles, CA",
    type: "Part-Time",
  },
  {
    slug: 3,
    title: "Project Manager",
    salary: "$80,000 - $100,000",
    company: "Business Solutions",
    location: "Remote",
    type: "Full-Time",
  },
  {
    slug: 4,
    title: "Data Analyst",
    salary: "$65,000 - $75,000",
    company: "Data Corp",
    location: "San Francisco, CA",
    type: "Full-Time",
  },
  {
    slug: 5,
    title: "HR Specialist",
    salary: "$55,000 - $65,000",
    company: "People First",
    location: "Chicago, IL",
    type: "Part-Time",
  },
  {
    slug: 6,
    title: "Marketing Specialist",
    salary: "$60,000 - $80,000",
    company: "AdWorks",
    location: "Austin, TX",
    type: "Full-Time",
  },
  {
    slug: 7,
    title: "DevOps Engineer",
    salary: "$90,000 - $110,000",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Full-Time",
  },
  {
    slug: 8,
    title: "UX/UI Designer",
    salary: "$70,000 - $85,000",
    company: "Design Studios",
    location: "Boston, MA",
    type: "Part-Time",
  },
];

// Dummy category data
const category = {
  data: [
    { name: "Technology", slug: "technology" },
    { name: "Design", slug: "design" },
    { name: "Marketing", slug: "marketing" },
    { name: "Human Resources", slug: "human-resources" },
    { name: "Management", slug: "management" },
  ],
};

const Filteration = () => {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filtered, setFiltered] = useState('');

  const handleSearch = () => {
    let filteredData = data.data;

    // Filter by title (case-insensitive partial match)
    if (title) {
      filteredData = filteredData.filter((service) =>
        service.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filteredData = filteredData.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Filter by month (assuming selectedMonth is in "YYYY-MM" format)
    if (selectedMonth) {
      const [selectedYear, selectedMonthNum] = selectedMonth.split('-');
      filteredData = filteredData.filter((service) => {
        const [serviceYear, serviceMonth] = service.consulting_date.split('-');
        return (
          serviceYear === selectedYear && serviceMonth === selectedMonthNum
        );
      });
    }

    console.log("Filtered Data:", filteredData); // Log to check the filtered data
    setFiltered(filteredData);
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto p-3 mb-8 bg-white shadow-xl rounded-lg">
        <div className='border-[1.5px] border-[#f5d273] p-2 rounded-lg'>
          <div className="grid items-center grid-cols-2 gap-4 sm:flex-row sm:flex bg-white">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Search Jobs"
              className="flex-1 p-3 text-sm border rounded-lg shadow-md"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 p-3 border rounded-lg shadow-md"
            >
              <option value="">Category</option>
              {category.data && category.data.length > 0 ? (
                category.data.map((cat, index) => (
                  <option key={index} value={cat.slug} className="text-black">
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </select>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="flex-1 p-3 text-sm border rounded-lg shadow-md"
            />
            <button
              onClick={handleSearch}
              className=" py-3 text-sm px-4 text-center items-center flex justify-center text-primary transition rounded-lg bg-[#f5d273] hover:bg-[#f5d273]/70"
            >
              <CiSearch size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-8 md:mx-28 max-w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {dummyJobData && dummyJobData.length > 0 ? (
          dummyJobData.map((service, index) => (
            <JobCard
            job={service}
            />
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default Filteration;
