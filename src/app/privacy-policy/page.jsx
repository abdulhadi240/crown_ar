"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Design from "../homepage1/components/Design";

const sections = [
  {
    id: "definition",
    title: { en: "Definition", ar: "التعريف" },
    content: {
      en: `
      “Personal Data” refers to any information that can be used to identify an individual directly or indirectly. This includes details such as your name, email address, physical address, telephone number, online identifiers like an IP address or cookies, and other metadata. This definition also extends to sensitive personal data such as racial origin, health, or biometric data, which require enhanced protection under regulations like GDPR.
      `,
      ar: `
      تشير "البيانات الشخصية" إلى أي معلومات يمكن استخدامها للتعرف على فرد بشكل مباشر أو غير مباشر. يشمل ذلك التفاصيل مثل الاسم، البريد الإلكتروني، العنوان المادي، رقم الهاتف، المعرفات عبر الإنترنت مثل عنوان IP أو ملفات تعريف الارتباط، وبيانات أخرى. يمتد هذا التعريف أيضًا ليشمل البيانات الشخصية الحساسة مثل الأصل العرقي، الصحة، أو البيانات البيومترية، والتي تتطلب حماية مشددة بموجب اللوائح مثل اللائحة العامة لحماية البيانات (GDPR).
      `,
    },
  },
  {
    id: "about",
    title: { en: "About British Academy", ar: "حول الأكاديمية البريطانية" },
    content: {
      en: `
      The British Academy is a premier institution specializing in education, training, and professional development. We aim to empower individuals through cutting-edge learning resources, expert faculty, and a commitment to excellence. We adhere to international regulations to ensure data protection and respect for privacy.
      `,
      ar: `
      الأكاديمية البريطانية هي مؤسسة رائدة متخصصة في التعليم، التدريب، والتطوير المهني. تهدف إلى تمكين الأفراد من خلال موارد تعليمية متقدمة، هيئة تدريس خبراء، والتزام بالتميز. نلتزم باللوائح الدولية لضمان حماية البيانات واحترام الخصوصية.
      `,
    },
  },
  {
    id: "rights",
    title: { en: "User's Rights", ar: "حقوق المستخدم" },
    content: {
      en: `
      Users have rights under regulations like GDPR, including:
      - **Right to Access**: Request details of data held.
      - **Right to Rectification**: Correct inaccuracies.
      - **Right to Erasure**: Request deletion under certain conditions.
      - **Right to Restrict Processing**: Limit data usage temporarily.
      - **Right to Data Portability**: Receive data in a machine-readable format.
      - **Right to Object**: Refuse processing for legitimate interests.
      `,
      ar: `
      يتمتع المستخدمون بحقوق بموجب لوائح مثل GDPR، بما في ذلك:
      - **حق الوصول**: طلب تفاصيل البيانات المخزنة.
      - **حق التصحيح**: تصحيح الأخطاء.
      - **حق الحذف**: طلب حذف البيانات في ظروف معينة.
      - **حق تقييد المعالجة**: الحد من استخدام البيانات مؤقتًا.
      - **حق نقل البيانات**: استلام البيانات بتنسيق قابل للقراءة آليًا.
      - **حق الاعتراض**: رفض المعالجة لأغراض المصالح المشروعة.
      `,
    },
  },
  {
    id: "data-collect",
    title: { en: "Data We Collect", ar: "البيانات التي نجمعها" },
    content: {
      en: `
      We collect the following types of data:
      - **Identification Data**: Name, date of birth.
      - **Contact Data**: Email, phone, address.
      - **Technical Data**: IP addresses, browser type.
      - **Usage Data**: Website interactions.
      - **Financial Data**: Payment information (when required).
      `,
      ar: `
      نقوم بجمع الأنواع التالية من البيانات:
      - **بيانات التعريف**: الاسم، تاريخ الميلاد.
      - **بيانات الاتصال**: البريد الإلكتروني، الهاتف، العنوان.
      - **البيانات التقنية**: عناوين IP، نوع المتصفح.
      - **بيانات الاستخدام**: التفاعلات مع الموقع الإلكتروني.
      - **البيانات المالية**: معلومات الدفع (عند الحاجة).
      `,
    },
  },
  {
    id: "legal",
    title: { en: "Legal Grounds and Goals", ar: "الأسس القانونية والأهداف" },
    content: {
      en: `
      Our processing is based on:
      - **Consent**: Explicit permission from the user.
      - **Contractual Necessity**: To fulfill contracts.
      - **Legal Obligation**: Complying with laws.
      - **Legitimate Interests**: Enhancing services and user experience.
      `,
      ar: `
      تعتمد معالجتنا على:
      - **الموافقة**: إذن صريح من المستخدم.
      - **ضرورة تعاقدية**: للوفاء بالعقود.
      - **التزام قانوني**: الامتثال للقوانين.
      - **مصالح مشروعة**: تحسين الخدمات وتجربة المستخدم.
      `,
    },
  },
  {
    id: "storage",
    title: { en: "Terms of Data Storage", ar: "شروط تخزين البيانات" },
    content: {
      en: `
      Data is stored securely for as long as necessary to fulfill its purpose. Storage mechanisms include encryption and access control, ensuring compliance with international standards.
      `,
      ar: `
      يتم تخزين البيانات بأمان طالما كانت ضرورية لتحقيق الغرض منها. تتضمن آليات التخزين التشفير وضوابط الوصول، مع ضمان الامتثال للمعايير الدولية.
      `,
    },
  },
  {
    id: "changes",
    title: { en: "Changes to this Policy", ar: "التغييرات في هذه السياسة" },
    content: {
      en: `
      We may update this Privacy Policy periodically. Significant changes will be communicated via email or in-service notifications.
      `,
      ar: `
      قد نقوم بتحديث سياسة الخصوصية هذه بشكل دوري. سيتم إبلاغ التغييرات المهمة عبر البريد الإلكتروني أو الإشعارات داخل الخدمة.
      `,
    },
  },
];

