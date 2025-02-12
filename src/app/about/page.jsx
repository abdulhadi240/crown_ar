import HeaderSection from "@/components/HeaderSection";
import Image from "next/image";
import Stats from "./components/Stats";
import { CheckCircle } from "lucide-react";
import Carasoul from "./components/Carasoul";
import Link from "next/link";
import Hero from "./components/Hero";
import Design from "../homepage1/components/Design";


const benefits = [
  {
    title: "مدربون من نخبة الخبراء",
    description: "يضم فريقنا نخبة من الخبراء المتخصصين وقادة الفكر في مختلف المجالات، حيث يقدمون خبراتهم العملية المبنية على تجارب حقيقية، مما يثري تجربة التعلم ويجعلها أكثر ارتباطًا بسوق العمل.",
  },
  {
    title: "تدريب عملي وتطبيقي",
    description: "نعتمد على أساليب تعليمية تفاعلية تشمل دراسات الحالة، وتمارين محاكاة الواقع، وورش عمل تطبيقية، لضمان اكتساب المشاركين مهارات عملية قابلة للتنفيذ الفوري في بيئة العمل.",
  },
  {
    title: "برامج تدريبية مصممة خصيصًا",
    description: "نؤمن بأن لكل مؤسسة احتياجاتها الفريدة، لذا نقدم حلولًا تدريبية مخصصة تلبي متطلباتها الاستراتيجية وتعزز قدراتها التنافسية.",
  },


];


export default function ConsultingPage({params}) {  
  return (
    <>
      <Design secondary bg></Design>
      <main className="max-w-7xl mx-auto px-4 overflow-hidden sm:px-6 lg:px-8 py-12 text-base">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:mt-10 md:pt-6 font-bold mb-2 uppercase">عن معهد كراون لندن </h1>
          <p className="text-gray-600">
          تمكين المهنيين، وصناعة مستقبل أكثر تطورًا.
          </p>
        </div>

        {/* Hero Section */}
        <Hero/>

        {/* What We Do Section */}
        <div className="my-16 overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">معهد كراون لندن</h2>
          <p className="text-gray-600 mb-4">
          يعد معهد كراون لندن من أبرز مزودي التدريب المهني، حيث يلتزم بتقديم برامج تطوير مهني عالية الجودة. يقع المعهد في قلب لندن، ويختص بتزويد الأفراد والمؤسسات بالمهارات والمعرفة اللازمة للنجاح في بيئة الأعمال المتغيرة. تم تصميم دوراتنا لتواكب احتياجات المهنيين في مختلف القطاعات، مما يساعدهم على التقدم والتميز في سوق عمل تنافسي.          </p>
        </div>
        <div className="flex justify-center mb-20">
          <div className="flex flex-row gap-16 justify-center md:p-6 md:px-10 rounded-full md:bg-[#f9f9f9] flex-wrap">
            <Stats number={95} icon={"%"} text={"معدل رضا المشاركين عن الدورات"} />
            <Stats number={5000} icon={"+"} text={"مهني تم تدريبهم"} />
            <Stats number={100} icon={"+"} text={"شركة شريكة"} />
            <Stats number={85} icon={"%"} text={"من عملائنا يعودون للتدريب معنا"} />
          </div>
        </div>

        {/* Our Lorem Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">رسالتنا</h2>
            <p className="text-gray-600 mb-4">
            نسعى في معهد كراون لندن إلى تمكين المهنيين والمؤسسات من خلال برامج تدريبية متطورة تعزز الابتكار والقيادة والتميز. نؤمن بأن التعلم المستمر هو مفتاح النجاح، لذلك نحرص على تقديم تعليم عملي متوافق مع متطلبات السوق، مما يسهم في تطوير المسارات المهنية وتحسين أداء المؤسسات.
            </p>
          </div>
          <div>
            <Image
              src="/aboutus.webp"
              alt="Digital tablet"
              width={500}
              height={300}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-8">
          ما نقدمه
          </h2>
          <div className="grid md:grid-cols-2 items-start gap-8">
            <div className="flex items-start  gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <div className="w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-bold mb-2">التدريب المؤسسي</h3>
                <p className="text-gray-600">
                برامج مخصصة للمنظمات التي تسعى إلى تطوير مهارات فرق العمل.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <div className="w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-bold mb-2">تطوير القيادات التنفيذية</h3>
                <p className="text-gray-600">
                 تدريب متقدم لرواد الأعمال وكبار المحترفين.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <div className="w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-bold mb-2">الدورات التقنية والمتخصصة </h3>
                <p className="text-gray-600">
                تدريب متخصص في مجالات مثل التمويل، وإدارة المشاريع، والتكنولوجيا، والرعاية الصحية، وغيرها
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary p-4 rounded-lg">
                <div className="w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-bold mb-2">التدريب على الامتثال واللوائح</h3>
                <p className="text-gray-600">
                لضمان التزام الأفراد والشركات بالمعايير التنظيمية.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* What Will You Get Section */}
        <div className="">
          <div className="grid md:grid-cols-2 md:mx-20 mb-20 ">
            <div className="hidden md:block relative">
              <Image
                src="/about.webp"
                alt="Person pointing"
                width={500}
                height={500}
                className="rounded-lg z-50 p-4"
              />
              <div className="bg-[#efd8c9] absolute bottom-0 w-[70%] -z-10 rounded-lg h-[70%]"/>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center flex-col">
                <h2 className="text-2xl text-center font-bold mb-6">
                لماذا تختار معهد كراون لندن؟
                </h2>
                <div className="flex justify-center">
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start md:gap-4 gap-2"
                      >
                        <CheckCircle className=" w-10 md:w-6 h-6 text-blue-900 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600">{benefit.title}</p>
                          <p className="text-sm text-gray-400 mt-1">
                           {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section 
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-start md:text-center">Colleague & team members</h2>
          </div>

          <div className="">
            <Carasoul />
          </div>
        </div>*/}
      </main>
    </>
  );
}
