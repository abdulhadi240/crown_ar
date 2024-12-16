"use client";
import { useState } from "react";
import SpecializationCard from "./SpecializationCard";

// Define your menu items and their associated data
const menuItems = [
  {
    id: 1,
    title: "Service Management",
    courses: Array(12).fill("Service Management"),
  },
  {
    id: 2,
    title: "Media And Relation",
    courses: Array(12).fill("Media And Relation"),
  },
  {
    id: 3,
    title: "Information Technology",
    courses: Array(12).fill("Telecommunication"),
  },
  { id: 4, title: "Environment", courses: Array(12).fill("Environment") },
  {
    id: 5,
    title: "Accounting, Finance & Banking",
    courses: Array(12).fill("Finance & Banking"),
  },
  { id: 6, title: "Management", courses: Array(12).fill("Management") },
  { id: 7, title: "Oil And Gas", courses: Array(12).fill("Oil And Gas") },
  {
    id: 8,
    title: "Renewable And Clean Energy",
    courses: Array(12).fill("Clean Energy"),
  },
  {
    id: 9,
    title: "Health And Safety",
    courses: Array(12).fill("Health And Safety"),
  },
  {
    id: 10,
    title: "Public Health",
    courses: Array(12).fill("Hospital Management"),
  },
  {
    id: 11,
    title: "Engineering Maintenance",
    courses: Array(12).fill("Engineering Maintenance"),
  },
];

const SpecializationSection = ({ data }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(data[2].id); // Initially select the first menu item
  const [showAll, setShowAll] = useState(false);
  const [number, setNumber] = useState(6);
  // Function to handle menu item click
  const handleMenuItemClick = (id) => {
    setSelectedMenuItem(id);
  };

  const handleShowAllClick = () => {
    if (showAll) {
      setNumber(6); // Reset to default number
    } else {
      setNumber(data.length); // Show all items
    }
    setShowAll(!showAll);
  };

  // Find the selected menu item's data
  const selectedItem = data.find((item) => item.id === selectedMenuItem);

  return (
    <section className="py-16">
      <div className="container">
        {/* Title and Description */}
        <h2 className="text-2xl font-bold text-center sm:text-3xl">
          Courses <span className="text-red-600">By Specialization</span>
        </h2>
        <div className="flex justify-center dark:text-white">
          <p className="mt-4 text-sm hidden sm:block sm:text-base w-full p-3 sm:p-0 text-center text-gray-500 dark:text-white sm:w-[800px] items-center">
            The British Academy for Training and Development differs from other
            companies operating in the same field because it is a
            British-European company with excellence and there are specialized
            cadres with great practical experience...
          </p>
        </div>

        {/* Main Layout - Side Menus and Card Grid */}
        <div className=" md:mx-10 md:flex-row">
          <div className="md:flex md:flex-row md:justify-between gap-4 mx-1 mt-10 ">
            {/* Left Menu */}
            <div className="space-y-1 hidden md:block border-r-[#111F51] border-r-2">
              {data.slice(0, data.length / 2).map((item) => (
                <SideMenuItem
                  key={item.id}
                  title={item.name}
                  active={item.id === selectedMenuItem}
                  onClick={() => handleMenuItemClick(item.id)}
                />
              ))}
            </div>
            <div className="">
              <div className="space-y-1 md:hidden text-center flex flex-col gap-1 justify-center items-center border-r-[#111F51] border-r-2">
                {data.slice(0, number).map((item) => (
                  <SideMenuItemMobile
                    key={item.id}
                    title={item.name}
                    active={item.id === selectedMenuItem}
                    onClick={() => handleMenuItemClick(item.id)}
                  />
                ))}
                {data.length > 6 && (
                  <h1
                  onClick={handleShowAllClick}
                  className="text-xs font-bold text-primary underline"
                >
                  {showAll ? "Show Less" : "Show All"}
                </h1>
                )}
                
              </div>
            </div>

            {/* Center - Grid of Cards */}
            <div className="hidden gap-5 mt-2 sm:grid sm:grid-cols-2 md:grid-cols-4">
              {selectedItem.courses.map((title, index) => (
                <SpecializationCard key={index} title={title} />
              ))}
            </div>

            {/* Right Menu */}
            <div className="space-y-1 hidden md:block border-r-[#111F51] border-r-2">
              {data
                .slice(data.length / 2, data.length)
                .map((item) => (
                  <SideMenuItem
                    key={item.id}
                    title={item.name}
                    active={item.id === selectedMenuItem}
                    onClick={() => handleMenuItemClick(item.id)}
                  />
                ))}
            </div>
          </div>
          <div className="flex justify-center sm:hidden ">
            <p className="mt-4 text-[8px]  sm:text-base w-full p-3 sm:p-0 text-center text-gray-500 sm:w-[800px] items-center">
              The British Academy for Training and Development differs from
              other companies operating in the same field because it is a
              British-European company with excellence and there are specialized
              cadres with great practical experience...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-4 mt-10 md:hidden">
              {selectedItem?.courses.map((title, index) => (
                <SpecializationCard key={index} title={title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Side Menu Item Component
const SideMenuItem = ({ title, active, onClick }) => {
  return (
    <div
      className={`sm:w-56 w-44  h-auto px-1 py-2 text-[10px] text-center items-center  sm:text-sm font-light  cursor-pointer ${
        active ? "bg-[#152765] text-white" : "bg-gray-100 text-gray-800"
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const SideMenuItemMobile = ({ title, active, onClick }) => {
  return (
    <div
      className={`w-full text-center px-4 py-2 flex justify-center cursor-pointer ${
        active ? "bg-[#152765] text-white" : "bg-gray-100 text-gray-800"
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default SpecializationSection;
