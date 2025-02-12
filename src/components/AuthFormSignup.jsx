'use client';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

// 🎯 مخطط التحقق من الصحة
const schema = yup.object().shape({
  name: yup.string().min(3, "يجب أن يكون الاسم 3 أحرف على الأقل").required("الاسم مطلوب"),
  username: yup.string().min(3, "يجب أن يكون اسم المستخدم 3 أحرف على الأقل").required("اسم المستخدم مطلوب"),
  email: yup.string().email("تنسيق البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
  password: yup.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "يجب أن تتطابق كلمتا المرور")
    .required("تأكيد كلمة المرور مطلوب"),
});

const AuthFormSignup = () => {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 إرسال النموذج
  const onSubmit = async (formData) => {
    setApiError(null);
    setIsLoading(true);

    try {
      const response = await axios.post("https://backendbatd.clinstitute.co.uk/api/register", {
        ...formData,
        locale: "ar",
      });
      if(response?.message){
        setApiError(response?.message || "حدث خطأ ما.");
      }
      navigate.push("/login"); // ✅ إعادة التوجيه إلى صفحة تسجيل الدخول بعد التسجيل الناجح
    } catch (error) {
      setApiError(error.response?.data?.message || "حدث خطأ ما.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 text-sm md:w-[500px] min-w-[350px] -mt-10">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">إنشاء حساب</h2>
        {apiError && <p className="text-red-500 text-center">{apiError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* حقل الاسم */}
          <div>
            <label className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
            <input
              type="text"
              {...register("name")}
              className="w-full text-primary p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              placeholder="أدخل اسمك الكامل"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* حقل اسم المستخدم */}
          <div>
            <label className="block text-sm font-medium text-gray-700">اسم المستخدم</label>
            <input
              type="text"
              {...register("username")}
              className="w-full text-primary p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              placeholder="اختر اسم مستخدم"
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>

          {/* حقل البريد الإلكتروني */}
          <div>
            <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input
              type="email"
              {...register("email")}
              className="w-full text-primary p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              placeholder="أدخل بريدك الإلكتروني"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* حقل كلمة المرور */}
          <div>
            <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input
              type="password"
              {...register("password")}
              className="w-full text-primary p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              placeholder="أدخل كلمة مرور قوية"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* حقل تأكيد كلمة المرور */}
          <div>
            <label className="block text-sm font-medium text-gray-700">تأكيد كلمة المرور</label>
            <input
              type="password"
              {...register("password_confirmation")}
              className="w-full text-primary p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              placeholder="أكد كلمة المرور"
            />
            <p className="text-red-500 text-sm">{errors.password_confirmation?.message}</p>
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            className={`w-full p-3 text-white font-bold rounded-md transition duration-200 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/80"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "جاري التسجيل..." : "تسجيل"}
          </button>
        </form>

        {/* الانتقال إلى تسجيل الدخول */}
        <p className="text-center text-gray-600">
          لديك حساب بالفعل؟ {" "}
          <Link href={'/sign-in'}
            className="text-secondary cursor-pointer hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthFormSignup;
