import fetchData from '@/actions/server';
import HeaderSection from '@/components/HeaderSection';
import Image from 'next/image';
import React from 'react'


export const revalidate = 60;
export const dynamicParams = true;




async function fetchConsultData(slug) {
  return fetchData(`${process.env.BACKEND_URL}/consultations/${slug}`);
}

// --------- GENERATE METADATA FUNCTION ---------
export async function generateMetadata({ params }) {
  const { service } = params;

  // Fetch course or blog details based on slug
  const [consultingData] = await Promise.all([
    fetchConsultData(service),
  ]);

  const data = consultingData

  if (!data) {
    return {
      title: "Page Not Found",
      description: "The requested page does not exist.",
    };
  }

  return {
    title: data?.data?.meta_title || "British Academy for Training & Development",
    description: data?.data?.meta_description || "Explore top courses and blogs",
    keywords: data?.data?.meta_keywords || "training, courses, blogs, development",
    alternates: {
      canonical: `https://clinstitute.co.uk/consulting-services/${service}`,
    },
    openGraph: {
      title: data?.data?.meta_title,
      description: data?.data?.meta_description,
      url: `https://clinstitute.co.uk/consulting-services/${service}`,
      images: [
        {
          url: data?.data?.image || "/logobat.webp",
          width: 800,
          height: 600,
          alt: data?.data?.meta_title || "Course Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.data?.meta_title,
      description: data?.data?.meta_description,
      images: [data?.data?.image || "/logobat.webp"],
    },
  };
}

export async function generateStaticParams() {
    const posts = await fetch(`${process.env.BACKEND_URL}/consultations`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,
      },
    }).then((res) => res.json());
    return posts.data.map((post) => ({
      id: post.id,
    }));
  }

const page = async ({params}) => {
    const details = await fetch(
        `${process.env.BACKEND_URL}/consultations/${params.service}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": `${process.env.LOCALE_LANGUAGE}`,
        },
        }
      ).then((res) => res.json());
  return (
    <div>
    <HeaderSection />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2 uppercase">{details.data.title}</h1>
        <p className="text-gray-600">{details.data.category}</p>
      </div>

      {/* Image Gallery Section */}
      <div className="grid grid-cols-12 gap-4 mb-16">
        <div className="col-span-8">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Team collaboration"
            width={600}
            height={400}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <div className="col-span-4 grid gap-4">
          <Image
            src="/placeholder.svg?height=195&width=300"
            alt="Team meeting"
            width={300}
            height={195}
            className="rounded-lg w-full h-full object-cover"
          />
          <Image
            src="/placeholder.svg?height=195&width=300"
            alt="Team discussion"
            width={300}
            height={195}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
      </div>

      {/* What We Do Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4">What we do</h2>
        <p dangerouslySetInnerHTML={{ __html: details.data.content }}></p>      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">100M</div>
          <div className="text-gray-600">Client Satisfaction</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">24 h</div>
          <div className="text-gray-600">Expert Support Team</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">98 k+</div>
          <div className="text-gray-600">Sales Count</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">208 +</div>
          <div className="text-gray-600">Count Worldwide</div>
        </div>
      </div>

      {/* Our Lorem Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Lorem</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in
            ante viverra, rutrum erat rutrum, consectetur mi. Proin at
            maximus est. Nullam purus ex, iaculis sed erat sed, blandit
            tincidunt quam. Cras scelerisque id quam sed dignissim.
          </p>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in
            ante viverra, rutrum erat rutrum, consectetur mi. Proin at maximus
            est. Nullam purus ex, iaculis sed erat sed, blandit tincidunt quam.
          </p>
        </div>
        <div>
          <Image
            src="/placeholder.svg?height=300&width=500"
            alt="Digital tablet"
            width={500}
            height={300}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mb-12">
        <button className="bg-blue-900 text-white px-6 py-2 rounded-full mb-8">
          See more
        </button>
        <h2 className="text-2xl font-bold mb-8">loreme loremloreme lorem<br />loreme lorem</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-900 p-4 rounded-lg">
              <div className="w-8 h-8 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Proin in ante viverra, rutrum erat rutrum, consectetur
                mi. Proin at maximus est. Nullam purus ex.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-blue-900 p-4 rounded-lg">
              <div className="w-8 h-8 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-bold mb-2">Team work</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Proin in ante viverra, rutrum erat rutrum, consectetur
                mi. Proin at maximus est. Nullam purus ex.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>


    </div>
  )
}

export default page