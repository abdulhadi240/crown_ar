"use client";

import Courses_Card from "@/app/account/components/Courses_Card";
import Content_extend from "@/app/course_detail/components/Content_extend";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import HeaderSection from "./HeaderSection";
import Design from "@/app/homepage1/components/Design";
import CourseListing from "./ItemList";

const Programs = ({
  SpecializationCategory,
  params,
  data,
  category,
  city,
  specialization,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params;

  const [coursedata, setCourseData] = useState(data); // Full data
  const [filteredCourses, setFilteredCourses] = useState(data?.data || []); // Filtered data for rendering
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  ); // Search input
  const [selectedLanguage, setSelectedLanguage] = useState(
    searchParams.get("language") || ""
  );
  const [selectedMonth, setSelectedMonth] = useState(
    searchParams.get("month") || ""
  );
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || ""
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    searchParams.get("specialization") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") || ""
  );
  console.log(searchInput);

  // Update URL search params
  const updateSearchParams = (key, value) => {
    const currentParams = new URLSearchParams(searchParams);
    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      // Build query string dynamically, excluding empty parameters
      const params = {
        year: selectedYear,
        specialization: selectedSpecialization,
        category: selectedCategory,
        city: selectedCity,
        language: selectedLanguage,
        month: selectedMonth,
      };

      // Create query string by filtering out empty parameters
      const query = new URLSearchParams(
        Object.entries(params).filter(([_, value]) => value) // Only include keys with non-empty values
      ).toString();

      try {
        const response = await fetch(
          `https://backendbatd.clinstitute.co.uk/api/courses?${query}&program=${slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en",
            },
          }
        );
        const result = await response.json();
        setCourseData(result);
        setFilteredCourses(result?.data || []);
        console.log("Fetched Data:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    selectedYear,
    selectedSpecialization,
    selectedCategory,
    selectedCity,
    selectedLanguage,
    selectedMonth,
  ]);

  useEffect(() => {
    if (!searchInput) {
      setFilteredCourses(coursedata?.data || []); // Reset to full data if input is empty
    } else {
      const filtered = coursedata?.data?.filter((course) =>
        course.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchInput, coursedata]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const filtered = coursedata?.data?.filter((course) =>
        course.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  console.log("Filtered Courses:", filteredCourses);
  

  return (
    <>
      <Design
        icon_white
        iamge={"/image_consult.png"}
        center
        input={false}
        image_height={false}
        search_height={true}
      >
        <div className="relative flex items-center justify-center ">
          {/* Overlay Content */}
          <div className="relative flex flex-col items-center w-full max-w-4xl p-6  bg-opacity-90 rounded-lg  md:p-8">
            {/* Search Input */}
            <div className="w-full mb-4">
              <div className="flex items-center p-2 bg-white  rounded-md shadow-md md:p-3">
                <input
                  type="text"
                  placeholder="Search in specific course"
                  value={searchInput}
                  onKeyDown={handleSearch}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-grow px-4 py-2 text-sm rounded-md md:text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 ml-2 text-sm text-white transition-colors bg-primary rounded-md md:text-base md:px-6 md:py-2 hover:bg-primary/80"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  updateSearchParams("month", e.target.value);
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  updateSearchParams("year", e.target.value);
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Year</option>
                {[2024, 2025, 2026].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={selectedSpecialization}
                onChange={(e) => {
                  setSelectedSpecialization(e.target.value);
                  updateSearchParams("specialization", e.target.value);
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Specialization</option>
                {specialization?.data?.map((spec) => (
                  <option key={spec.id} value={spec.slug}>
                    {spec.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  updateSearchParams("category", e.target.value);
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Category</option>
                {category?.data?.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  updateSearchParams("city", e.target.value);
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">City</option>
                {city?.data?.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Design>

      <div className="mt-6">
        <CourseListing filteredCourses={filteredCourses} params={slug}/>
      </div>

    </>
  );
};

export default Programs;
