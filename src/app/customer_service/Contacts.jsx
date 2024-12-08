import React from 'react';
import { BiLogoGmail } from 'react-icons/bi';
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import ContactCard from './ContactCard';

const Contacts = () => {
  return (
    <div className="flex justify-center mt-10 sm:mt-20">
      <div className="grid grid-cols-1 gap-6 px-4 sm:px-16 lg:px-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ContactCard
          label="Share your queries with us"
          size={24}
          Ricons={BiLogoGmail}
          Heading="Email Our Team"
          text="Speak to our friendly team."
          link="https://mail.google.com/mail/?view=cm&to=info@batdacademy.org.uk&su=Your%20Subject&body=Your%20Message"
        >
          <p className="text-sm text-gray-600">We respond within 24 hours.<br className='mt-2'/><span className='mt-1'>info@batdacademy.org.uk </span> </p>
        </ContactCard>

        <ContactCard
          label="Live chat at the right corner"
          size={24}
          Ricons={FaWhatsapp}
          Heading="Chat On Whatsapp"
          text="Mon-Sat 24/7"
          link="https://api.whatsapp.com/send/?phone=%2B442035827999&text&type=phone_number&app_absent=0"
        >
          <div className="text-sm text-gray-600">
            <ul>
                <li>WhatsApp (EN): 00442035827999</li>
                <li>WhatsApp (AR): 00447724022466</li>
            </ul>
          </div>
        </ContactCard>

        <ContactCard
          label="Live Talk With Our Team"
          size={24}
          Ricons={FaPhoneAlt}
          Heading="Call Now"
          text="344 Grays Inn Rd,  London, England, WC1X 8BP"
          link="./"
        >
          <div className="text-sm text-gray-600">
            <ul>
                <li>Mobile :  442035827999</li>
                <li>Landline: 00442036036593</li>
            </ul>
          </div>
        </ContactCard>

        <ContactCard
          label="Visit our office"
          size={24}
          Ricons={FaMapMarkerAlt}
          Heading="Visit us!"
          link="https://www.google.com/maps/place/344+Grays+Inn+Rd,+London+WC1X+8BX,+UK/@51.5297723,-0.1226215,440m/data=!3m2!1e3!4b1!4m6!3m5!1s0x48761b38dc7021e9:0xb35eda9a375cae5d!8m2!3d51.529769!4d-0.1200466!16s%2Fg%2F11c5pw6dvs?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"
        >
          <p className="text-sm text-gray-600">Come visit us for in-person support.</p>
        </ContactCard>
      </div>
    </div>
  );
};

export default Contacts;
