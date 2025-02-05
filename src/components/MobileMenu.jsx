"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHamburger, FaLock } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useAuth } from "./context/AuthContext";

export default function MobileMenu({ color, bg }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${bg ? "bg-primary" : ""}`}>
      <div className="mx-4 md:hidden ">
        {/* Menu Button */}
        <div className="flex justify-between mx-2 h-16">
          <div>
            <Image
              src={"/logo13.png"}
              width={120}
              height={120}
              alt="logo"
              className="-mt-8"
            />
          </div>

          {isAuthenticated && user && (
            // 🎭 Show user avatar & dropdown when logged in
            <div className="relative">
              <button
                className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {getInitials(user.name)}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <div className="p-3 border-b text-gray-700">{user.name}</div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout} // Calls `logout()` from `AuthProvider`
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <div
            className="flex justify-center items-center text-center"
            onClick={toggleMenu}
          >
            <MdMenu size={28} color={color || "black"} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 bg-white shadow-md h-full z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="">
          {/* Logo */}

          <div
            aria-label="Close menu"
            onClick={toggleMenu}
            className="flex justify-end py-2 px-2 bg-primary w-full text-secondary hover:text-gray-800 "
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="bg-primary p-4">
            <div className="flex flex-col ">
              <div className="flex justify-center -mt-6">
                <Image
                  src="/logo13.png" // Optimized image usage
                  alt="Logo"
                  width={120}
                  height={120}
                  className=""
                  priority // To load the image faster
                />
              </div>
              <div className="flex justify-between gap-10">
                <Link
                  href="/sign-in"
                  className="flex items-center w-full h-8 px-4 mt-4 text-xs  border-secondary border-[1px] text-white rounded hover:bg-blue-700"
                  onClick={toggleMenu}
                >
                  <FaLock className="mr-2 " /> Login
                </Link>
                <Link
                  href="/sign-up"
                  className="flex items-center w-full border-primary border-[1px] h-8 px-4 mt-4 text-xs text-white rounded bg-secondary "
                  onClick={toggleMenu}
                >
                  <FaLock className="mr-2 " /> Signup
                </Link>
              </div>
            </div>
          </div>

          {/* Menu Links */}
          <nav className="mt-8 space-y-4 text-sm space-x-7">
            <Link
              href="/"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              {" "}
            </Link>
            <Link
              href="/"
              passHref
              className="block text-[#111F51] font-semibold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/training-courses"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Training Courses
            </Link>
            <Link
              href="/diploma"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Diploma
            </Link>
            <Link
              href="/masters"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Masters
            </Link>
            <Link
              href="/cities"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Cities
            </Link>
            <Link
              href="/consulting-services"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Consulting
            </Link>
            <Link
              href="/Blog"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Blogs
            </Link>
            <Link
              href="/job"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Jobs
            </Link>
            <Link
              href="/contact"
              passHref
              className="block text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
