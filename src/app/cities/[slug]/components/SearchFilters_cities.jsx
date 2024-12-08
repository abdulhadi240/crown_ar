"use client";

import React, { useState } from "react";
import Card from "./Card";

const SearchFiltersCities = ({
  post,
  specialization,
  Category,
  params,
  search,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState(post);

  const handleSearch = () => {
    // Implement the search logic here
    const filteredData = post.data.filter((course) => {
      const matchesSearchTerm = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSpecialization = selectedSpecialization
        ? course.specialization === selectedSpecialization
        : true;
      const matchesCategory = selectedCategory
        ? course.category === selectedCategory
        : true;
      return matchesSearchTerm && matchesSpecialization && matchesCategory;
    });

    setData({ ...post, data: filteredData });

    console.log("Search Term:", searchTerm);
    console.log("Selected Specialization:", selectedSpecialization);
    console.log("Selected Category:", selectedCategory);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="md:w-[715px] md:flex shadow-lg mb-20 p-6 md:p-0 rounded-xl">
          {search && (
            <>
              <div className="flex justify-center">
                <div className="grid items-center justify-center grid-cols-1 gap-4 p-3 sm:grid-cols-2 md:flex md:gap-4 md:p-4 rounded-xl">
                  {/* Search Input */}
                  <input
                    className="flex justify-center p-2 text-sm bg-[#eaeaea] border rounded-lg placeholder:text-xs text-black/70 max-w-64"
                    placeholder="Search Specific Course"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />

                  {/* Specialization Dropdown */}
                  <select
                    className="flex justify-center p-2 text-sm bg-[#eaeaea] border rounded-lg text-black/70 max-w-64"
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="">Select Specialization</option>
                    {specialization?.data.map(
                      (data, index) =>
                        index > 0 && (
                          <option key={data.id} value={data.name}>
                            {data.name}
                          </option>
                        )
                    )}
                  </select>

                  {/* Manager Dropdown */}
                  <select
                    className="flex justify-center p-2 text-sm bg-[#eaeaea] border rounded-lg text-black/70 max-w-64"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="">Select Category</option>
                    {Category?.map(
                      (data, index) =>
                        index > 0 && (
                          <option key={data.id} value={data.name}>
                            {data.name}
                          </option>
                        )
                    )}
                  </select>
                </div>
              </div>
              <div className="flex justify-center md:items-center md:mt-0">
                <button
                  className="items-center px-20 py-2 text-sm text-white transition-all duration-300 ease-in-out rounded-lg md:px-8 bg-primary hover:bg-primary-dark"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-16 md:mx-4 sm:grid-cols-2">
          {data?.data?.length > 0 ? (
            data?.data?.map((course) => (
              <Card
                key={course.id}
                city={search}
                link={course.slug}
                params={params}
                image={course.image}
                title={course.title}
                paragraph={course.meta_description}
                country={course.available_cities}
              />
            ))
          ) : (
            <h1 className="flex mb-20 overflow-hidden justify-center font-bold text-xl text-center w-screen">
              No Courses Found
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchFiltersCities;