export default function PrivacyPolicy({ params }) {
  const locale = params?.locale || "en";
  const isArabic = locale === "ar";

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      { rootMargin: "-20% 0px -80% 0px" }
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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <Design secondary bg={true}></Design>
      <div className="bg-[#0A1828] py-8">
        <h1 className="text-center text-3xl font-bold text-white">
          Privacy Policy
        </h1>
      </div>
      <div
        className={`flex min-h-screen flex-col lg:flex-row ${
          isArabic ? "rtl text-right" : "ltr text-left"
        }`}
      >
        {/* Sidebar Navigation */}
        <nav className="lg:w-64 lg:min-h-screen border-r mt-2 bg-background">
          <div className="sticky top-0 p-4 lg:p-6 mt-2">
            <button
              className="lg:hidden mb-4 p-2 bg-accent text-sm rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen
                ? isArabic
                  ? "إخفاء القائمة"
                  : "Hide Menu"
                : isArabic
                ? "إظهار القائمة"
                : "Show Menu"}
            </button>
            <div
              className={cn(
                "space-y-1",
                isMobileMenuOpen ? "block" : "hidden lg:block"
              )}
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full text-left px-2 py-1 text-sm rounded-md transition-all",
                    activeSection === section.id
                      ? "bg-accent text-accent-foreground font-bold"
                      : "hover:bg-accent/50 font-medium"
                  )}
                >
                  {section.title[locale]}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Content Section */}
        <main className="p-4 lg:p-6 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl lg:text-2xl font-bold mb-4">
              {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
            </h1>
            <div className="text-sm text-muted-foreground mb-6">
              <p>
                {isArabic
                  ? "آخر تحديث: 15 مارس 2024"
                  : "Last Update: March 15, 2024"}
              </p>
              <p>
                {isArabic
                  ? "تم النشر: 21 يناير 2021"
                  : "Published: January 21, 2021"}
              </p>
            </div>
            <div className="space-y-8">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={cn(
                    "scroll-mt-16 transition-opacity duration-300",
                    activeSection === section.id ? "opacity-100" : "opacity-50"
                  )}
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {section.title[locale]}
                  </h2>
                  <p className="text-muted-foreground text-base">
                    {section.content[locale]}
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
