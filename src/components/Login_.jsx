"use client"; // ✅ Required for Next.js App Router

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";
import Image from "next/image";

const Login_ = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subdomainUrl, setSubdomainUrl] = useState('');

  // Get initials from name
  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "U";
  };

  // Get the current URL and generate a subdomain-based URL
  useEffect(() => {
    const currentUrl = window.location.href;  // e.g., http://localhost:3000/about
    const lang = 'ar';  // Set the language code dynamically if needed

    // Assuming `ar` as the subdomain for Arabic
    const subdomain = `${lang}.clinstitute.co.uk`;  // This can be dynamic based on your needs
    const newUrl = currentUrl.replace('clinstitute.co.uk', subdomain);  // Replace 'localhost' with the subdomain
    setSubdomainUrl(newUrl);  // Store the new URL
  }, []);

  return (
    <div className="relative flex items-center space-x-4">
      <Link href={subdomainUrl} className="flex items-center gap-2 border-[1px] rounded-md border-slate-50/70 px-2 py-1">
        <Image src={'/ar.webp'} height={30} width={30} alt="Arab Flag"/>
        العربية
      </Link>
      {isAuthenticated && user ? (
        // 🎭 Show user avatar & dropdown when logged in
        <div className="relative">
          <button
            className="w-10 h-10 flex items-center justify-center bg-secondary text-sm text-white font-bold rounded-full focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {getInitials(user.name)}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <div className="p-3 border-b text-gray-700">{user.name}</div>
              <Link
                href="/account"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={logout} // Calls `logout()` from `AuthProvider`
                className="block w-full text-left px-4 py-2 bg-primary text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        // 🔐 Show Login & Signup buttons if not authenticated
        <>
          <Link href="/sign-in" className="flex items-center text-white hover:text-secondary">
            <FaLock className="mr-1" color="white" /> Login
          </Link>
          <Link href="/sign-up" className="px-4 py-2 text-white rounded bg-secondary hover:bg-secondary-dark">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default Login_;
