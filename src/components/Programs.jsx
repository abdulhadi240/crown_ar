"use client";

import Courses_Card from '@/app/account/components/Courses_Card';
import Content_extend from '@/app/course_detail/components/Content_extend';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Programs = ({ SpecializationCategory, params, data, category, city, specialization }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params
  
  const [coursedata, setCourseData] = useState(data); // Full data
  const [filteredCourses, setFilteredCourses] = useState(data?.data || []); // Filtered data for rendering
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || ''); // Search input
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get('language') || '');
  const [selectedMonth, setSelectedMonth] = useState(searchParams.get('month') || '');
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '');
  const [selectedSpecialization, setSelectedSpecialization] = useState(searchParams.get('specialization') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  console.log(searchInput);
  
  // Update URL search params
  const updateSearchParams = (key, value) => {
    const currentParams = new URLSearchParams(searchParams);
    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
    router.push(`?${currentParams.toString()}`, { scroll: false })
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
          `https://backendbatd.clinstitute.co.uk/api/courses?${query}&program=${slug}`,{
            headers:{
              'Content-Type': 'application/json',
              "Accept-Language": "en",
            }
          }
        );
        const result = await response.json();
        setCourseData(result)
        setFilteredCourses(result?.data || []);
        console.log('Fetched Data:', result);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    if (e.key === 'Enter') {
      const filtered = coursedata?.data?.filter((course) =>
        course.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <div>
      <div className="relative flex items-center justify-center min-h-screen bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/search_course.webp" // Replace with your image path
            alt="Background"
            layout="fill"
            priority
            objectFit="cover"
            className="opacity-70"
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute flex items-center justify-center w-full max-w-4xl p-6 rounded-lg">
          <div className="flex flex-col justify-center gap-2 text-black bg-transparent">
            {/* Non-functional Search Input */}
            <div className="flex justify-between p-1 bg-white rounded-md md:p-3">
            <input
                type="text"
                placeholder="Search in specific course"
                value={searchInput}
                onKeyDown={handleSearch}
                onChange={(e) => setSearchInput(e.target.value)} // Update search input state
                className="w-full px-4 py-2 text-sm rounded-md md:text-base placeholder:text-sm md:flex-1 focus:outline-none focus:ring-0"
              />
              <button
                onClick={handleSearch} // Trigger search on click
                className="px-4 py-1 text-sm text-white transition-colors rounded-md md:text-base md:px-6 md:py-2 bg-primary hover:bg-primary/80"
              >
                Search
              </button>
              
            </div>
            <div className="flex justify-center gap-2">
              {/* Dropdowns */}
              <div className="grid justify-center grid-cols-2 gap-2 md:space-y-0 md:flex md:space-x-2">
                
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    updateSearchParams('month', e.target.value);
                  }}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Month</option>
                  {[
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
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
                    updateSearchParams('year', e.target.value);
                  }}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
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
                    updateSearchParams('specialization', e.target.value);
                  }}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
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
                    updateSearchParams('category', e.target.value);
                  }}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
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
                    updateSearchParams('city', e.target.value);
                  }}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md md:text-base md:px-4 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
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
        </div>
      </div>
      <Content_extend categories={SpecializationCategory.data} params={slug}>
        <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2 md:grid-cols-3 ">
          {filteredCourses?.map((course) => (
            <Courses_Card data={course} params={params} key={course.id} />
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <h1 className="flex items-center justify-center p-1 text-2xl font-bold text-center md:p-0">
            Mini Masters Programmes In Management
          </h1>
          <p className="mb-4 text-base text-center md:text-start">
            We offer different short and mini master courses across (Non-Academic) our branches in Europe. Course will help you improve your professional experience and give you more support to your CV.
          </p>
        </div>
      </Content_extend>
    </div>
  );
};

export default Programs;
