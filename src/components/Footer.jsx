import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t-[1px] border-[#c3c3c3] shadow-lg overflow-hidden">
      <div className="bg-white text-primary">
        <div className="container px-4 py-6">
          <div className="md:flex md:flex-row flex flex-col justify-between gap-10">
            {/* العمود الأيسر */}
            <div className="">
              <Image
                src="/Logocrown.webp"
                alt="شعار معهد كراون"
                width={150}
                height={150}
                className="mb-4 -mt-12"
              />
              <div className="space-y-4 px-4">
                <h3 className="text-xl font-semibold">عن معهد كراون</h3>
                <p className="text-sm w-full md:w-[250px] leading-relaxed">
                  معهد كراون لندن هو مؤسسة تدريبية رائدة ملتزمة بتقديم برامج تطوير مهني عالية الجودة. يقع في قلب لندن، ويتميز بتزويد الأفراد والمنظمات بالمهارات والمعرفة اللازمة للنجاح في بيئة الأعمال الديناميكية اليوم.
                </p>
                <div className="flex items-start md:space-x-2">
                  <svg
                    className="w-5 hidden md:block h-5 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-sm md:w-[250px] w-full">
                    عنوان المكتب: الطابق السادس، 2 شارع كينجدوم، لندن W2 6BD، المملكة المتحدة
                  </p>
                </div>
              </div>
            </div>

            {/* العمود الأوسط - خريطة العالم */}
            <div className="hidden md:block">
              <Image
                src={"/map1.png"}
                width={800}
                height={800}
                alt="الخريطة"
                className="flex mt-16 items-center justify-center"
              />
            </div>

            {/* العمود الأيمن */}
            <div className="w-96 px-4 md:px-0">
              <h3 className="text-xl font-semibold mb-6">روابط سريعة</h3>
              <nav className="space-y-3">
                {[
                  { name: "الرئيسية", link: "/" },
                  { name: "خدماتنا", link: "/academy-service" },
                  { name: "خدمة العملاء", link: "/customer_service" },
                  { name: "الوظائف", link: "/job" },
                  { name: "فريق العمل", link: "/team-staff" },
                  { name: "الملف الشخصي", link: "/account" },
                  { name: "المدونة", link: "/Blog" },
                  { name: "سياسة الخصوصية", link: "/privacy-policy" },
                  { name: "اتصل بنا", link: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* شريط وسائل التواصل الاجتماعي */}
        <div className="border-t border-gray-800 bg-primary">
          <div className="mx-auto px-4 py-4">
            <div className="flex justify-center space-x-6">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Icon className={`w-5 h-5 ${index === 1 ? 'mr-6' : ''}`} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
