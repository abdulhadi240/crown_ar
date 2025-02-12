"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Design from "../homepage1/components/Design";

const sections = [
  {
    id: "introduction",
    title: "معهد كراون لندن",
    content: `
تاريخ السريان: 1 فبراير 2025
يحرص معهد كراون لندن على حماية خصوصيتك وضمان التعامل مع بياناتك الشخصية بأمان وفقًا للقوانين المعمول بها في المملكة المتحدة، بما في ذلك اللائحة العامة لحماية البيانات في المملكة المتحدة (UK GDPR) وقانون حماية البيانات لعام 2018.
توضح هذه السياسة كيفية جمع بياناتك الشخصية واستخدامها وتخزينها وحمايتها عند تسجيلك في دوراتنا التدريبية أو عند تفاعلك مع خدماتنا.
    `,
  },
  {
    id: "information-we-collect",
    title: "1. البيانات التي نقوم بجمعها",
    content: `
عند التسجيل في إحدى دوراتنا أو استخدام خدماتنا، قد نقوم بجمع البيانات الشخصية التالية:

المعلومات الشخصية –  الاسم الكامل، المسمى الوظيفي، وبيانات جهة العمل.
معلومات الاتصال: رقم الهاتف، عنوان البريد الإلكتروني، والعنوان البريدي.
معلومات الدفع: تفاصيل الفوترة الخاصة بتسجيل الدورات والمعاملات المالية.
التفضيلات التدريبية: الدورات التي تهمك وسجلك التدريبي.
خيارات التسويق: موافقتك على تلقي التحديثات والعروض الترويجية
    `,
  },
  {
    id: "how-we-use-your-data",
    title: "2. كيفية استخدام بياناتك",
    content: `
نستخدم بياناتك الشخصية للأغراض التالية:
إدارة التسجيل في الدورات: معالجة تسجيلك في الدورات التدريبية وإدارة مشاركتك بها.
التواصل الفعّال: إرسال تأكيدات التسجيل، تحديثات الدورات، والرد على استفساراتك.
التسويق والتواصل المستقبلي: تزويدك بمعلومات حول الدورات الجديدة والعروض والخدمات ذات الصلة، إذا كنت قد منحتنا موافقتك على ذلك.
الامتثال القانوني: الامتثال للالتزامات القانونية والمتطلبات التنظيمية في المملكة المتحدة.
    `,
  },
  {
    id: "data-retention",
    title: "3. مدة الاحتفاظ بالبياناتn",
    content: `
    نحتفظ ببياناتك الشخصية فقط للمدة الضرورية لتحقيق الأغراض الموضحة في هذه السياسة. إذا سجلت في إحدى دوراتنا، فقد نحتفظ بمعلوماتك للتواصل معك مستقبلًا، ما لم تطلب حذفها.
    `,
  },
  {
    id: "data-security",
    title: "4. حماية البيانات والأمان",
    content: `
نتخذ تدابير أمنية وتقنية صارمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الاستخدام غير القانوني أو الفقدان أو التلف.    `,
  },
  {
    id: "sharing-your-data",
    title: "5. مشاركة البيانات",
    content: `
لا نقوم ببيع بياناتك الشخصية أو تأجيرها، ولكن قد نشاركها في الحالات التالية:
مع مزودي الخدمات: مثل الشركات التي تساعد في إدارة الدورات التدريبية، ودعم تكنولوجيا المعلومات، ومعالجة المدفوعات.
للامتثال القانوني: عندما يكون ذلك مطلوبًا بموجب القانون أو بناءً على طلب الجهات التنظيمية.
    `,
  },
  {
    id: "your-rights",
    title: "6. حقوقك بموجب اللائحة العامة لحماية البيانات في المملكة المتحدة (UK GDPR)",
    content: `
يحق لك:
الوصول إلى بياناتك الشخصية التي نحتفظ بها.
تصحيح أي بيانات غير دقيقة أو غير مكتملة.
سحب الموافقة على تلقي الاتصالات التسويقية في أي وقت.
طلب حذف بياناتك الشخصية، وفقًا للالتزامات القانونية.
الاعتراض على معالجة بياناتك في بعض الحالات.
    `,
  },
  {
    id: "contact",
    title: "7. كيفية التواصل معنا",
    content: `
إذا كانت لديك أي استفسارات أو رغبت في ممارسة حقوقك، يمكنك التواصل معنا عبر:
معهد كراون لندن
الطابق السادس، 2 كينغدوم ستريت Kingdom St) (2، لندن W2 6BD، المملكة المتحدة
البريد الإلكتروني: privacy@clinstitute.co.uk
    `,
  },
  {
    id: "updates",
    title: "8. تحديث سياسة الخصوصية",
    content: `
قد يتم تحديث هذه السياسة من وقت لآخر لمواكبة التغيرات في القوانين أو في ممارساتنا التشغيلية. سيتم إخطارك بأي تغييرات جوهرية.
عند تسجيلك في دوراتنا أو استخدام خدماتنا، فإنك تقر بأنك قد قرأت هذه السياسة وفهمتها ووافقت عليها.
    `,
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const observerRef = useRef(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    sections.forEach((section) => {
      sectionRefs.current[section.id] = document.getElementById(section.id);
    });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.4 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Design secondary bg={true} />
      <div className="bg-[#0A1828] py-4">
        <h1 className="text-center md:mt-10 md:pt-6 text-3xl items-center font-bold text-white">
        معهد كراون لندن
        </h1>
      </div>
      <div className="flex min-h-screen flex-col lg:flex-row text-left bg-white">
        {/* Sidebar Navigation */}
        <nav
          className={cn(
            "lg:w-[320px] lg:min-h-screen border-r mt-2 bg-white transition-transform transform lg:block",
            isSidebarOpen ? "block" : "lg:block hidden"
          )}
        >
          <div className="sticky top-0 p-4 lg:p-6 mt-2">
            <button
              onClick={toggleSidebar}
              className="lg:hidden block p-4 mb-4 text-lg font-bold text-black"
            >
              {isSidebarOpen ? "Close Menu" : "Open Menu"}
            </button>
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full text-left px-2 py-1 text-sm rounded-md transition-all text-black",
                    activeSection === section.id
                      ? "text-black font-bold"
                      : "text-black/70 font-medium"
                  )}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Content Section */}
        <main className="p-4 lg:p-6 overflow-hidden bg-white flex-1">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={cn(
                    "scroll-mt-16 transition-opacity duration-300 p-4 text-black",
                    activeSection === section.id ? "opacity-100 text-black" : "opacity-80 text-black/70"
                  )}
                >
                  <h2 className="text-xl font-semibold mb-2 text-right">{section.title}</h2>
                  <p className="text-black text-base whitespace-pre-line text-right">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
