"use client";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation"; // Ensure correct import

export default function SearchForm({ cities, specialization }) {
  const router = useRouter(); // Router instance for navigation

  // State for search fields
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("arabic");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  // List of months in Arabic
  const months = [
    { name: "يناير", value: "1" },
    { name: "فبراير", value: "2" },
    { name: "مارس", value: "3" },
    { name: "أبريل", value: "4" },
    { name: "مايو", value: "5" },
    { name: "يونيو", value: "6" },
    { name: "يوليو", value: "7" },
    { name: "أغسطس", value: "8" },
    { name: "سبتمبر", value: "9" },
    { name: "أكتوبر", value: "10" },
    { name: "نوفمبر", value: "11" },
    { name: "ديسمبر", value: "12" },
  ];

  // Handle search button click
  const handleSearch = () => {
    // Construct query parameters
    const queryParams = new URLSearchParams({
      month: selectedMonth,
      specialization: selectedSpecialization,
      city: selectedCity,
      language: selectedLanguage,
    });

    // Include search keyword if provided
    if (searchQuery.trim() !== "") {
      queryParams.append("search", searchQuery);
    }

    // Redirect to /diploma with query parameters
    router.push(`/diploma?${queryParams.toString()}`);
  };

  return (
    <div className="absolute mt-10 md:-bottom-56 md:left-20 md:w-[500px] w-full bg-white rounded-lg shadow-2xl p-6 border border-gray-300 text-right">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 border border-[#E5C17C] rounded-lg md:px-4 px-2 md:py-3 w-full">
        <input
          type="text"
          placeholder="ابحث في الدورة التدريبية"
          value={searchQuery} // Binds input to state
          onChange={(e) => setSearchQuery(e.target.value)} // Updates state on change
          className="w-full bg-gray-100 text-primary placeholder-gray-400 focus:outline-none text-base text-right"
        />
        <button
          onClick={handleSearch}
          className="p-2 text-[#E5C17C] cursor-pointer hover:bg-secondary hover:text-white transition-all rounded-full"
        >
          <AiOutlineSearch className="" size={26} />
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-2 gap-4 mt-4 w-full">
        {/* Specialization Dropdown */}
        <select
          className="w-full p-3 bg-white border border-[#E5C17C] rounded-lg text-gray-700 text-sm md:text-base focus:outline-none text-right"
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
        >
          <option value="Specialization" className="text-sm">
            اختر التخصص
          </option>
          {specialization?.map((spec) => (
            <option key={spec.slug} value={spec.slug} className="text-sm">
              {spec.name}
            </option>
          ))}
        </select>

        {/* Language Dropdown */}
        <select
          className="w-full p-3 bg-white border border-[#E5C17C] rounded-lg text-sm text-gray-700 md:text-base focus:outline-none text-right"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="arabic">العربية</option>
          <option value="english">الإنجليزية</option>
        </select>

        {/* City Dropdown */}
        <select
          className="w-full p-3 bg-white border border-[#E5C17C] rounded-lg text-sm text-gray-700 md:text-base focus:outline-none text-right"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="" className="text-sm">
            اختر المدينة
          </option>
          {cities?.map((city) => (
            <option key={city.slug} value={city.slug}>
              {city.name}
            </option>
          ))}
        </select>

        {/* Month Dropdown */}
        <select
          className="w-full p-3 bg-white border border-[#E5C17C] rounded-lg text-sm text-gray-700 md:text-base focus:outline-none text-right"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="" className="text-sm">
            اختر الشهر
          </option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
