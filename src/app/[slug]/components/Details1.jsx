"use client";

import Link from "next/link";
import React, { useState } from "react";

const Details1 = ({ course }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [customDate, setCustomDate] = useState("");
  console.log(course , "course")
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const handleCustomDateChange = (e) => {
    setCustomDate(e.target.value);
  };

  const getRegisterLink = () => {
    if (selectedDate || selectedCity) {
      return `/register?course=${course.slug}&date=${selectedDate}&city=${selectedCity}`;
    }
    return `/register?course=${course.slug}`;
  };

  return (
    <div className="md:mx-10 mx-2">
      {/* Sticky Title and Register Button */}
      <div className="md:mx-10 mx-2 flex gap-10">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col gap-10 p-3">
            {/* Tables for Dates and Cities */}
            <div className="flex flex-col gap-6 mt-6 border-[2px] shadow-lg p-6 rounded-xl">
              {/* Dates Table */}
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">
                  Available Dates
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-left text-sm">
                    <tbody>
                      {course?.available_dates.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b">
                            <div
                              className={`w-5 h-5 border-2 rounded-md cursor-pointer flex items-center justify-center ${
                                selectedDate === item.date
                                  ? "bg-primary"
                                  : "bg-white"
                              }`}
                              onClick={() => handleDateChange(item.date)}
                            >
                              {selectedDate === item.date && (
                                <span className="text-white text-sm font-bold">
                                  ✔
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2 border-b">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Custom Date Selector */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-primary mb-4">
                  Custom Date Selection
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <input
                      id="custom-date"
                      type="date"
                      className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                      value={customDate}
                      onChange={handleCustomDateChange}
                    />
                  </div>
                  {customDate && (
                    <p className="text-sm text-secondary mt-2">
                      Selected custom date: <strong>{customDate}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Cities Table */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-primary mb-4">
                  Available Cities
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-left text-sm">
                    <tbody>
                      {course?.available_cities.map((city, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b">
                            <div
                              className={`w-5 h-5 border-2 rounded-md cursor-pointer flex items-center justify-center ${
                                selectedCity === city.slug
                                  ? "bg-primary"
                                  : "bg-white"
                              }`}
                              onClick={() => handleCityChange(city.slug)}
                            >
                              {selectedCity === city.slug && (
                                <span className="text-white text-sm font-bold">
                                  ✔
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2 border-b">{city.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Price Section Below Cities */}
                <div className="mt-4">
                  <h3 className="text-lg my-6 font-bold text-primary mb-2">
                    Price
                  </h3>
                  ${course.price}
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="flex flex-col gap-3 summary mt-10">
              <h1 className="py-2 text-2xl font-bold text-left text-primary">
                Summary
              </h1>
              <div className="w-full h-[1px] bg-secondary" />
              <p
                className="w-full py-2 text-base text-left text-black/60"
                dangerouslySetInnerHTML={{ __html: course?.summary }}
              ></p>
            </div>

            {/* Objectives Section */}
            <div className="">
              <h1 className="py-2 text-2xl font-bold text-left text-primary">
                Objectives and Target Group
              </h1>
              <div className="w-full h-[1px] bg-secondary" />

              <p
                className="w-full py-2 text-base text-left text-black/60"
                dangerouslySetInnerHTML={{ __html: course?.objectives }}
              ></p>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-3 content">
              <h1 className="py-2 text-2xl font-bold text-left text-primary">
                Course Content
              </h1>
              <div className="w-full h-[1px] bg-secondary" />
              <p
                className="w-full py-2 text-base text-left text-black/60"
                dangerouslySetInnerHTML={{ __html: course?.content }}
              ></p>
            </div>
          </div>
        </div>

        <div className="sticky top-24 w-[350px] h-[390px] p-5 bg-white border border-gray-300 rounded-lg shadow-md transition-all duration-300">
          <h1 className="text-xl font-semibold text-gray-800">
            {course.title}
          </h1>

          {/* Language */}
          <div className="mt-4 flex justify-between">
            <h3 className="text-md font-medium text-primary">Language</h3>
            <p className="text-sm text-gray-600">
              {course.language || "English / Arabic"}
            </p>
          </div>

          {/* Certificate */}
          <div className="mt-4 flex justify-between">
            <h3 className="text-md font-medium text-primary">Certificate</h3>
            <p className="text-sm text-gray-600">
              {course.certificate ? "Certificate Provided" : "No Certificate"}
            </p>
          </div>

          {/* Date */}
          <div className="mt-4 flex justify-between">
            <h3 className="text-md font-medium text-primary">Date</h3>
            <p className="text-sm text-gray-600">
              {selectedDate || customDate || "Select a Date"}
            </p>
          </div>

          {/* City */}
          <div className="mt-4 flex justify-between">
            <h3 className="text-md font-medium text-primary">City</h3>
            <p className="text-sm text-gray-600">
              {selectedCity || "Select a City"}
            </p>
          </div>

          {/* Price */}
          <div className="mt-4 flex justify-between">
            <h3 className="text-md font-medium text-primary">Price</h3>
            <p className="text-lg font-semibold text-gray-900">
              ${course.price}
            </p>
          </div>

          {/* Register Button */}
          <Link
            href={getRegisterLink()}
            className="mt-5 block w-full bg-secondary hover:bg-primary-dark text-white text-center py-2 rounded-lg font-medium transition-all duration-300 shadow-md"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details1;
