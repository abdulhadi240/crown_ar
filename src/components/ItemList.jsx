import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function CourseListing({ filteredCourses , params}) {
  const [selectedOptions, setSelectedOptions] = useState(
    filteredCourses.map((course) => ({
      courseId: course.id,
      selectedDate: "",
      selectedCity: "",
    }))
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
              <div className="hidden md:block">
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
                                <Link href={`/${params}/${course.available_cities[0].slug}/${course.slug}`}>
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
              </div>

              {/* Mobile View */}
              <div className="space-y-4 md:hidden">
                  {filteredCourses.map((course) => (
                      <Card
                          key={course.id}
                          className="rounded-lg shadow-sm border border-gray-200"
                      >
                          <CardContent className="p-4 space-y-4">
                              <Link href={`/${params}/${course.available_cities[0].slug}/${course.slug}`}
                                  className={`text-base font-semibold ${course.highlight ? "text-amber-500" : "text-gray-800"}`}
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
              </div>
          </CardContent>
      </Card><main className="min-h-screen bg-white p-6 md:p-12">
              <article className=" text-start max-w-4xl">
                  {/* Header */}
                  <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
                      Mastering the Project Stages: A Comprehensive Training Course
                  </h1>

                  {/* Introduction */}
                  <p className="mb-8 text-gray-700">
                      Managing projects successfully requires a deep understanding of the project lifecycle and the skills to
                      navigate each stage effectively. Our Project Stages Training Course is designed to equip you with the
                      knowledge and tools to excel in every phase of project management, from initiation to closure.
                  </p>

                  {/* Course Content */}
                  <section>
                      <h2 className="mb-4 text-xl font-semibold text-gray-900">What Does the Course Cover?</h2>
                      <p className="mb-6 text-gray-700">
                          This course takes a structured approach to the key stages of project management:
                      </p>

                      <div className="space-y-6">
                          {/* Initiation */}
                          <section>
                              <h3 className="mb-2 font-semibold text-gray-900">1. Initiation:</h3>
                              <ul className="ml-6 list-disc space-y-2 text-gray-700">
                                  <li>Learn how to define the project scope, objectives, and deliverables.</li>
                                  <li>Develop skills to identify key stakeholders and create a project charter.</li>
                                  <li>Gain insights into feasibility analysis and risk identification.</li>
                              </ul>
                          </section>

                          {/* Planning */}
                          <section>
                              <h3 className="mb-2 font-semibold text-gray-900">2. Planning:</h3>
                              <ul className="ml-6 list-disc space-y-2 text-gray-700">
                                  <li>Master the art of creating detailed project plans, timelines, and budgets.</li>
                                  <li>Understand resource allocation and learn how to develop a robust risk management plan.</li>
                                  <li>Explore tools and techniques for setting milestones and performance metrics.</li>
                              </ul>
                          </section>

                          {/* Execution */}
                          <section>
                              <h3 className="mb-2 font-semibold text-gray-900">3. Execution:</h3>
                              <ul className="ml-6 list-disc space-y-2 text-gray-700">
                                  <li>Discover how to implement project plans effectively while managing resources.</li>
                                  <li>Learn team management, task delegation, and conflict resolution strategies.</li>
                                  <li>Understand how to track progress using project management software.</li>
                              </ul>
                          </section>

                          {/* Monitoring and Controlling */}
                          <section>
                              <h3 className="mb-2 font-semibold text-gray-900">4. Monitoring and Controlling:</h3>
                              <ul className="ml-6 list-disc space-y-2 text-gray-700">
                                  <li>Explore techniques for tracking performance and making real-time adjustments.</li>
                                  <li>
                                      Learn how to manage change requests, ensure quality control, and maintain alignment with project
                                      goals.
                                  </li>
                                  <li>Gain insights into reporting tools to keep stakeholders informed.</li>
                              </ul>
                          </section>

                          {/* Closure */}
                          <section>
                              <h3 className="mb-2 font-semibold text-gray-900">5. Closure:</h3>
                              <ul className="ml-6 list-disc space-y-2 text-gray-700">
                                  <li>
                                      Understand the importance of proper project closure, including delivering outcomes and final
                                      documentation.
                                  </li>
                                  <li>Learn how to conduct post-project evaluations to identify successes and lessons learned.</li>
                                  <li>Explore best practices for celebrating achievements and disbanding project teams.</li>
                              </ul>
                          </section>
                      </div>
                  </section>

              </article>
          </main></>
  );
}
