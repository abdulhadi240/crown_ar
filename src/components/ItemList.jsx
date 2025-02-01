'use client'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function CourseListing({ filteredCourses , params , cities , cities_}) {
    const [selectedOptions, setSelectedOptions] = useState(
        filteredCourses
          ? filteredCourses.map((course) => ({
              courseId: course.id,
              selectedDate: "",
              selectedCity: "",
            }))
          : []
      );

  const handleSelectChange = (courseId, type, value) => {
    setSelectedOptions((prev) =>
      prev.map((option) =>
        option.courseId === courseId
          ? { ...option, [type]: value }
          : option
      )
    );
  };

  return (
    <><Card className="w-full max-w-6xl mx-auto shadow-md rounded-lg">
          <CardContent className="p-6">
              {/* Desktop View */}
              {cities ? (
                <><div className="hidden md:block ">
                      <Table className="w-[300px] border-collapse">
                          <TableHeader>
                              <TableRow className="border-b border-gray-200">
                                  <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary">
                                      City Title
                                  </TableHead>
                                  <TableHead className="py-3 px-4 text-center text-sm font-semibold text-primary">
                                      Options
                                  </TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {cities.map((course) => (
                                  <TableRow
                                      key={course.id}
                                      className="hover:bg-gray-50 transition-colors"
                                  >
                                      <Link href={`/${course.slug}`} >
                                          <TableCell
                                              className={`py-3 px-4 text-sm font-medium text-primary hover:text-secondary`}
                                          >
                                              {course.name}
                                          </TableCell>
                                      </Link>

                                      <TableCell className="py-3 px-4 text-center">
                                          <Link
                                              href={`/${course.slug}`} 
                                              className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secondary transition-colors"
                                          >
                                              View All Courses
                                          </Link>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </div><div className="space-y-4 md:hidden">
                          {cities.map((course) => (
                              <Card
                                  key={course.id}
                                  className="rounded-lg shadow-sm border border-gray-200"
                              >
                                  <CardContent className="p-4 space-y-4 ">
                                      <Link href={`/${course.slug}`}
                                          className={`text-base font-semibold items-center flex  ${course.highlight ? "text-amber-500" : "text-gray-800"}`}
                                      >
                                          {course.name}
                                      </Link>
                                      <div className="flex flex-col gap-4">

                                      </div>
                                      <div className="flex items-center justify-between mt-4">
                                          <span className="text-base font-semibold text-gray-800">
                                              {course.price}
                                          </span>
                                          <Link
                                              href={`/${course.slug}`}
                                              className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                                          >
                                              View All Courses
                                          </Link>
                                      </div>
                                  </CardContent>
                              </Card>
                          ))}
                      </div></>
              ) : (
                <><div className="hidden md:block">
                          <Table className="w-full border-collapse">
                              <TableHeader>
                                  <TableRow className="border-b border-gray-200">
                                      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary">
                                          Course Title
                                      </TableHead>
                                      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary">
                                          Dates
                                      </TableHead>
                                      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary">
                                          Cities
                                      </TableHead>
                                      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary">
                                          Price
                                      </TableHead>
                                      <TableHead className="py-3 px-4 text-center text-sm font-semibold text-primary">
                                          Options
                                      </TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {filteredCourses.map((course) => (
                                      <TableRow
                                          key={course.id}
                                          className="hover:bg-gray-50 transition-colors"
                                      >
                                          <Link href={`${cities_ ? `/${params}/${course.slug}` : `/${params}/${course.available_cities[0].slug}/${course.slug}`}`}>
                                              <TableCell
                                                  className={`py-3 px-4 text-sm font-medium text-primary hover:text-secondary`}
                                              >
                                                  {course.title}
                                              </TableCell>
                                          </Link>
                                          <TableCell className="py-3 px-4">
                                              <select
                                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-secondary focus:border-secondary"
                                                  value={selectedOptions.find(
                                                      (option) => option.courseId === course.id
                                                  )?.selectedDate || ""}
                                                  onChange={(e) => handleSelectChange(course.id, "selectedDate", e.target.value)}
                                              >
                                                  <option value="" disabled>
                                                      Select Date
                                                  </option>
                                                  {course.available_dates.map((date) => (
                                                      <option key={date.id} value={date.date}>
                                                          {date.date}
                                                      </option>
                                                  ))}
                                              </select>
                                          </TableCell>
                                          <TableCell className="py-3 px-4">
                                              <select
                                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-secondary focus:border-secondary"
                                                  value={selectedOptions.find(
                                                      (option) => option.courseId === course.id
                                                  )?.selectedCity || ""}
                                                  onChange={(e) => handleSelectChange(course.id, "selectedCity", e.target.value)}
                                              >
                                                  <option value="" disabled>
                                                      Select City
                                                  </option>
                                                  {course.available_cities.map((city) => (
                                                      <option key={city.id} value={city.slug}>
                                                          {city.name}
                                                      </option>
                                                  ))}
                                              </select>
                                          </TableCell>
                                          <TableCell className="py-3 px-4 text-sm text-primary">
                                              {course.price}
                                          </TableCell>
                                          <TableCell className="py-3 px-4 text-center">
                                              <Link
                                                  href={`/register?course=${course.slug}&date=${selectedOptions.find(
                                                      (option) => option.courseId === course.id
                                                  )?.selectedDate || ""}&city=${selectedOptions.find(
                                                      (option) => option.courseId === course.id
                                                  )?.selectedCity || ""}`}
                                                  className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secondary transition-colors"
                                              >
                                                  Register
                                              </Link>
                                          </TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </div><div className="space-y-4 md:hidden">
                              {filteredCourses.map((course) => (
                                  <Card
                                      key={course.id}
                                      className="rounded-lg shadow-sm border border-gray-200"
                                  >
                                      <CardContent className="p-4 space-y-4 ">
                                          <Link href={`/${params}/${course.available_cities[0].slug}/${course.slug}`}
                                              className={`text-base font-semibold items-center flex  ${course.highlight ? "text-amber-500" : "text-gray-800"}`}
                                          >
                                              {course.title}
                                          </Link>
                                          <div className="flex flex-col gap-4">
                                              {/* Dropdown for Dates */}
                                              <div className="w-full">
                                                  <label
                                                      htmlFor="date-select"
                                                      className="block text-sm font-medium text-gray-700 mb-1"
                                                  >
                                                      Select Date
                                                  </label>
                                                  <select
                                                      id="date-select"
                                                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-amber-400 focus:border-amber-400 bg-gray-50"
                                                      value={selectedOptions.find(
                                                          (option) => option.courseId === course.id
                                                      )?.selectedDate || ""}
                                                      onChange={(e) => handleSelectChange(course.id, "selectedDate", e.target.value)}
                                                  >
                                                      <option value="" disabled>
                                                          Select Date
                                                      </option>
                                                      {course.available_dates.map((date) => (
                                                          <option key={date.id} value={date.date}>
                                                              {date.date}
                                                          </option>
                                                      ))}
                                                  </select>
                                              </div>

                                              {/* Dropdown for Cities */}
                                              <div className="w-full">
                                                  <label
                                                      htmlFor="city-select"
                                                      className="block text-sm font-medium text-gray-700 mb-1"
                                                  >
                                                      Select City
                                                  </label>
                                                  <select
                                                      id="city-select"
                                                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-amber-400 focus:border-amber-400 bg-gray-50"
                                                      value={selectedOptions.find(
                                                          (option) => option.courseId === course.id
                                                      )?.selectedCity || ""}
                                                      onChange={(e) => handleSelectChange(course.id, "selectedCity", e.target.value)}
                                                  >
                                                      <option value="" disabled>
                                                          Select City
                                                      </option>
                                                      {course.available_cities.map((city) => (
                                                          <option key={city.id} value={city.slug}>
                                                              {city.name}
                                                          </option>
                                                      ))}
                                                  </select>
                                              </div>
                                          </div>
                                          <div className="flex items-center justify-between mt-4">
                                              <span className="text-base font-semibold text-gray-800">
                                                  {course.price}
                                              </span>
                                              <Link
                                                  href={`/register?course=${course.slug}&date=${selectedOptions.find(
                                                      (option) => option.courseId === course.id
                                                  )?.selectedDate || ""}&city=${selectedOptions.find(
                                                      (option) => option.courseId === course.id
                                                  )?.selectedCity || ""}`}
                                                  className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                                              >
                                                  Register
                                              </Link>
                                          </div>
                                      </CardContent>
                                  </Card>
                              ))}
                          </div></>
              )}
              
          </CardContent>
      </Card></>
  );
}
