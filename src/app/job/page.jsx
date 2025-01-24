import React from "react";
import fetchData from "@/actions/server";
import BlogCarousel from "@/components/BlogCarousel";
import Design from "../homepage1/components/Design";
import Wrapper from "@/components/Wrapper";
import Filteration_Job from "@/components/Filteration_job";

const page = async () => {
  const services = await fetchData(`${process.env.BACKEND_URL}/consultations`)
  const catgory = await fetchData(`${process.env.BACKEND_URL}/categories`)
  const blogs = await  fetchData(`${process.env.BACKEND_URL}/blogs`);
  
  return (
    <div >
      <Design icon_white iamge={"/image_consult.png"} center input={false} image_height={false}>
        <h1 className="max-w-3xl mt-5 text-4xl items-center font-semibold text-white md:text-[55px] md:leading-[60px]">
        Join Our <span className="text-secondary font-bold">Team</span>– Empower Learning, Shape Futures  
          <br />
        </h1>
      </Design>

      <div className="min-h-screen px-4 py-12 bg-white">
        {/* Filter Bar */}
        <Filteration_Job data={services}/>
        
       
      </div>
      <div className="flex justify-center overflow-hidden">
          <h1 className="mt-10 mb-10 text-primary text-center flex justify-center text-3xl font-bold">
          New Articles You May Find Interesting
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
