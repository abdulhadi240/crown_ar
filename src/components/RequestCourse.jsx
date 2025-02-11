'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Wrapper from "./Wrapper";

const schema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().regex(/^[0-9]{11}$/, { message: "Mobile number must be 11 digits" }),
  category: z.string().min(1, { message: "Please select a category" }),
  city: z.string().min(1, { message: "Please select a city" }),
});

function RequestCourse({ cities, categories }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");  // Added state for success message

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage("");  // Reset the success message before submitting

    const formData = new FormData();
    formData.append("full_name", data.fullName);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("category_id", data.category);
    formData.append("city_id", data.city);

    try {
      const response = await fetch("https://backendbatd.clinstitute.co.uk/api/course-request", {
        method: "POST",
        "Accept-Language": "en",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      // If successful, display the success message
      setSuccessMessage("Request sent successfully!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row justify-center items-center mx-auto  gap-10 md:gap-32 p-4 md:p-6">
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-2xl md:text-5xl font-bold text-[#fcc839]">
            Request a Course
          </h1>
          <p className="text-gray-100 text-sm mt-6 md:text-base w-full md:max-w-80 mt-1">
            Get in touch with us to arrange a customized course tailored to your needs.
          </p>
        </div>

        <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-md border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm font-medium">Full Name</label>
              <input
                {...register("fullName")}
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-1 px-3 py-2 rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition text-sm"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-sm font-medium">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 py-2 rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition text-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <label className="text-gray-700 text-sm font-medium">Mobile Number</label>
                <input
                  {...register("mobile")}
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="w-full mt-1 px-3 py-2 rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition text-sm"
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-sm font-medium">Category</label>
                <select
                  {...register("category")}
                  className="w-full mt-1 px-3 py-2 rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition bg-white appearance-none text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>
              
              <div>
                <label className="text-gray-700 text-sm font-medium">City</label>
                <select
                  {...register("city")}
                  className="w-full mt-1 px-3 py-2 rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition bg-white appearance-none text-sm"
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white font-medium py-2 px-4 rounded-md hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? "Processing..." : "Send Request"}
              </button>
            </div>
          </form>

          {/* Success message */}
          {successMessage && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default RequestCourse;
