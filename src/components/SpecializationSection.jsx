'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const SpecializationSection = ({ data }) => {
  // State to track the currently selected specialization.
  // By default, we select the first one if available.
  const [selectedSpec, setSelectedSpec] = useState(data && data.length > 0 ? data[0] : null)

  return (
    <div className="container mx-auto p-4">
      {/* Specializations Horizontal List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Specializations</h2>
        <div className="flex space-x-4 overflow-x-auto py-2">
          {data && data.length > 0 ? (
            data.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpec(spec)}
                className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
                  selectedSpec && selectedSpec.id === spec.id
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {spec.name}
              </button>
            ))
          ) : (
            <p>No specializations available</p>
          )}
        </div>
      </div>

      {/* Courses List for the Selected Specialization */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {selectedSpec ? `Courses in ${selectedSpec.name}` : 'Courses'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedSpec && selectedSpec.courses && selectedSpec.courses.length > 0 ? (
            selectedSpec.courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                passHref
              >
                <a className="block p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <img
                      src={course.icon}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.category}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 line-clamp-2">{course.summary}</p>
                </a>
              </Link>
            ))
          ) : (
            <p>No courses available for this specialization.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SpecializationSection
