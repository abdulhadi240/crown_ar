'use client';
import React, { useState } from 'react';
import Card from './Card';

const Filteration = ({ data, category }) => {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filtered, setFiltered] = useState(data.data);

  const handleSearch = () => {
    let filteredData = data.data;

    // Filter by title (case-insensitive partial match)
    if (title) {
      filteredData = filteredData.filter((service) =>
        service.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filteredData = filteredData.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Filter by month (assuming selectedMonth is in "YYYY-MM" format)
    if (selectedMonth) {
      filteredData = filteredData.filter((service) => {
        const serviceDate = new Date(service.consulting_date.split('-').reverse().join('-'));
        const [year, month] = selectedMonth.split('-');
        return (
          serviceDate.getFullYear() === parseInt(year) &&
          (serviceDate.getMonth() + 1) === parseInt(month)
        );
      });
    }

    setFiltered(filteredData);
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto mb-8">
        <div className="grid items-center grid-cols-2 gap-4 sm:flex-row sm:flex">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search Services"
            className="flex-1 p-3 text-sm border rounded-lg shadow-md"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 p-3 border rounded-lg shadow-md"
          >
            <option value="">Category</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            {category.data.map((cat, index) => (
              <option key={index} value={cat.slug} className="text-black">
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="flex-1 p-3 text-sm border rounded-lg shadow-md"
          />
          <button
            onClick={handleSearch}
            className="px-10 py-3 text-sm text-center text-white transition rounded-lg sm:px-16 bg-primary hover:bg-primary/70"
          >
            Search
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-8 md:mx-28 max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((service, index) => (
          <Card
            key={index}
            number={index + 1}
            slug={service.slug}
            title={service.title}
            description={service.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Filteration;
