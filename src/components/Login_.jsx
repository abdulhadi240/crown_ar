"use client"; // ✅ Required for Next.js App Router

import React, { useState } from "react";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";

const Login_ = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get initials from name
  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "U";
  };

  return (
    <div className="relative flex items-center space-x-4">
      {isAuthenticated && user ? (
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
      ) : (
        // 🔐 Show Login & Signup buttons if not authenticated
        <>
          <Link href="/login" className="flex items-center text-white hover:text-blue-900">
            <FaLock className="mr-1" color="white" /> Login
          </Link>
          <Link href="/signup" className="px-4 py-2 text-white rounded bg-secondary hover:bg-secondary-dark">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default Login_;
