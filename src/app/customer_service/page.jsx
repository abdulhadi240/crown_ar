"use client";
import React from "react";
import Image from "next/image";
import HeaderSection from "@/components/HeaderSection";
import Contacts from "./Contacts";
import Design from "../homepage1/components/Design";


export default function Page({ params }) {
  // 1. Get locale from route params, default to "en"
  const locale = params?.locale || "en";

  // 2. Check if Arabic
  const isArabic = locale === "ar";

  // 3. Conditionally render text
  const customerServiceHeading =
    isArabic ? "خدمة العملاء" : "CUSTOMER SERVICE";
  const homeCSPath =
    isArabic ? "الرئيسية / خدمة العملاء" : "Home / Customer Service";

  const createTicketTitle =
    isArabic ? "أنشئ تذكرتك الآن" : "CREATE YOUR TICKET NOW";
  const aboutTicket =
    isArabic
      ? "هذا نص تجريبي باللغة العربية لتوضيح كيف يمكن للمستخدم إنشاء التذكرة وكتابة تفاصيل المشكلة."
      : "In diam consequat nec eu. Eu sem nec vel, sollicitudin ipsum viverra sed nibh amet. Nunc, et pharetra, duis tortor dictum nisl. Id vestibulum tincidunt adipiscing gravida risus.";

  const namePlaceholder = isArabic ? "الاسم" : "Name";
  const emailPlaceholder = isArabic ? "البريد الإلكتروني" : "Email";
  const phonePlaceholder = isArabic ? "رقم الهاتف" : "Phone";
  const problemPlaceholder = isArabic ? "المشكلة" : "Problem";
  const createTicketButton = isArabic ? "إنشاء التذكرة" : "Create Ticket";

  return (
    <>
    <Design secondary={true} bg>
    </Design>
    <div className="bg-[#0A1828] py-8">
        <h1 className="text-center text-3xl font-bold text-white">Customer Service</h1>
      </div>
      {/* Contacts Section */}
      <Contacts />

      {/* Horizontal Divider */}
      <div className="flex justify-center">
        <div className="w-full m-20 md:m-32 flex justify-center h-[1px] border-[1px] border-primary mb-10 mt-10" />
      </div>

      {/* Form Section */}
      <div className={`flex mb-10 justify-center ${isArabic ? "rtl text-right" : "ltr text-left"}`}>
        <div className="w-full sm:w-[450px] bg-white dark:text-black shadow-lg p-6 h-auto sm:h-[490px]">
          <h1 className="mb-4 text-2xl font-bold text-center">
            {createTicketTitle}
          </h1>
          <p className="mb-4 text-sm">{aboutTicket}</p>
          <form className="">
            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder={namePlaceholder}
                className={`w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary ${
                  isArabic ? "text-right" : ""
                }`}
                required
              />
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder={emailPlaceholder}
                className={`w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary ${
                  isArabic ? "text-right" : ""
                }`}
                required
              />
            </div>
            {/* Phone Input */}
            <div className="mb-4">
              <input
                type="tel"
                placeholder={phonePlaceholder}
                className={`w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary ${
                  isArabic ? "text-right" : ""
                }`}
                required
              />
            </div>
            {/* Problem Textarea */}
            <div className="mb-4">
              <textarea
                placeholder={problemPlaceholder}
                className={`w-full h-24 py-2 border-b border-gray-300 resize-none focus:outline-none focus:border-primary ${
                  isArabic ? "text-right" : ""
                }`}
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-primary focus:border-primary/80"
            >
              {createTicketButton}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
