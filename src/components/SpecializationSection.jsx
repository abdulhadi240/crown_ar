"use client";
import { useState } from "react";
import SpecializationCard from "./SpecializationCard";

const SpecializationSection = ({ data }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(data[2].id); // Initially select the third menu item

  // Function to handle menu item click
  const handleMenuItemClick = (id) => {
    setSelectedMenuItem(id);
  };

  // Find the selected menu item's data
  const selectedItem = data.find((item) => item.id === selectedMenuItem);

  return (
    <section className="py-16 overflow-hidden">
      <div className="">
        {/* Title and Description */}
        <h1 className="text-[#a9becc] text-5xl max-w-4xl mx-auto text-center">
          Take Your <span className="text-primary font-bold">First Step</span>{" "}
          Towards Achieving Professional Goals
        </h1>

        {/* Main Layout - Side Menus and Card Grid */}
        <div className="md:mx-10 flex flex-col md:flex-row">
          <div className="flex flex-col justify-center gap-4 mx-1 mt-10">
            {/* Horizontal Scrollable Categories */}
            <div
              className="flex overflow-x-scroll gap-4 px-2 scrollbar-hide"
              style={{
                maxWidth: "100%",
                paddingBottom: "1rem", // Space for the scrollbar
              }}
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`py-3 w-56 px-1 items-center text-center flex justify-center rounded-lg text-sm border-[1px] border-primary shadow-xl transition-all cursor-pointer hover:bg-primary active:bg-primary hover:text-white active:text-white ${
                    selectedMenuItem === item.id ? "bg-primary text-white" : ""
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {/* Bottom-aligned Scrollbar */}
            <div className="w-full h-[1px] border-[1px] border-primary text-primary" />

            {/* Center - Grid of Cards */}
            <div className="gap-5 mt-2 flex justify-center items-center text-center flex-wrap">
              {selectedItem.courses.map((title, index) => (
                <SpecializationCard key={index} title={title} />
              ))}
            </div>
          </div>
          <div className="flex justify-center sm:hidden ">
            <p className="mt-4 text-[8px] sm:text-base w-full p-3 sm:p-0 text-center text-gray-500 sm:w-[800px] items-center">
              The British Academy for Training and Development differs from
              other companies operating in the same field because it is a
              British-European company with excellence and there are specialized
              cadres with great practical experience...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializationSection;
