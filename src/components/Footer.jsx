import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t-2  border-[#c3c3c3] shadow-lg mt-10 overflow-hidden">
      <div className="bg-white text-primary">
        <div className="container  px-4 py-12">
          <div className="md:flex md:flex-row flex flex-col justify-between gap-10">
            {/* Left Column */}
            <div className="space-y-6">
              <Image
                src="/logo1.png"
                alt="trainEdge Logo"
                width={100}
                height={100}
                className="mb-4"
              />
              <div className="space-y-4 ">
                <h3 className="text-xl font-semibold">About the Academy</h3>
                <p className="text-sm max-w-md leading-relaxed">
                  The British Academy, we're dedicated to supporting you at every step. If you have questions about our
                  courses or services, or if you need additional information, simply complete the section below with a
                  brief description of your needs, and we'll respond promptly.
                </p>
                <div className="flex items-start md:space-x-2">
                  <svg className="w-5 hidden md:block h-5 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-sm max-w-lg">Training Venue 1: 344-354 Gray's Inn Road, London, England, WC1X 8BP</p>
                </div>
              </div>
            </div>

            {/* Middle Column - World Map */}
            <div className="hidden md:block">
              <Image src={'/map1.png'} width={800} height={800} alt="map" className="flex mt-16 items-center justify-center"/>
            </div>

            {/* Right Column */}
            <div className="w-96">
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <nav className="space-y-3">
                {[
                  "Home",
                  "Courses",
                  "Cities",
                  "Jobs",
                  "Consulting",
                  "In-House Training",
                  "Diplomas",
                  "Blogs",
                  "Contact Us",
                ].map((item) => (
                  <Link key={item} href="#" className="block text-sm hover:text-gray-300 transition-colors">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Social Media Bar */}
        <div className="border-t border-gray-800 bg-primary">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center space-x-6">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, index) => (
                <Link key={index} href={href} className="text-white hover:text-gray-300 transition-colors">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

