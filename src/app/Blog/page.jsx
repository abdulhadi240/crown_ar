import React from "react";
import Design from "../homepage1/components/Design";
import BlogsCategory from "@/components/BlogsCategory";
import fetchData from "@/actions/server";
import Wrapper from "@/components/Wrapper";
import BlogCarousel from "@/components/BlogCarousel";

const page = async () => {

    const category = await fetchData(`${process.env.BACKEND_URL}/blog_categories`)
    const blogs = await fetchData(`${process.env.BACKEND_URL}/blogs`)
    

  return (
    <div>
      <Design icon_white iamge={"/blog3.png"} center input={false} image_height={false}>
        <h1 className="max-w-3xl mt-5 text-4xl items-center font-semibold text-white md:text-[55px] md:leading-[60px]">
          Explore Our <span className="text-secondary font-bold">Blogs</span>{" "}
          <br />
        </h1>
      </Design>


      <div>
        <BlogsCategory category={category.data}/>
      </div>
      {/* Latest Blog Section */}
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
