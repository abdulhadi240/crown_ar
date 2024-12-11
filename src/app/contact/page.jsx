import React from 'react';
import Block from './components/Block';
import { FaWhatsapp } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const Page = () => {
  return (
    <div className='mt-10'>
      <div className='bg-[#DEEEFF] px-4 sm:px-10 flex flex-col sm:gap-56 gap-24 sm:flex-row w-full h-auto sm:h-96'>
        <div className='flex flex-col'>
          <Block
            title={'Call us'}
            Icon={FaWhatsapp}
            text={
              'WhatsApp (EN): +447443269723 WhatsApp (AR): +44 7724022466'
            }
          />
          <Block
            title={'Location'}
            Icon={FaMapMarkerAlt}
            text={
              'Address 1: 6th Floor, FC200, 2 Lakeside Dr, London NW10 7FQ Address 2: For Financial and Accountancy Correspondence: write to: Suite 702 Crown House North Circular Road, London, United Kingdom, NW10 7PN'
            }
          />
          <Block title={'Phone'} Icon={FaPhoneAlt} text={'+442035827999'} />
          <Block
            title={'Email'}
            Icon={MdOutlineEmail}
            text={'info@batdacademy.org.uk'}
          />
        </div>
        <div className='w-full sm:w-[450px] bg-white dark:text-black shadow-lg p-6 h-auto sm:h-[490px]'>
          <h1 className='mb-4 text-2xl font-bold'>CONTACT NOW</h1>
          <p className='mb-4 text-sm'>
            In diam consequat nec eu. Eu sem nec vel, sollicitudin ipsum viverra sed nibh amet. Nunc, et pharetra, duis tortor dictum nisl. Id vestibulum tincidunt adipiscing gravida risus.
          </p>
          <form className=''>
            {/* Name Input */}
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Name'
                className='w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500'
                required
              />
            </div>
            {/* Email Input */}
            <div className='mb-4'>
              <input
                type='email'
                placeholder='Email'
                className='w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500'
                required
              />
            </div>
            {/* Phone Input */}
            <div className='mb-4'>
              <input
                type='tel'
                placeholder='Phone'
                className='w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500'
                required
              />
            </div>
            {/* Message Input */}
            <div className='mb-4'>
              <textarea
                placeholder='Message'
                className='w-full h-24 py-2 border-b border-gray-300 resize-none focus:outline-none focus:border-blue-500'
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type='submit'
              className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
