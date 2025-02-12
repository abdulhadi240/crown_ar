"use client";
import React, { useState } from "react";
import Image from "next/image";
import HeaderSection from "@/components/HeaderSection";
import Design from "../homepage1/components/Design";
import Link from "next/link";

const Page = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <Design secondary={true} bg={true}></Design>

      <div className="container p-4 mx-auto md:p-10">
        {/* FAQ Section */}
        <div className="flex flex-col p-2 md:mt-16 md:flex-row md:justify-between">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1B2559] dark:text-white mb-6">
              الأسئلة الشائعة – معهد كراون لندن
            </h2>
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div>
                <div
                  onClick={() => toggleFAQ(1)}
                  className="flex items-center justify-between md:w-[80%] py-3 border-b border-gray-200 cursor-pointer"
                >
                  <h3 className="text-lg font-medium text-[#1B2559] dark:text-white">
                    ما أنواع الدورات التي يقدمها معهد كراون لندن؟
                  </h3>
                  <span>{openFAQ === 1 ? "−" : "+"}</span>
                </div>
                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    openFAQ === 1 ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="mb-4 text-sm md:w-[80%] text-gray-500 dark:text-white/80">
                    يقدم المعهد مجموعة واسعة من البرامج التدريبية المهنية، بما
                    في ذلك التدريب المؤسسي، وبرامج تطوير القادة التنفيذيين،
                    ودورات الامتثال واللوائح التنظيمية، والشهادات المتخصصة في
                    مختلف القطاعات، وورش العمل المهارية.
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div>
                <div
                  onClick={() => toggleFAQ(2)}
                  className="flex items-center justify-between md:w-[80%] py-3 border-b border-gray-200 cursor-pointer"
                >
                  <h3 className="text-lg font-medium text-[#1B2559] dark:text-white">
                    من يمكنه الالتحاق بالدورات التدريبية؟
                  </h3>
                  <span>{openFAQ === 2 ? "−" : "+"}</span>
                </div>
                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    openFAQ === 2 ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="mb-4 text-sm md:w-[85%] text-gray-500 dark:text-white/80">
                    تم تصميم دوراتنا للمهنيين وقادة الأعمال ورواد الأعمال
                    والمؤسسات التي تسعى إلى تطوير مهاراتها والحفاظ على
                    تنافسيتها في السوق.
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div>
                <div
                  onClick={() => toggleFAQ(3)}
                  className="flex items-center justify-between md:w-[80%] py-3 border-b border-gray-200 cursor-pointer"
                >
                  <h3 className="text-lg font-medium text-[#1B2559] dark:text-white">
                    هل تقدمون التدريب الحضوري أم عبر الإنترنت؟
                  </h3>
                  <span>{openFAQ === 3 ? "−" : "+"}</span>
                </div>
                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    openFAQ === 3 ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="mb-4 text-sm md:w-[85%] text-gray-500 dark:text-white/80">
                    يختص معهد كراون لندن بالتدريب الحضوري، حيث نوفر جلسات
                    تفاعلية وعملية في مقرنا بلندن أو في مواقع الشركات حسب الطلب.
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div>
                <div
                  onClick={() => toggleFAQ(4)}
                  className="flex items-center justify-between md:w-[80%] py-3 border-b border-gray-200 cursor-pointer"
                >
                  <h3 className="text-lg font-medium text-[#1B2559] dark:text-white">
                    كيف يمكنني التسجيل في دورة تدريبية؟
                  </h3>
                  <span>{openFAQ === 4 ? "−" : "+"}</span>
                </div>
                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    openFAQ === 4 ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="mb-4 text-sm md:w-[85%] text-gray-500 dark:text-white/80">
                    يمكنك التسجيل من خلال ملء استمارة التسجيل الإلكترونية، أو
                    التواصل معنا عبر{" "}
                    <Link href={"/contact"} className="font-bold">
                      البريد الإلكتروني
                    </Link>{" "}
                    أو{" "}
                    <Link href={"/contact"} className="font-bold">
                      الهاتف
                    </Link>{" "}
                    للحصول على المساعدة.
                  </div>
                </div>
              </div>

              {/* FAQ 5 */}
              <div>
                <div
                  onClick={() => toggleFAQ(5)}
                  className="flex items-center justify-between md:w-[80%] py-3 border-b border-gray-200 cursor-pointer"
                >
                  <h3 className="text-lg font-medium text-[#1B2559] dark:text-white">
                    ما طرق الدفع التي تقبلونها؟
                  </h3>
                  <span>{openFAQ === 5 ? "−" : "+"}</span>
                </div>
                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    openFAQ === 5 ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="mb-4 text-sm md:w-[85%] text-gray-500 dark:text-white/80">
                    نقبل عدة طرق للدفع، بما في ذلك بطاقات الائتمان/الخصم،
                    التحويلات البنكية، والفوترة للشركات.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Image Section */}
          <div className="">
            <Image
              src="/faq.webp"
              width={900}
              height={500}
              alt="صورة التخطيط"
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
