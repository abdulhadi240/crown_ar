'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Wrapper from "./Wrapper";

const schema = z.object({
  fullName: z.string().min(2, { message: "يجب أن يكون الاسم الكامل مكونًا من حرفين على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  mobile: z.string().regex(/^[0-9]{11}$/, { message: "يجب أن يتكون رقم الهاتف من 11 رقمًا" }),
  category: z.string().min(1, { message: "يرجى اختيار فئة" }),
  city: z.string().min(1, { message: "يرجى اختيار مدينة" }),
});

function RequestCourse({ cities, categories }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage("");  

    const formData = new FormData();
    formData.append("full_name", data.fullName);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("category_id", data.category);
    formData.append("city_id", data.city);

    try {
      const response = await fetch("https://backendbatd.clinstitute.co.uk/api/course-request", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Language": "ar",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("فشل الطلب");
      }

      setSuccessMessage("تم إرسال الطلب بنجاح!");
    } catch (error) {
      console.error("خطأ:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row justify-center items-center mx-auto gap-10 md:gap-32 p-4 md:p-6">
        <div className="text-center md:text-right max-w-md">
          <h1 className="text-2xl md:text-5xl font-bold text-[#fcc839]">
            طلب دورة تدريبية
          </h1>
          <p className="text-gray-100 text-sm mt-6 md:text-base w-full md:max-w-80 mt-1">
            تواصل معنا لترتيب دورة تدريبية مخصصة تلبي احتياجاتك.
          </p>
        </div>

        <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-md border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm font-medium">الاسم الكامل</label>
              <input
                {...register("fullName")}
                type="text"
                placeholder="أدخل اسمك الكامل"
                className="w-full mt-1 px-3 py-2 text-primary rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition text-sm"
              />
              {errors.fullName && <p className="text-red-500 text-xs text-start mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-sm font-medium">البريد الإلكتروني</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full mt-1 px-3 py-2 text-primary rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition text-sm"
                />
                {errors.email && <p className="text-red-500 text-start text-xs mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <label className="text-gray-700 text-sm font-medium">رقم الجوال</label>
                <input
                  {...register("mobile")}
                  type="tel"
                  placeholder="أدخل رقم هاتفك"
                  className="w-full mt-1 px-3 py-2 text-primary rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition text-sm"
                />
                {errors.mobile && <p className="text-red-500 text-start text-xs mt-1">{errors.mobile.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-sm font-medium">الفئة</label>
                <select
                  {...register("category")}
                  className="w-full mt-1 px-3 py-2 text-primary rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition bg-white appearance-none text-sm"
                >
                  <option value="">اختر فئة</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-start text-xs mt-1">{errors.category.message}</p>}
              </div>
              
              <div>
                <label className="text-gray-700 text-sm font-medium">المدينة</label>
                <select
                  {...register("city")}
                  className="w-full mt-1 px-3 py-2 text-primary rounded border border-secondary focus:ring-2 focus:ring-amber-400 focus:outline-none transition bg-white appearance-none text-sm"
                >
                  <option value="">اختر مدينة</option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-start text-xs mt-1">{errors.city.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white font-medium py-2 px-4 rounded-md hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? "جارٍ المعالجة..." : "إرسال الطلب"}
              </button>
            </div>
          </form>

          {/* رسالة النجاح */}
          {successMessage && (
            <div className="mt-4 text-xs text-primary text-start font-semibold">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default RequestCourse;
