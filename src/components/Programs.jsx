"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Design from "@/app/homepage1/components/Design";
import CourseListing from "./ItemList";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import SectionTitle1 from "./SectionTitle1";
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
  const slug = decodeURIComponent(params);

  const [coursedata, setCourseData] = useState(data); // Full data
  const [filteredCourses, setFilteredCourses] = useState(data?.data || []); // Filtered data for rendering
  const [page, setPage] = useState(1);
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
          `https://backendbatd.clinstitute.co.uk/api/courses?${query}&program=${slug}&per_page=10&page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "ar",
            },
          }
        );
        const result = await response.json();
        setCourseData(result);
        setFilteredCourses(result?.data || []);
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
    page,
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

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": (filteredCourses || []).map((course, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Course",
            "name": course?.title || "دورة غير مسماة", // Unnamed Course
            "description": course?.summary || "لا يوجد وصف متاح.", // No description available
            "url": `https://clinstitute.co.uk/${params || "default-category"}/${(course?.available_cities?.[0]?.slug) || "default-city"}/${course?.slug || "default-course"}`,
            "provider": {
                "@type": "Organization",
                "name": "أكاديمية تاج", // Crown Academy
                "sameAs": "https://clinstitute.co.uk/"
            },
            "image": {
                "@type": "ImageObject",
                "url": course?.image || "https://clinstitute.co.uk/default-course-image.webp"
            },
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "في الموقع", // Onsite (You can choose a more specific translation)
                "courseWorkload": "PT22H", // ISO 8601 duration - generally kept as is
                "courseSchedule": {
                    "@type": "Schedule",
                    "duration": "P1W", // ISO 8601 duration - generally kept as is
                    "repeatCount": "1",  // ISO 8601 duration - generally kept as is
                    "repeatFrequency": "أسبوعيًا" // Weekly
                },
                "location": {
                    "@type": "Place",
                    "name": course?.available_cities?.length > 0
                        ? course?.available_cities.map(city => city.name).join(", ") // City names should already be in the correct language
                        : "مدينة افتراضية" // Default City
                }
            },
            "offers": {
                "@type": "Offer",
                "category": "مدفوعة", // Paid
                "price": course?.price || "1200.00", // Numbers are generally kept as is
                "priceCurrency": "GBP", // Currency codes are standard
                "availability": "https://schema.org/InStock", // Schema.org values are generally kept as is
                "validFrom": (course?.available_dates?.length > 0 && course?.available_dates[0]?.date) || "2025-01-01" // Date format is generally kept as is
            }
        }
    }))
  };
  
  console.log(slug)

  return (
    <>
      {/* Inject JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <Design
        icon_white
        iamge={"/image_consult.png"}
        center
        input={false}
        image_height={false}
        search_height={true}
        search
        
      >
      <div className="-mt-16 md:-mt-0">
      <div className="pt-3">
        <SectionTitle1 title="الدورات بواسطة" highlight={slug}/>
</div>
        <div className="relative flex items-center justify-center" dir="rtl"> {/* RTL for the container */}
    <div className="relative flex flex-col items-center w-full max-w-4xl p-6 bg-opacity-90 rounded-lg md:p-8" dir="rtl"> {/* RTL for the content div */}
        <div className="w-full mb-4">
            <div className="flex items-center p-2 bg-white rounded-md shadow-md md:p-3" dir="rtl"> {/* RTL for the search input area */}
                <input
                    type="text"
                    placeholder="ابحث في دورة محددة" // Search in specific course
                    value={searchInput}
                    onKeyDown={handleSearch}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-grow text-primary px-4 py-2 text-sm rounded-md md:text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    dir="rtl" // RTL for the input
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 ml-2 text-sm text-white transition-colors bg-primary rounded-md md:text-base md:px-6 md:py-2 hover:bg-primary/80"
                >
                    بحث
                </button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full" dir="rtl"> {/* RTL for the dropdown container */}
            <select
                value={selectedMonth}
                onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    updateSearchParams("month", e.target.value);
                }}
                className="w-full px-4 py-2 text-primary text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                dir="rtl" // RTL for the select
            >
                <option value="">شهر</option>
                {[
                    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
                    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                ].map((month, index) => (
                    <option key={index} value={index + 1} dir="rtl"> {/* RTL for each option */}
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
                className="w-full px-4 py-2 text-primary text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                dir="rtl" // RTL for the select
            >
                <option value="">عام</option>
                {[2024, 2025, 2026].map((year) => (
                    <option key={year} value={year} dir="rtl"> {/* RTL for each option */}
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
                className="w-full px-4 py-2 text-primary text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                dir="rtl" // RTL for the select
            >
                <option value="">تخصص</option>
                {specialization?.data?.map((spec) => (
                    <option key={spec.id} value={spec.slug} dir="rtl"> {/* RTL for each option */}
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
                className="w-full px-4 py-2 text-primary text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                dir="rtl" // RTL for the select
            >
                <option value="">فئة</option>
                {category?.data?.map((cat) => (
                    <option key={cat.id} value={cat.slug} dir="rtl"> {/* RTL for each option */}
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
                className="w-full px-4 py-2 text-primary text-sm border border-gray-300 rounded-md md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                dir="rtl" // RTL for the select
            >
                <option value="">مدينة</option>
                {city?.data?.map((c) => (
                    <option key={c.id} value={c.slug} dir="rtl"> {/* RTL for each option */}
                        {c.name}
                    </option>
                ))}
            </select>
        </div>
    </div>
</div>
        </div>
      </Design>

      <div className="mt-6">
        <CourseListing filteredCourses={filteredCourses} params={slug} />
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {/* Previous Button */}
        <motion.button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`w-9 h-9 flex items-center justify-center rounded-md text-base ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          whileHover={{ scale: page === 1 ? 1 : 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoIosArrowBack className="text-lg" />
        </motion.button>

        {/* Page Buttons */}
        {coursedata?.pagination?.total_pages > 1 &&
          (() => {
            let firstPage =
              page === coursedata.pagination.total_pages ? page - 1 : page;
            let secondPage =
              firstPage + 1 > coursedata.pagination.total_pages
                ? coursedata.pagination.total_pages
                : firstPage + 1;

            return [firstPage, secondPage].map((pageNumber) => (
              <motion.button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-base  ${
                  pageNumber === page
                    ? "bg-primary text-white"
                    : "bg-gray-400 text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {pageNumber}
              </motion.button>
            ));
          })()}

        {/* Next Button */}
        <motion.button
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, coursedata?.pagination?.total_pages)
            )
          }
          disabled={page === coursedata?.pagination?.total_pages}
          className={`w-9 h-9 flex items-center justify-center rounded-md text-base ${
            page === coursedata?.pagination?.total_pages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          whileHover={{
            scale: page === coursedata?.pagination?.total_pages ? 1 : 1.1,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <IoIosArrowForward className="text-base" />
        </motion.button>
      </div>
      <main className="min-h-screen bg-white p-6 md:p-12 text-sm" dir="rtl"> {/* RTL for the main container */}
    <article className="text-start max-w-4xl" dir="rtl"> {/* RTL and text-end for the article */}
        {/* Header */}
        <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl" dir="rtl">
            إتقان مراحل المشروع: دورة تدريبية شاملة  {/* Mastering the Project Stages: A Comprehensive Training Course */}
        </h1>

        {/* Introduction */}
        <p className="mb-8 text-gray-700" dir="rtl">
            تتطلب إدارة المشاريع بنجاح فهمًا عميقًا لدورة حياة المشروع والمهارات اللازمة للتنقل في كل مرحلة بفعالية. تم تصميم دورتنا التدريبية حول مراحل المشروع لتزويدك بالمعرفة والأدوات اللازمة للتفوق في كل مرحلة من مراحل إدارة المشروع، من البدء إلى الإغلاق. {/* Managing projects successfully... */}
        </p>

        {/* Course Content */}
        <section dir="rtl"> {/* RTL for the section */}
            <h2 className="mb-4 text-xl font-semibold text-gray-900" dir="rtl">
                ماذا تغطي الدورة؟ {/* What Does the Course Cover? */}
            </h2>
            <p className="mb-6 text-gray-700" dir="rtl">
                تتخذ هذه الدورة نهجًا منظمًا للمراحل الرئيسية لإدارة المشروع: {/* This course takes a structured approach... */}
            </p>

            <div className="space-y-6" dir="rtl"> {/* RTL for the container of the stages */}
                {/* Initiation */}
                <section dir="rtl"> {/* RTL for each stage section */}
                    <h3 className="mb-2 font-semibold text-gray-900" dir="rtl">
                        1. البدء: {/* 1. Initiation: */}
                    </h3>
                    <ul className="mr-6 list-disc space-y-2 text-gray-700" dir="rtl"> {/* Use mr-6 for RTL lists */}
                        <li dir="rtl">
                            تعلم كيفية تحديد نطاق المشروع وأهدافه وتسليماته. {/* Learn how to define... */}
                        </li>
                        <li dir="rtl">
                            طور مهارات تحديد أصحاب المصلحة الرئيسيين وإنشاء ميثاق المشروع. {/* Develop skills to identify... */}
                        </li>
                        <li dir="rtl">
                            اكتسب رؤى حول تحليل الجدوى وتحديد المخاطر. {/* Gain insights into feasibility analysis... */}
                        </li>
                    </ul>
                </section>

                {/* Planning */}
                <section dir="rtl"> {/* RTL for each stage section */}
                    <h3 className="mb-2 font-semibold text-gray-900" dir="rtl">
                        2. التخطيط: {/* 2. Planning: */}
                    </h3>
                    <ul className="mr-6 list-disc space-y-2 text-gray-700" dir="rtl"> {/* Use mr-6 for RTL lists */}
                        <li dir="rtl">
                            أتقن فن إنشاء خطط وجداول زمنية وميزانيات مفصلة للمشروع. {/* Master the art of creating... */}
                        </li>
                        <li dir="rtl">
                            فهم تخصيص الموارد وتعلم كيفية وضع خطة قوية لإدارة المخاطر. {/* Understand resource allocation... */}
                        </li>
                        <li dir="rtl">
                            استكشف الأدوات والتقنيات لتحديد المعالم ومقاييس الأداء. {/* Explore tools and techniques... */}
                        </li>
                    </ul>
                </section>

                {/* Execution */}
                <section dir="rtl"> {/* RTL for each stage section */}
                    <h3 className="mb-2 font-semibold text-gray-900" dir="rtl">
                        3. التنفيذ: {/* 3. Execution: */}
                    </h3>
                    <ul className="mr-6 list-disc space-y-2 text-gray-700" dir="rtl"> {/* Use mr-6 for RTL lists */}
                        <li dir="rtl">
                            اكتشف كيفية تنفيذ خطط المشروع بفعالية مع إدارة الموارد. {/* Discover how to implement... */}
                        </li>
                        <li dir="rtl">
                            تعلم إدارة الفريق وتفويض المهام واستراتيجيات حل النزاعات. {/* Learn team management... */}
                        </li>
                        <li dir="rtl">
                            فهم كيفية تتبع التقدم باستخدام برامج إدارة المشاريع. {/* Understand how to track progress... */}
                        </li>
                    </ul>
                </section>

                {/* Monitoring and Controlling */}
                <section dir="rtl"> {/* RTL for each stage section */}
                    <h3 className="mb-2 font-semibold text-gray-900" dir="rtl">
                        4. المراقبة والتحكم: {/* 4. Monitoring and Controlling: */}
                    </h3>
                    <ul className="mr-6 list-disc space-y-2 text-gray-700" dir="rtl"> {/* Use mr-6 for RTL lists */}
                        <li dir="rtl">
                            استكشف تقنيات لتتبع الأداء وإجراء تعديلات في الوقت الفعلي. {/* Explore techniques for tracking... */}
                        </li>
                        <li dir="rtl">
                            تعلم كيفية إدارة طلبات التغيير وضمان مراقبة الجودة والحفاظ على التوافق مع أهداف المشروع. {/* Learn how to manage... */}
                        </li>
                        <li dir="rtl">
                            اكتسب رؤى حول أدوات إعداد التقارير لإطلاع أصحاب المصلحة. {/* Gain insights into reporting tools... */}
                        </li>
                    </ul>
                </section>

                {/* Closure */}
                <section dir="rtl"> {/* RTL for each stage section */}
                    <h3 className="mb-2 font-semibold text-gray-900" dir="rtl">
                        5. الإغلاق: {/* 5. Closure: */}
                    </h3>
                    <ul className="mr-6 list-disc space-y-2 text-gray-700" dir="rtl"> {/* Use mr-6 for RTL lists */}
                        <li dir="rtl">
                            فهم أهمية الإغلاق المناسب للمشروع، بما في ذلك تسليم النتائج والوثائق النهائية. {/* Understand the importance of... */}
                        </li>
                        <li dir="rtl">
                            تعلم كيفية إجراء تقييمات ما بعد المشروع لتحديد النجاحات والدروس المستفادة. {/* Learn how to conduct... */}
                        </li>
                        <li dir="rtl">
                            استكشف أفضل الممارسات للاحتفال بالإنجازات وحل فرق المشروع. {/* Explore best practices... */}
                        </li>
                    </ul>
                </section>
            </div>
        </section>
    </article>
</main>
    </>
  );
};

export default Programs;
