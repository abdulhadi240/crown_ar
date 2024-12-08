'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const AuthForm = () => {
  const [type, setType] = useState('Login'); // Initial state set to "Login"

  // Function to toggle between Login and Register
  const toggleType = () => {
    setType((prevType) => (prevType === 'Login' ? 'Register' : 'Login'));
  };

  return (
    <div className="flex flex-col gap-3 transition-all duration-500 ease-in-out">
      <h1 className="text-xs text-center">Welcome to lorem..!</h1>
      <div className="flex justify-center">
        <div className="flex justify-center text-center gap-1 p-[4px] py-2 rounded-full w-72 btns bg-primary">
          <button
            onClick={toggleType}
            className={cn(
              'p-1 px-10 text-white rounded-full transition-colors duration-500 ease-in-out',
              type === 'Login' ? 'bg-[#1F3A98]' : 'bg-primary'
            )}
          >
            Login
          </button>
          <button
            onClick={toggleType}
            className={cn(
              'p-1 px-10 text-white rounded-full transition-colors duration-500 ease-in-out',
              type === 'Register' ? 'bg-[#1F3A98]' : 'bg-primary'
            )}
          >
            Register
          </button>
        </div>
      </div>
      <p className="max-w-xs mt-2 ml-2 text-sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
      <form action="" className="flex flex-col gap-6 transition-all duration-500 ease-in-out">
        <div className="flex flex-col mt-4">
          <h1 className="ml-3 text-sm">Username</h1>
          <div className="bg-white rounded-full border-[1px] max-w-96 border-primary">
            <input
              type="text"
              className="inset-0 m-3 text-sm border-0 outline-none active:border-0"
              placeholder="Enter your Username"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="ml-3 text-sm">Password</h1>
          <div className="bg-white rounded-full border-[1px] max-w-96 border-primary">
            <input
              type="password"
              className="inset-0 m-3 text-sm border-0 outline-none active:border-0"
              placeholder="Enter your Password"
            />
          </div>
        </div>

        {/* Animating the height change for Confirm Password */}
        <div
          className={cn(
            'transition-[max-height] duration-500 ease-in-out overflow-hidden',
            type === 'Register' ? 'max-h-[200px]' : 'max-h-0'
          )}
        >
          <div className="flex flex-col">
            <h1 className="ml-3 text-sm">Confirm Password</h1>
            <div className="bg-white rounded-full border-[1px] max-w-96 border-primary">
              <input
                type="password"
                className="inset-0 m-3 text-sm border-0 outline-none active:border-0"
                placeholder="Confirm your Password"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mx-2">
          <div className="flex gap-2 remember">
            <input type="checkbox" name="" id="" className="text-primary" />
            <h1 className="flex items-center text-xs">Remember me</h1>
          </div>
          <div className="text-xs underline forget hover:text-primary hover:cursor-pointer hover:transition-all">
            Forgot Password?
          </div>
        </div>

        <div className="flex justify-end button">
          <button className="p-2 px-10 mb-6 text-sm text-white rounded-full md:mb-0 bg-primary">
            {type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
