"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "./context/AuthContext";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const AuthForm = () => {
  const { login } = useAuth(); // ✅ Ensure useAuth() is working
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false); // ✅ Store error messages
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.username, data.password, "en"); // ✅ Call login function
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage(true); // ✅ Display error
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg md:w-[400px] w-[300px] text-sm -mt-16">
      <h1 className="text-xl font-semibold text-center text-gray-700">
        Welcome Back!
      </h1>
      <p className="mt-2 text-sm text-gray-500 text-center">
        Login to access your account.
      </p>

      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Username Input */}
        <div className="flex flex-col">
          <label className="ml-3 text-sm text-gray-600">User Name</label>
          <div className="bg-white rounded-full border border-gray-300 px-3 py-2">
            <input
              type="text"
              {...register("username")}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Enter your Email"
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs ml-3">{errors.username.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label className="ml-3 text-sm text-gray-600">Password</label>
          <div className="bg-white rounded-full border border-gray-300 px-3 py-2">
            <input
              type="password"
              {...register("password")}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Enter your Password"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs ml-3">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between text-xs text-gray-500">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-primary" />
            Remember me
          </label>
          <a href="/forgot-password" className="hover:text-primary">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 p-3 text-white rounded-full bg-primary hover:bg-[#1F3A98] transition-all"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Display Error Message Below Form */}
        {errorMessage && (
          <p className="text-red-500 text-xs text-start mt-3">{'Invalid Email or Password'}</p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
