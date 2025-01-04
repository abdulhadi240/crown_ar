// pages/index.js
import HeaderSection from "@/components/HeaderSection";
import ArticleCard from "../ArticleCard";

export const revalidate = 60; // Revalidate data every 60 seconds

export const dynamicParams = true;

// Fetch Metadata Dynamically
export async function generateMetadata({ params }) {
  const locale = params.locale || "en"; // Fallback to English if no locale is provided

  const product = await fetch(
    `${process.env.BACKEND_URL}/blogs/${params.category}/category`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
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
      locale,
      site_name: "British Academy for Training & Development",
      description,
      url: `https://client-academy.vercel.app/blogs/${params.category}/category`,
      images: [product?.data?.featured_image],
    },
    twitter: {
      site_name: "British Academy for Training & Development",
      description,
      url: `https://client-academy.vercel.app/blogs/${params.category}/category`,
      images: [
        {
          url: "/logobat.png",
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
  const locale = params.locale || "en"; // Determine locale from params

  const articles = await fetch(
    `${process.env.BACKEND_URL}/blogs/${params.category}/category`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
    }
  ).then((res) => res.json());

  return (
    <>
      <HeaderSection />
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-center dark:text-white uppercase">
          {locale === "ar" ? "المقالات" : params.category}
        </h1>
        <p className="mb-8 text-center text-gray-500">
          {locale === "ar"
            ? "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت."
            : "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum ullamcorper et pharetra sem."}
        </p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles?.data?.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                category={article.category}
                date={article.published_date}
                description={article.content}
                imageSrc={article.featured_image}
                button_data={article.tags}
                slug={article.slug}
                params={params.category}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
