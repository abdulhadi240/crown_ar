import Image from "next/image";
import React from "react";
import Header from "./Header";
import Inputs from "./Inputs";

const Design = ({icon_white, iamge, children, center, input, image_height, secondary , search_height }) => {
  return (
    <div className="z-50">
      {secondary ? (
        // If secondary is true, ONLY display the Header
        <Header secondary={secondary} />
      ) : (
        // Otherwise, display the background image section + Header + other content
        <div
            className={`relative w-full ${
    search_height
      ? "h-[400px]"
      : image_height
      ? "h-[700px]"
      : "md:h-[400px] h-[300px]"
  } overflow-hidden`}
        >
          {/* Background Image */}
          <Image
            src={iamge}
            layout="fill"
            objectFit="cover"
            alt="Hero Background"
            className="absolute inset-0 brightness-75"
            priority
            loading="eager"
          />

          {/* Overlay with #061939 */}
          <div className="absolute inset-0 bg-[#061939] bg-opacity-60"></div>

          {/* Optional SVG Waves if image_height is set */}
          {image_height && (
            <div>
              <svg
                className="absolute bottom-0 w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 250"
              >
                <path
                  fill="#FFFFFF"
                  d="M0,200 C1150,-50 1700,40 1440,50 L1440,250 L0,250 Z"
                />
              </svg>

              <svg
                className="absolute -bottom-10 w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 250"
                height={1}
              >
                <path
                  fill="#fbba07"
                  d="M0,200 C1150,-50 1700,40 1440,50 L1440,250 L0,250 Z"
                />
              </svg>
            </div>
          )}

          <div className="relative z-10">
            {/* Header */}
            <Header icon_white/>

            {/* Content Wrapper */}
            <div
              className={`flex flex-col ${
                center
                  ? "items-center justify-center"
                  : "items-start justify-start px-10 md:px-20"
              } md:mt-16`}
            >
              {/* Children Content (Headings, Subheadings, etc.) */}
              <div className={center ? "text-center" : "text-start"}>{children}</div>

              {/* Search Bar or Other Inputs */}
              {input && <Inputs />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Design;
