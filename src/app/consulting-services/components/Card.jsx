import React from 'react'
import { cn } from '@/lib/utils';
const Card = ({ number, title, description }) => (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg hover:shadow-md hover:bg-white group">
      <div
        className={cn(
          'h-12 w-12 flex items-center justify-center rounded-full text-white font-bold mb-4',
          {
            'bg-orange-500': number === 1,
            'bg-gray-800': number === 2,
            'bg-teal-600': number === 3,
            'bg-black': number === 4,
            'bg-green-500': number === 5,
            'bg-red-500': number === 6,
            'bg-yellow-600': number === 7,
            'bg-blue-700': number === 8,
          }
        )}
      >
        {number}
      </div>
      <h3 className="mb-2 font-semibold text-md">{title}</h3>
      <p className="mb-4 text-xs text-center text-gray-600">{description}</p>
      <button className="px-4 py-2 text-xs text-black transition border-2 rounded group-hover:bg-primary group-hover:text-white border-primary hover:bg-blue-700">
        Class Details
      </button>
    </div>
  );
  
export default Card

 