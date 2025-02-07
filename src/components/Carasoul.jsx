import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
const BlogPostCarousel = ({data}) => {
  return (
    <section className="py-8">
      <div className="relative overflow-hidden p-4">
        <div className="">
          <div
            className="flex gap-5 justify-center flex-wrap"
          >
            {data?.data.map((post, index) => (
              <Link href={`/${post.slug}`}
                key={index}
                className="flex-shrink-0 w-40 h-40  border-secondary group border-2 rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={post.image}
                  width={220}
                  height={220}
                  alt={post.name}
                  className="group-hover:scale-110 transition-all"
                />
                <div className="py-4 text-start">
                  <h3 className="font-bold text-sm text-center">{post.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Link href={'/cities'} className="flex pt-10 justify-end text-sm items-center text-primary font-bold >">Show More Venues
        <IoMdArrowDropright size={24}/>
        </Link>
      </div>      
    </section>
  );
};

export default BlogPostCarousel;
