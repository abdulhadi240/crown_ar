"use client";
import React, { useState, useEffect } from "react";
import BLogsCardIndiviual from "./BLogsCardIndiviual";
import Loading from "./Loading";
import Wrapper from "./Wrapper";
import BlogCarousel from "./BlogCarousel";

export const Blog_Category = ({ initialArticles, params }) => {
  const [articles, setArticles] = useState(initialArticles?.data || []);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // To check if more blogs exist
  const [loading, setLoading] = useState(false);

  const fetchMoreArticles = async () => {
    if (loading) return; // Avoid multiple requests at the same time

    setLoading(true);

    try {
      // Fetch more articles from the API
      const response = await fetch(
        `/blogs/${params.category}/category?per_page=6&page=${page + 1}`
      );
      const data = await response.json();

      // Append new articles to the existing list
      setArticles((prevArticles) => [...prevArticles, ...data.data]);

      // Check if there are more articles to load
      if (data.data.length < 6) {
        setHasMore(false); // No more blogs available
      }

      setPage((prevPage) => prevPage + 1); // Update the current page
    } catch (error) {
      console.error("Error fetching more articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <BLogsCardIndiviual
            list={article}
            index={index}
            params={params.category}
          />
        ))}
      </div>
      <div className="w-full h-[1.5px] text-secondary bg-secondary mt-7"/>

      {/* "See More" Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={fetchMoreArticles}
            className="text-white p-1 px-6 rounded-full text-xs shadow-lg transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,24,57,1) 0%, rgba(6,24,57,0.64) 85%, rgba(6,24,57,0.57) 100%)",
            }}
            disabled={loading}
          >
            {loading ? <Loading/> : "See More"}
          </button>
        </div>
      )}
      
    </div>
    
  );
};
