import Link from 'next/link';
import React from 'react';
import { HiMiniSquare3Stack3D } from "react-icons/hi2";

const SpecializationCard = ({ title }) => {
  return (
    <Link href={`/${title.available_cities[0].slug}/${title.specialization_slug}/${title.slug}`} className="flex flex-col  items-center justify-center text-center bg-white group-hover:transition-colors rounded-lg group shadow-md sm:w-40 w-32  h-32 hover:bg-[#152765] hover:text-white"> {/* Reduced padding */}
      <div className="flex items-center justify-center"> {/* Reduced margin */}
        <div className="flex items-center justify-center p-2   bg-[#152765] rounded-full"> {/* Adjusted icon container size */}
          <span className="hidden text-lg font-bold sm:block">
            <HiMiniSquare3Stack3D color="white" />
          </span>
          <span className="text-lg font-bold sm:hidden">
            <HiMiniSquare3Stack3D color="white" size={15}/>
          </span>
        </div>
      </div>
      <h4 className="mt-4 text-xs sm:text-sm text-[#152765] group-hover:text-white group-hover:transition-colors line-clamp-2">{title.title}</h4>
    </Link>
  );
};

export default SpecializationCard;
