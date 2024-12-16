"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const cities = [
  { image: "/img.webp", name: "Manchester", country: "UK" },
  { image: "/img.webp", name: "London", country: "UK" },
  { image: "/img.webp", name: "Paris", country: "France" },
  { image: "/img.webp", name: "New York", country: "USA" },
  { image: "/img.webp", name: "Berlin", country: "Germany" },
  { image: "/img.webp", name: "Tokyo", country: "Japan" },
  { image: "/img.webp", name: "Sydney", country: "Australia" },
  { image: "/img.webp", name: "Los Angeles", country: "USA" },
  { image: "/img.webp", name: "Bangkok", country: "Thailand" },
  { image: "/img.webp", name: "Dubai", country: "UAE" },
];

const CARD_WIDTH = 140; // Width of each card
const MARGIN = 20; // Margin between cards
const CARD_SIZE = CARD_WIDTH + MARGIN;
const CARDS_PER_DOT = 2; // Number of cards per dot

const BlogPostCarousel = ({data}) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalDots = Math.ceil(data.length / CARDS_PER_DOT);

  const shiftLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setOffset((prev) => prev + CARD_SIZE * CARDS_PER_DOT);
    }
  };

  const shiftRight = () => {
    if (currentIndex < totalDots - 1) {
      setCurrentIndex((prev) => prev + 1);
      setOffset((prev) => prev - CARD_SIZE * CARDS_PER_DOT);
    }
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
    setOffset(-index * CARD_SIZE * CARDS_PER_DOT);
  };

  return (
    <section className="py-8" ref={ref}>
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
            className="flex gap-5"
          >
            {data?.data.map((post, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: CARD_WIDTH }}
              >
                <Image
                  src={post.image}
                  width={200}
                  height={200}
                  alt={post.name}
                  className="rounded-t-lg"
                />
                <div className="py-4 text-start">
                  <h3 className="font-bold">{post.name}</h3>
                  <p className="text-sm text-gray-600">{post.country}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center items-center md:mt-10 mb-10 gap-1">
        {Array.from({ length: totalDots }).map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              currentIndex === index ? "bg-primary scale-125" : "bg-gray-400"
            }`}
            onClick={() => goToIndex(index)}
          ></div>
        ))}
      </div>
      <div className="flex justify-center md:justify-end items-end mt-4 md:mr-32">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 mb-2">
          <button
            className={`rounded-lg border-[1px] bg-primary p-2 text-2xl transition-opacity ${
              currentIndex > 0 ? "" : "opacity-30"
            }`}
            disabled={currentIndex === 0}
            onClick={shiftLeft}
          >
            <FiArrowLeft color="white"/>
          </button>
          <button
            className={`rounded-lg border-[1px] bg-primary p-2 text-2xl transition-opacity ${
              currentIndex < totalDots - 1 ? "" : "opacity-30"
            }`}
            disabled={currentIndex === totalDots - 1}
            onClick={shiftRight}
          >
            <FiArrowRight color="white"/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPostCarousel;
