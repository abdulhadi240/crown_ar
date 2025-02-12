"use client";

import Link from "next/link";
import React, { useState } from "react";

const Details1 = ({ course }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [customDate, setCustomDate] = useState("");
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

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course?.title || "دورة غير مسماة",
    "description": course?.summary || "لا يوجد وصف متاح.",
    "educationalCredentialAwarded": course?.category || "الهندسة", // استخدم هذا الحقل لفئة الدورة أو الشهادة التعليمية
    "provider": {
      "@type": "Organization",
      "name": "أكاديمية كراون",
      "sameAs": "https://clinstitute.co.uk/"
    },
    "image": {
      "@type": "ImageObject",
      "url": course?.image || "https://clinstitute.co.uk/default-course-image.webp"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "حضوري",
      "courseWorkload": "PT22H",
      "courseSchedule": {
        "@type": "Schedule",
        "duration": "P1W",
        "repeatCount": "1",
        "repeatFrequency": "أسبوعي",
        "startDate": (course?.available_dates?.length > 0 && course?.available_dates[0]?.date) || "2025-01-01",
        "endDate": (course?.available_dates?.length > 1 && course?.available_dates[1]?.date) || (course?.available_dates?.length > 0 && course?.available_dates[0]?.date) || "2025-01-07"
      },
      "location": {
        "@type": "Place",
        "name": course?.available_cities?.length > 0 
          ? course?.available_cities.map(city => city.name).join(", ") 
          : "المدينة الافتراضية",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": (course?.available_cities?.length > 0 && course?.available_cities[0]?.name) || "موقع غير معروف"
        }
      }
    },
    "offers": {
      "@type": "Offer",
      "category": "مدفوع",
      "price": course?.price || "3200.00",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "validFrom": (course?.available_dates?.length > 0 && course?.available_dates[0]?.date) || "2025-01-01"
    },
    "review": {
      "@type": "Review",
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": "المشرف"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.6"
      }
    }
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="md:mx-10 mx-2">
        {/* Sticky Title and Register Button */}
        <div className="sticky md:hidden top-0 bg-white">
          <div className="flex justify-between mt-6">
            <h2 className="text-lg w-56 text-gray-900 mt-1 font-medium ">
              {course.title}
            </h2>
            <Link
              href={getRegisterLink()}
              className="bg-secondary text-white text-sm items-center flex justify-center px-4 h-10 mt-2  rounded-lg"
            >
              يسجل
            </Link>
          </div>
          <div className="h-[1px] bg-secondary w-full my-2" />
        </div>
        <div className="md:mx-10 mx-2 flex gap-10">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col gap-10 p-3">
              {/* Tables for Dates and Cities */}
              <div className="flex flex-col gap-6 mt-6 border-[2px] shadow-lg p-6 rounded-xl">
                {/* Dates Table */}
                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">
                  التواريخ المتاحة
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
                            <td className="px-4 py-2 border-b text-primary">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Custom Date Selector */}
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-primary mb-4">
                  اختيار التاريخ المخصص
                  </h2>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <input
                        id="custom-date"
                        type="date"
                        className="block w-full text-primary px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                        value={customDate}
                        onChange={handleCustomDateChange}
                      />
                    </div>
                    {customDate && (
                      <p className="text-sm text-secondary mt-2">
                      التاريخ المخصص المحدد: <strong>{customDate}</strong>
                      </p>
                    )}
                  </div>
                </div>

                {/* Cities Table */}
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-primary mb-4">
                  المدن المتاحة
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
                            <td className="px-4 py-2 border-b text-primary">{city.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Price Section Below Cities */}
                  <div className="mt-4">
                    <h3 className="text-base my-6 font-bold text-primary mb-2">
                    سعر
                    </h3>
                    <p className="text-base text-primary">${course.price}</p>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="flex flex-col gap-3 summary mt-10">
                <h1 className="py-2 text-2xl font-bold text-right text-primary">
                ملخص
                </h1>
                <div className="w-full h-[1px] bg-secondary" />
                <p
                  className="w-full py-2 text-base text-right text-black/60"
                  dangerouslySetInnerHTML={{ __html: course?.summary }}
                ></p>
              </div>

              {/* Objectives Section */}
              <div className="">
                <h1 className="py-2 text-2xl font-bold text-right text-primary">
                الأهداف والمجموعة المستهدفة
                </h1>
                <div className="w-full h-[1px] bg-secondary" />

                <p
                  className="w-full py-2 text-base text-right text-black/60"
                  dangerouslySetInnerHTML={{ __html: course?.objectives }}
                ></p>
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-3 content">
                <h1 className="py-2 text-2xl font-bold text-right text-primary">
                محتوى الدورة
                </h1>
                <div className="w-full h-[1px] bg-secondary" />
                <p
                  className="w-full py-2 text-base text-right text-black/60"
                  dangerouslySetInnerHTML={{ __html: course?.content }}
                ></p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="md:sticky md:text-base md:top-24 md:w-[350px] md:h-auto md:p-5 bg-white border border-gray-300 md:rounded-lg md:shadow-md transition-all md:duration-300">
              <h1 className="text-xl font-semibold text-gray-800">
                {course.title}
              </h1>

              {/* Language */}
              <div className="mt-4 flex justify-between">
                <h3 className="text-md font-medium text-primary">لغة</h3>
                <p className="text-sm text-gray-600">
                  {course.language || "الإنجليزية / العربية"}
                </p>
              </div>

              {/* Certificate */}
              <div className="mt-4 flex justify-between">
                <h3 className="text-md font-medium text-primary">
                شهادة
                </h3>
                <p className="text-sm text-gray-600">
                  {course.certificate
                    ? "الشهادة المقدمة"
                    : "لا شهادة"}
                </p>
              </div>

              {/* Date */}
              <div className="mt-4 flex justify-between">
                <h3 className="text-md font-medium text-primary">تاريخ</h3>
                <p className="text-sm text-gray-600">
                  {selectedDate || customDate || "حدد التاريخ"}
                </p>
              </div>

              {/* City */}
              <div className="mt-4 flex justify-between">
                <h3 className="text-md font-medium text-primary">مدينة</h3>
                <p className="text-sm text-gray-600">
                  {selectedCity || "اختر مدينة"}
                </p>
              </div>

              {/* Price */}
              <div className="mt-4 flex justify-between">
                <h3 className="text-md font-medium text-primary">سعر</h3>
                <p className="text-lg font-semibold text-gray-900">
                  ${course.price}
                </p>
              </div>

              {/* Register Button */}
              <Link
                href={getRegisterLink()}
                className="mt-5 block w-full bg-secondary hover:bg-primary-dark text-white text-center py-2 rounded-lg font-medium transition-all duration-300 shadow-md"
              >
                سجل الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details1;
