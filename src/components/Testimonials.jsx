import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  return (
    <div>
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6">
          {/* Testimonial Wall */}
          <div className="mb-12 gap-8 py-8 [column-count:1] md:mb-16 md:[column-count:2] lg:mb-20 lg:[column-count:3]">
            {/* Testimonial 1 */}
            <div className="mb-8 gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-8">
              <div className="mb-5 flex flex-row items-center">
                <Avatar className="text-sm text-primary ml-3
">
                  <AvatarImage src="https://github.com/shadcn.png1" />
                  <AvatarFallback className="text-primary">أح</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h6 className="text-base font-semibold -mt-1">أحمد المنصوري</h6>
                  <p className="text-sm text-gray-500">دورة إدارة المشاريع</p>
                </div>
              </div>
              <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                "كانت دورة إدارة المشاريع في معهد كراون لندن تجربة استثنائية. المدربون محترفون للغاية، والمحتوى غني بالرؤى العملية. أشعر الآن بثقة أكبر في إدارة المشاريع بفعالية."
              </p>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0ce62f8d5ba_Vector.svg"
                    alt="نجمة"
                    className="w-4"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="mb-8 gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-8">
              <div className="mb-5 flex flex-row items-center">
                <Avatar className="text-sm text-primary ml-3
">
                  <AvatarImage src="https://github.com/shadcn.png1" />
                  <AvatarFallback className="text-primary">فا</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h6 className="text-base font-semibold -mt-1">فاطمة السيد</h6>
                  <p className="text-sm text-gray-500">دورة القيادة الإدارية</p>
                </div>
              </div>
              <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                "غيرت هذه الدورة التدريبية في القيادة نهجي في إدارة الفرق. ساعدتني الجلسات التفاعلية ودراسات الحالة الواقعية على تطوير مهارات قيادية قوية. أوصي بشدة بهذه الدورة!"
              </p>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0ce62f8d5ba_Vector.svg"
                    alt="نجمة"
                    className="w-4"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="mb-8 gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-8">
              <div className="mb-5 flex flex-row items-center">
                <Avatar className="text-sm text-primary ml-3
">
                  <AvatarImage src="https://github.com/shadcn.png1" />
                  <AvatarFallback className="text-primary">خا</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h6 className="text-base font-semibold -mt-1">خالد الفارسي</h6>
                  <p className="text-sm text-gray-500">دورة التواصل التجاري</p>
                </div>
              </div>
              <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                "حسنت دورة التواصل التجاري من قدرتي على التواصل الفعال في البيئات المؤسسية. أحدثت التمارين العملية والإرشادات الخبيرة فرقًا كبيرًا في تفاعلاتي المهنية."
              </p>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0ce62f8d5ba_Vector.svg"
                    alt="نجمة"
                    className="w-4"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="mb-8 gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-8">
              <div className="mb-5 flex flex-row items-center">
                <Avatar className="text-sm text-primary ml-3
">
                  <AvatarImage src="https://github.com/shadcn.png1" />
                  <AvatarFallback className="text-primary">لي</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h6 className="text-base font-semibold -mt-1">ليلى حسن</h6>
                  <p className="text-sm text-gray-500">دورة إدارة الموارد البشرية</p>
                </div>
              </div>
              <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                "وفرت دورة إدارة الموارد البشرية معرفة متعمقة عن الممارسات الحديثة. أصبح لدي فهم أفضل للتوظيف وعلاقات الموظفين وإدارة الأداء. برنامج ممتاز!"
              </p>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0ce62f8d5ba_Vector.svg"
                    alt="نجمة"
                    className="w-4"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="mb-8 gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-8">
              <div className="mb-5 flex flex-row items-center">
                <Avatar className="text-sm text-primary ml-3
">
                  <AvatarImage src="https://github.com/shadcn.png1" />
                  <AvatarFallback className="text-primary">عم</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h6 className="text-base font-semibold -mt-1">عمر الدباغ</h6>
                  <p className="text-sm text-gray-500">دورة التسويق الرقمي</p>
                </div>
              </div>
              <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                "اكتسبت مهارات قيمة في التسويق الرقمي طبقتها فورًا على عملي. غطت الدورة تحسين محركات البحث واستراتيجيات الوسائط الاجتماعية والتسويق بالمحتوى بتفصيل ممتاز. تغيير حقيقي للعبة!"
              </p>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0ce62f8d5ba_Vector.svg"
                    alt="نجمة"
                    className="w-4"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="mb-8 gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-8">
              <div className="mb-5 flex flex-row items-center">
                <Avatar className="text-sm text-primary ml-3">
                  <AvatarImage src="https://github.com/shadcn.png1" />
                  <AvatarFallback className="text-primary">هد</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h6 className="text-base font-semibold mt-1">هدى النجار</h6>
                  <p className="text-sm text-gray-500">دورة الإدارة المالية</p>
                </div>
              </div>
              <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                "ساعدتني دورة الإدارة المالية في تعزيز مهارات التخطيط المالي والتحليل. شرح المدربون المفاهيم المالية المعقدة بطريقة بسيطة وعملية. دورة يجب حضورها!"
              </p>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0ce62f8d5ba_Vector.svg"
                    alt="نجمة"
                    className="w-4"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;