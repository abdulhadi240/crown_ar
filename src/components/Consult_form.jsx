'use client'
import React from 'react'

const Consult_form = () => {
  return (
    <div className='md:flex md:justify-center overflow-hidden'>
    <form className="max-w-4xl md:mx-auto p-6 bg-white shadow-md mx-2 rounded">
    <div className='flex flex-col md:flex-row justify-between md:gap-6 '>
          <div className="mb-4">
            <label htmlFor="full-name" className="block text-gray-700 font-bold mb-2">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              className="w-full md:w-72 px-3 py-2 border rounded-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full md:w-72 px-3 py-2 border rounded-full"
              placeholder="Enter your email"
            />
          </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="consultation"
              className="block text-gray-700 font-bold mb-2"
            >
              Consultation for
            </label>
            <input
              id="consultation"
              type="text"
              className="w-full px-3 py-2 border rounded-full"
              placeholder="Enter the topic of consultation"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your message"
            />
          </div>
          <div className='flex justify-center'>
          <button
              className="text-white py-2  rounded-full px-16 shadow-lg text-center flex justify-center font-medium tracking-wide mt-4 text-xs transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(90deg, #FBBA07 0%, #F8C63D 50%, #F5D273 100%)",
              }}
            >
              Submit
            </button>
            </div>
        </form></div>
  )
}

export default Consult_form