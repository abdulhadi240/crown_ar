'use client';
import React, { useState } from 'react';
import Personal_Information from './components/Personal_Information';
import { cn } from '@/lib/utils';
import Courses_Selected from './components/Courses_Selected';
import HeaderSection from '@/components/HeaderSection';

const Page = () => {
  const [select, setSelect] = useState('Personal_Information');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(<Personal_Information />);

  const handleSelect = (newSelection) => {
    setIsAnimating(true);

    // Delay the switch of the component to allow animation to play out
    setTimeout(() => {
      setSelect(newSelection);
      setCurrentComponent(newSelection === 'Personal_Information' ? <Personal_Information /> : <Courses_Selected/>);
      setIsAnimating(false);
    }, 300); // Matches the duration of the animation
  };

  return (
    <div>
      <HeaderSection/>
      <div className='flex justify-center gap-4 mb-6 select-none'>
        <div className='flex items-center p-1 mt-10 text-white rounded-full md:p-2 md:px-4 bg-primary'>
          <div
            onClick={() => handleSelect('Personal_Information')}
            className={cn('p-1 px-2 cursor-pointer', select === 'Personal_Information' && 'border-primary bg-white rounded-full text-primary transition-all delay-200')}
          >
            Personal Information
          </div>
          <div
            onClick={() => handleSelect('Courses_Selected')}
            className={cn('border-primary p-1 px-2 cursor-pointer', select === 'Courses_Selected' && 'border-primary bg-white rounded-full text-primary transition-all delay-200')}
          >
            Courses Selected
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 mb-6 ${isAnimating ? 'slide-out' : 'slide-in'}`}>
        {currentComponent}
      </div>
    </div>
  );
};

export default Page;
