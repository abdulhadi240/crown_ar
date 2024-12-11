// pages/index.js
import ArticleCard from '../ArticleCard';

export const revalidate = 60

export const dynamicParams = true 


export async function generateMetadata({ params }) {
  const product = await fetch(`${process.env.BACKEND_URL}/blogs/${params.category}/category`,{
    headers : {
      'Content-Type': 'application/json',
      'Accept-Language' : 'en'
    },
  }).then(
    (res) => res.json()
  )

  const title = product?.data?.meta_title || 'British Academy for Training & Development'
  const description = product?.data?.meta_description || 'British Academy for Training & Development'
  const keywords = product?.data?.meta_keywords || 'British Academy for Training & Development'

  
  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
        type: "website",
        locale: "en_US",
        site_name: "British Academy for Training & Development",
        description: "British Academy for Training & Development",
        url: `https://client-academy.vercel.app/blogs/${params.category}/category`,
        images: [product?.data[0]?.image],
      },
      twitter: {
        site_name: "British Academy for Training & Development",
        description: "British Academy for Training & Development",
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
        creator: "British Acadmey"
      },
    }
  }

export async function generateStaticParams() {
    const posts = await fetch(`${process.env.BACKEND_URL}/blogs/`,{
      headers : {
        'Content-Type': 'application/json',
        'Accept-Language' : 'en'
      },
    }
    ).then((res) =>
      res.json()
    )
    return posts.data.map((post) => ({
      slug:(post.slug),
    }))
  }

export default async function Page({params}) {

  const articles = await fetch(`${process.env.BACKEND_URL}/blogs/${params.category}/category`,{
    headers : {
      'Content-Type': 'application/json',
      'Accept-Language' : 'en'
    },
  }).then(
    (res) => res.json()
  )

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <h1 className="mb-8 text-4xl font-bold text-center dark:text-white uppercase">{params.category}</h1>
      <p className="mb-8 text-center text-gray-500">Lorem ipsum dolor sit amet consectetur adipiscing elit interdum ullamcorper et pharetra sem.</p>
      <div className='flex justify-center'>
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
  );
}


