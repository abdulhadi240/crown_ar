"use client";
import ArticleCard from "@/app/Blog/ArticleCard";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import BLogsCardIndiviual from "./BLogsCardIndiviual";

const CARD_WIDTH = 320; // Width of each card
const MARGIN = 20; // Margin between cards
const CARD_SIZE = CARD_WIDTH + MARGIN;
const CARDS_PER_DOT = 1; // Number of cards per dot

const BlogCarousel = ({ data }) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
console.log(data , "data")
  const totalDots = Math.ceil(data.data.length / CARDS_PER_DOT);

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
    <section className="pb-8" ref={ref}>
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto ">
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
            className="flex gap-5 md:gap-0 pl-4"
          >
            {data?.data.map(
              (article, index) =>
                index < 6 && (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{ width: CARD_WIDTH }}
                  >
                    <BLogsCardIndiviual
                      background
                      list={article}
                      index={index}
                      params={article.categories[0].slug}
                    />
                  </div>
                )
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center md:justify-end items-end mt-4 md:mx-4">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 mb-2">
          <button
            className={`rounded-lg border-[1px] bg-primary p-2 text-2xl transition-opacity ${
              currentIndex > 0 ? "" : "opacity-30"
            }`}
            disabled={currentIndex === 0}
            onClick={shiftLeft}
          >
            <FiArrowRight color="white" />
          </button>
          <button
            className={`rounded-lg border-[1px] bg-primary p-2 text-2xl transition-opacity ${
              currentIndex < totalDots - 1 ? "" : "opacity-30"
            }`}
            disabled={currentIndex === totalDots - 1}
            onClick={shiftRight}
          >
            <FiArrowLeft color="white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
