import Image from "next/image";

const BlogPage = async ({data}) => {
  return (
    <div className="p-4 md:mx-12 lg:mx-24 xl:mx-48">
      <div className="flex justify-center">
        <Image
          src={data.data.featured_image}
          alt="hero"
          height={800}
          width={800}
          className="w-full h-auto rounded-3xl"
          priority
        />
      </div>
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row">
          <h1 className="text-2xl md:text-4xl font-bold md:w-[500px]">
            {data.data.title}
          </h1>
          <div className="flex items-center mt-4 md:mt-0 md:ml-4">
            <div className="relative w-12 h-12">
            <Image
              src="/blog1.png"
              alt={data.data.author}
             layout="fill"
                objectFit="cover"
              className="rounded-full"
              sizes="90vw"
            />
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-white/70">
              {data.data.author} 
            </span>
            <div>
          - {data.data.published_date}
          </div>
          </div>
          
        </div>
        <hr className="my-20" />
        <div className="mx-4 md:mx-10 lg:mx-20" dangerouslySetInnerHTML={{ __html: data.data.content }}>
          
          </div>
            
      </div>
      <div className="flex justify-between">
        <h1 className="mt-10 mb-10 text-3xl font-bold tracking-wider">Latest Blog</h1>
      </div>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
     {/**    {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            category={article.category}
            date={article.date}
            description={article.description}
            imageSrc={article.imageSrc}
            button_data={article.button_data}
            slug={article.slug} // Pass the slug to ArticleCard
          />
        ))} */}
      </div>
      
    </div>
  );
};

export default BlogPage;

