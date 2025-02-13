import fetchData from "@/actions/server";
import Design from "@/app/homepage1/components/Design";
import { Blog_Category } from "@/components/Blog_Category";
import BlogCarousel from "@/components/BlogCarousel";
import Wrapper from "@/components/Wrapper";

export const revalidate = 60; // Revalidate data every 60 seconds

export const dynamicParams = true;

// Fetch Metadata Dynamically
export async function generateMetadata({ params }) {
  const category1 = decodeURIComponent(params.category)  
  const product = await fetch(
    `${process.env.BACKEND_URL}/blogs/${category1}/category`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ar",
      },
    }
  ).then((res) => res.json());

  const title =
    product?.data?.meta_title || "British Academy for Training & Development";
  const description =
    product?.data?.meta_description ||
    "British Academy for Training & Development";
  const keywords =
    product?.data?.meta_keywords ||
    "British Academy for Training & Development";

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      site_name: "British Academy for Training & Development",
      description,
      url: `https://client-academy.vercel.app/blogs/${category1}/category`,
      images: [product?.data?.featured_image || 'https://clinstitute.co.uk/Logocrown.webp'],
    },
    twitter: {
      site_name: "British Academy for Training & Development",
      description,
      url: `https://client-academy.vercel.app/blogs/${category1}/category`,
      images: [
        {
          url: "https://clinstitute.co.uk/Logocrown.webp",
          width: 800,
          height: 600,
          alt: "Og Image Alt",
        },
      ],
      card: "summary_large_image",
      creator: "British Acadmey",
    },
  };
}

export async function generateStaticParams() {
  const locales = ["en", "ar"]; // Supported locales
  const posts = await fetch(`${process.env.BACKEND_URL}/blogs/`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  // Check if `posts.data` is an array and generate paths correctly
  if (Array.isArray(posts?.data)) {
    return posts.data.flatMap((post) =>
      post.categories.flatMap((category) =>
        locales.map((locale) => ({
          locale,
          category: category.slug, // Use the slug from each category
        }))
      )
    );
  }

  return []; // Return an empty array if posts data is not iterable
}

// Main Page Component with SSR
export default async function Page({ params }) {
  const category1 = decodeURIComponent(params.category)  

  const articles = await fetch(
    `${process.env.BACKEND_URL}/blogs/${category1}/category?per_page=6&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ar",
      },
    }
  ).then((res) => res.json());

  const blogs = await fetchData(`${process.env.BACKEND_URL}/blogs`)
    
  return (
    <>
      <Design iamge={"/blog3.png"} search center input={false} image_height={false}>
        <h1 className="max-w-3xl mt-5 text-4xl items-center font-semibold text-white md:text-[55px] md:leading-[60px]">
          Explore <span className="text-secondary">
    {category1} {/* Join the words back with spaces */}
  </span>{" "}
          <br />
        </h1>
      </Design>
      <div className="px-4 py-8 mx-auto max-w-7xl">    
        <div className="flex justify-center">
          <Blog_Category initialArticles={articles} params={params}/>
        </div>
      </div>

      {/* Latest Blog Section */}
      <div className="flex justify-center">
          <h1 className="mt-10 mb-10 text-primary text-center flex justify-center text-3xl font-bold">
          Related Articles You May Find Interesting
          </h1>
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Wrapper>
          <BlogCarousel data={blogs} />
          </Wrapper>
        </div>
    </>
  );
}
