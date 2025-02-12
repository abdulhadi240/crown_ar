"use client";
import React, { useState } from "react";
import Image from "next/image";
import HeaderSection from "@/components/HeaderSection";
import Contacts from "./Contacts";
import Design from "../homepage1/components/Design";

export default function Page({ params }) {
  const locale = params?.locale || "ar";
  const isArabic = locale === "ar";

  const customerServiceHeading = "خدمة العملاء";
  const createTicketTitle = "أنشئ تذكرتك الآن";
  const aboutTicket =
    "في معهد كراون لندن، نحن ملتزمون بمساعدتك في كل خطوة. ما عليك سوى ملء النموذج أدناه مع وصف موجز لاستفسارك، وسنقوم بالرد عليك في أقرب وقت ممكن.";

  const namePlaceholder = "الاسم";
  const emailPlaceholder = "البريد الإلكتروني";
  const phonePlaceholder = "رقم الهاتف";
  const problemPlaceholder = "المشكلة";
  const createTicketButton = "إنشاء التذكرة";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    po_box: "المشكلة",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    // Create FormData object
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("number", formData.number);
    formPayload.append("po_box", formData.po_box);
    formPayload.append("message", formData.message);

    try {
      const response = await fetch(
        "https://backendbatd.clinstitute.co.uk/api/contact-us",
        {
          method: "POST",
          body: formPayload, // Sending form data
        }
      );

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("تم إرسال النموذج بنجاح!");
        setFormData({
          name: "",
          email: "",
          number: "",
          po_box: "",
          message: "",
        }); // Clear form
      } else {
        setResponseMessage(result.message || "حدث خطأ ما!");
      }
    } catch (error) {
      setResponseMessage("خطأ في الشبكة. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Design secondary={true} bg />
      <div className="bg-[#0A1828] py-8 md:mt-8">
        <h1 className="text-center text-3xl md:pt-6 font-bold text-white">
          {customerServiceHeading}
        </h1>
      </div>

      {/* Contacts Section */}
      <Contacts />

      {/* Divider */}
      <div className="flex justify-center">
        <div className="w-full m-20 md:m-32 flex justify-center h-[1px] border-[1px] border-primary mb-10 mt-10" />
      </div>

      {/* Form Section */}
      <div
        className={`flex mb-10 text-base justify-center rtl text-right`}
      >
        <div className="w-full sm:w-[450px] bg-white dark:text-black shadow-lg p-6 h-auto sm:h-[530px]">
          <h1 className="mb-4 text-2xl font-bold text-center">
            {createTicketTitle}
          </h1>
          <p className="mb-4 text-sm">{aboutTicket}</p>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder={namePlaceholder}
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary text-right"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary text-right"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <input
                type="tel"
                name="number"
                placeholder={phonePlaceholder}
                value={formData.number}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-primary text-right"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="mb-4">
              <textarea
                name="message"
                placeholder={problemPlaceholder}
                value={formData.message}
                onChange={handleChange}
                className="w-full h-24 py-2 border-b border-gray-300 resize-none focus:outline-none focus:border-primary text-right"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-primary focus:border-primary/80"
              disabled={loading}
            >
              {loading ? "جارٍ الإرسال..." : createTicketButton}
            </button>
          </form>

          {/* Response Message */}
          {responseMessage && (
            <p className="mt-4 text-center text-sm text-gray-700">
              {responseMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
