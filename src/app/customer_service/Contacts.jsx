"use client";
import React from "react";
import { useParams } from "next/navigation"; // لقراءة المسار الديناميكي
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import ContactCard from "./ContactCard";

export default function Contacts() {
  // 1. قراءة اللغة من المسار (مثل /en أو /ar)
  const params = useParams();
  const locale = params?.locale || "ar"; // الافتراضي "ar"

  // 2. تحديد جميع النصوص بناءً على اللغة
  const labelShareQueries = "شارك استفساراتك معنا";
  const headingEmailTeam = "راسل فريقنا";
  const textSpeakTeam = "تحدث إلى فريقنا الودود.";
  const respondWithin = "نرد خلال 24 ساعة.";

  const labelLiveChat = "الدردشة المباشرة في الركن الأيمن";
  const headingChatWhatsApp = "الدردشة على واتساب";
  const text24_7 = "متاح 24/7";

  const labelLiveTalk = "تحدث مباشرة مع فريقنا";
  const headingCallNow = "اتصل الآن";

  const labelVisitOffice = "قم بزيارة مكتبنا";
  const headingVisitUs = "زرنا!";
  const inPersonSupport = "تفضل بزيارتنا للحصول على دعم شخصي.";

  return (
    <div className="flex justify-center mt-10 sm:mt-20 rtl text-right">
      <div className="grid grid-cols-1 gap-6 px-4 sm:px-16 lg:px-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* 1. بطاقة البريد الإلكتروني */}
        <ContactCard
          label={labelShareQueries}
          size={24}
          Ricons={BiLogoGmail}
          Heading={headingEmailTeam}
          text={textSpeakTeam}
          link="https://mail.google.com/mail/?view=cm&to=cs@clinstitute.co.uk&su=Your%20Subject&body=Your%20Message"
        >
          <p className="text-sm text-gray-600">{respondWithin}</p>
          <p className="text-sm mt-1">cs@clinstitute.co.uk</p>
        </ContactCard>

        {/* 2. بطاقة واتساب */}
        <ContactCard
          label={labelLiveChat}
          size={24}
          Ricons={FaWhatsapp}
          Heading={headingChatWhatsApp}
          text={text24_7}
          link="https://api.whatsapp.com/send/?phone=%2B442035827999&text&type=phone_number&app_absent=0"
        ></ContactCard>

        {/* 3. بطاقة الاتصال الهاتفي */}
        <ContactCard
          label={labelLiveTalk}
          size={24}
          Ricons={FaPhoneAlt}
          Heading={headingCallNow}
          text="344 Grays Inn Rd,  London, England, WC1X 8BP"
          link="./"
        ></ContactCard>

        {/* 4. بطاقة الزيارة */}
        <ContactCard
          label={labelVisitOffice}
          size={24}
          Ricons={FaMapMarkerAlt}
          Heading={headingVisitUs}
          link="https://www.google.com/maps/place/6th+Floor,+2+Kingdom+St,+London+W2+6BD,+UK/@51.5190033,-0.1842779,17z/data=!3m1!4b1!4m6!3m5!1s0x48761aac0c5b8aa3:0x2c6c8204f8814686!8m2!3d51.519!4d-0.181703!16s%2Fg%2F11rhs4yh3t?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D"
        >
          <p className="text-sm text-gray-600">{inPersonSupport}</p>
        </ContactCard>
      </div>
    </div>
  );
}