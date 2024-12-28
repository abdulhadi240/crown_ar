import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Card = ({ number, title, description , slug }) => {
  const getColorClass = (num) => {
    const colors = [
      'bg-orange-500',
      'bg-gray-800',
      'bg-teal-600',
      'bg-black',
      'bg-green-500',
      'bg-red-500',
      'bg-yellow-600',
      'bg-blue-700',
    ];
    return colors[(num - 1) % colors.length];
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg hover:shadow-md hover:bg-white group">
      <div
        className={cn(
          'h-12 w-12 flex items-center justify-center rounded-full text-white font-bold mb-4',
          getColorClass(number)
        )}
      >
        {number}
      </div>
      <h3 className="mb-2 font-semibold text-md text-center">{title}</h3>
      <div className='text-xs'>
        <p className="mb-4 text-center text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      <Link href={`consulting-services/${slug}`} className="px-4 py-2 text-xs text-black transition border-2 rounded group-hover:bg-primary group-hover:text-white border-primary hover:bg-blue-700">
        More Details
      </Link>
    </div>
  );
};

export default Card;