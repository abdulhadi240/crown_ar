'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Personal_Information from './components/Personal_Information';
import { cn } from '@/lib/utils';
import Courses_Selected from './components/Courses_Selected';
import HeaderSection from '@/components/HeaderSection';
import Design from '../homepage1/components/Design';

const Page = () => {
  const router = useRouter();
  const [select, setSelect] = useState('Personal_Information');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(<Personal_Information />);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token

      if (!token) {
        router.push('/sign-in'); // Redirect if token is missing
        return;
      }

      try {
        const response = await fetch('https://backendbatd.clinstitute.co.uk/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSelect = (newSelection) => {
    setIsAnimating(true);

    setTimeout(() => {
      setSelect(newSelection);
      setCurrentComponent(newSelection === 'Personal_Information' ? <Personal_Information userData={userData} /> : <Courses_Selected />);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div>
      <Design secondary={true} bg />
      <div className='flex justify-center gap-4 mb-6 select-none text-sm'>
        <div className='flex items-center p-1 mt-10 text-white rounded-full md:p-2 md:px-4 bg-primary'>
          <div
            onClick={() => handleSelect('Personal_Information')}
            className={cn('p-1 px-2 cursor-pointer', select === 'Personal_Information' && 'border-primary rounded-full text-white transition-all delay-200')}
          >
            Personal Information
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 mb-6 ${isAnimating ? 'slide-out' : 'slide-in'}`}>
        {currentComponent}
      </div>
      
      {userData && (
        <div className="p-4 border rounded-md bg-gray-100 mt-4">
          <h2 className="text-lg font-semibold">User Details</h2>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Status:</strong> {userData.status}</p>
          <p><strong>Created At:</strong> {new Date(userData.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
