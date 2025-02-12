import React from "react";
import fetchData from "@/actions/server";
import Filteration from "./components/Filteration";
import BlogCarousel from "@/components/BlogCarousel";
import Design from "../homepage1/components/Design";
import Wrapper from "@/components/Wrapper";

const page = async () => {
  const services = await fetchData(`${process.env.BACKEND_URL}/consultations`);
  const catgory = await fetchData(`${process.env.BACKEND_URL}/categories`);
  const blogs = await fetchData(`${process.env.BACKEND_URL}/blogs`);

  return (
    <div>
      <Design
        icon_white
        iamge={"/image_consult.png"}
        center
        input={false}
        image_height={false}
        search
      >
        <h1 className="max-w-3xl mt-5 text-4xl items-center font-semibold text-white md:text-[55px] md:leading-[60px]">
        اكتشف لدينا{" "}
          <span className="text-secondary font-bold">المشاورات</span> <br />
        </h1>
      </Design>
      <heading>
        <title>جميع الخدمات بالأكاديمية</title>
      </heading>
      <div className="min-h-screen px-4 py-12 bg-white">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl text-primary font-bold">
          الخدمات الاستشارية في الأكاديمية
          </h1>
        </div>
        {/* Filter Bar */}
        <Filteration category={catgory} data={services} />
      </div>
      <div className="flex justify-center overflow-hidden">
        <h1 className="mt-10 mb-10 text-primary text-center flex justify-center text-3xl font-bold">
        مقالات جديدة قد تجدها مثيرة للاهتمام
        </h1>
      </div>
      <div className="flex flex-col overflow-hidden justify-center gap-4 sm:flex-row">
        <Wrapper>
          <BlogCarousel data={blogs} />
        </Wrapper>
      </div>
    </div>
  );
};

export default page;
