import Image from 'next/image'; // Next.js optimized image component
import Link from 'next/link'; // Next.js Link for internal navigation
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';
import FooterMobile from './FooterMobile';

const Footer = () => {
  return (
    <footer>
      <div className='md:hidden'>
      <FooterMobile/>
      </div>
    <div className="hidden px-4 pt-32 bg-white sm:px-16 md:block">
      <div className="container flex flex-col items-start justify-between mx-auto space-y-10 sm:flex-row sm:space-y-0">
        {/* Logo and Description */}
        <div className="w-full sm:w-auto">
          <Image 
            src="/logobat.png" 
            alt="British Academy Logo"
            width={80}
            height={50}
            className="mb-4"
          />
          <p className="w-full text-sm text-gray-600 sm:w-80">
            The British Academy for Training and Development is a British institution specializing in training and development of human and institutional staff across various fields, including management, media, IT, and more.
          </p>
          {/* Social Media Links */}
          <div className="flex mt-4 space-x-4">
            <Link href="https://www.youtube.com" aria-label="YouTube" target="_blank">
              <FaYoutube size={24} className="text-red-600" />
            </Link>
            <Link href="https://www.instagram.com" aria-label="Instagram" target="_blank">
              <FaInstagram size={24} className="text-pink-600" />
            </Link>
            <Link href="https://www.twitter.com" aria-label="Twitter" target="_blank">
              <FaTwitter size={24} className="text-purple-600" />
            </Link>
            <Link href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank">
              <FaLinkedin size={24} className="text-blue-600" />
            </Link>
            <Link href="https://www.facebook.com" aria-label="Facebook" target="_blank">
              <FaFacebook size={24} className="text-blue-800" />
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="w-full mt-10 sm:w-auto sm:mt-28">
          <h3 className="mb-2 font-bold text-gray-800">About</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/menu">Menu</Link></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="w-full mt-10 sm:w-auto sm:mt-28">
          <h3 className="mb-2 font-bold text-gray-800">Company</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="/why-2rism">Why 2rism</Link></li>
            <li><Link href="/plan">Plan</Link></li>
            <li><Link href="/FAQ">FAQ</Link></li>
            <li><Link href="/Blog/articles">Blog</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="w-full mt-10 sm:w-auto sm:mt-28">
          <h3 className="mb-2 font-bold text-gray-800">Support</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="/account">Account</Link></li>
            <li><Link href="/customer_service">Support Center</Link></li>
            <li><Link href="/feedback">Feedback</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Subscription Section */}
        <div className="w-full mt-10 sm:w-1/4 sm:mt-28">
          <p className="mb-4 text-sm font-bold text-gray-600">
            2023 - Copyright © All Rights Reserved By British Academy. |
            <Link href="https://shiftict.com" target="_blank" rel="noopener noreferrer" className="ml-1 underline">
              Created by Shiftict
            </Link>
          </p>
          <div className="flex items-center p-2 bg-white rounded shadow">
            <FaEnvelope className="mr-2 text-xl text-yellow-500" />
            <input
              type="email"
              placeholder="Your Email"
              aria-label="Email subscription"
              className="flex-grow text-sm text-gray-600 outline-none"
              required
            />
            <button
              type="submit"
              aria-label="Submit email"
              className="p-2 ml-2 text-white bg-red-600 rounded"
            >
              <FaEnvelope />
            </button>
          </div>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
