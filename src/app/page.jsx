import dynamic from "next/dynamic";
import SectionTitle from "../components/SectionTitle";
import MobileFilter from "../components/MobileFilter";
import fetchData from "@/actions/server";
import Design from "./homepage1/components/Design";
import Latest_course from "@/components/Latest_course";
import Testimonials from "@/components/Testimonials";

// Dynamically imported components
const SpecializationSection = dynamic(() =>
  import("../components/SpecializationSection")
);
const Carasoul = dynamic(() => import("../components/Carasoul"));
const RequestCourse = dynamic(() => import("../components/RequestCourse"));

// Metadata for the page

const Page = async () => {
  const cities = await fetchData(
    "https://backendbatd.clinstitute.co.uk/api/cities?per_page=6&page=1"
  );
  const cities_all = await fetchData(
    "https://backendbatd.clinstitute.co.uk/api/cities"
  );
  const specialization = await fetchData(
    "https://backendbatd.clinstitute.co.uk/api/specializations_courses"
  );
  const specialization_list = await fetchData(
    "https://backendbatd.clinstitute.co.uk/api/specializations"
  );
  const courses = await fetchData(
    "https://backendbatd.clinstitute.co.uk/api/courses?per_page=4&page=1"
  );

  return (
    <section className="overflow-hidden">
  {/* قسم البطل (Hero Section) */}
  <Design iamge={"/Images.png"} search center={false} image_height>
    <h1 className="max-w-3xl md:mt-5 mt-10 text-4xl mx-10 font-semibold text-white md:text-[55px] md:leading-[60px] text-right">
      مرحبًا بك في <br />
      <span className="text-secondary font-bold">TrainEdge</span> <br />
      حلول تدريب الموظفين <br /> المتخصصة
    </h1>
    <p className="max-w-xl mt-4 text-sm mx-10 text-white md:text-xl text-right">
      تعزيز مهارات الموظفين ودفع نمو الأعمال من خلال برامج تدريب مخصصة
      للشركات في جميع أنحاء العالم.
    </p>
    <div className="">
      <MobileFilter
        cities={cities_all.data}
        specialization={specialization_list.data}
      />
    </div>
  </Design>

  {/* قسم التخصصات */}
  <SectionTitle title="اتخذ" highlight="خطوتك الأولى نحو تحقيق الأهداف المهنية" />
  <div className="md:mx-20">
    <SpecializationSection data={specialization.data} />
  </div>

  {/* قسم أحدث الدورات */}
  <div>
    <SectionTitle title="أحدث" highlight="الدورات" />
    <Latest_course courses={courses.data} />
  </div>

  {/* الدورات حسب المدن (Carousel) */}
  <div className=" sm:mt-16">
    <SectionTitle title="الدورات" highlight="المتاحة حسب الموقع" />
    <Carasoul data={cities} />
  </div>

  {/* قسم طلب دورة تدريبية */}
  <div className="">
    <RequestCourse cities={cities_all.data} categories={specialization.data} />
  </div>

  {/* قسم آراء العملاء */}
  <div className=" sm:mt-16">
    <SectionTitle title="ماذا يقول" highlight="عملاؤنا؟" />
    <Testimonials />
  </div>
</section>

  );
};

export default Page;
