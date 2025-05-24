import React, { useState, useEffect } from "react";
import allPhishingTips from "../data/PhishingTips"; // Ensure this path is correct

// Number of tips to display initially and per load
const TIPS_PER_LOAD = 5; // Display 5 tips at a time

// Tips Page Component
const TipsPage = () => {
  const [displayedTips, setDisplayedTips] = useState([]);
  const [tipsToLoad, setTipsToLoad] = useState(TIPS_PER_LOAD);
  const [hasMoreTips, setHasMoreTips] = useState(true);

  // Effect to load initial tips and manage "Load More" state
  useEffect(() => {
    if (allPhishingTips.length > 0) {
      setDisplayedTips(allPhishingTips.slice(0, TIPS_PER_LOAD));
      setHasMoreTips(allPhishingTips.length > TIPS_PER_LOAD);
    } else {
      setHasMoreTips(false);
    }
  }, []); // Run only once on component mount

  // Function to load more tips
  const loadMoreTips = () => {
    const nextTipsCount = tipsToLoad + TIPS_PER_LOAD;
    setDisplayedTips(allPhishingTips.slice(0, nextTipsCount));
    setTipsToLoad(nextTipsCount);

    if (nextTipsCount >= allPhishingTips.length) {
      setHasMoreTips(false);
    }
  };

  return (
    <section className="p-8 md:p-12 bg-blue-50 dark:bg-gray-900 rounded-3xl shadow-2xl text-center max-w-4xl mx-auto my-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-300 mb-8 text-center animate-fade-in">
        Essential Phishing Awareness Tips
      </h2>

      {/* Column layout with gap for spacing between cards */}
      <div className="flex flex-col items-center gap-10 mb-8 px-6">
        {displayedTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-7 rounded-xl shadow-lg w-full max-w-md h-64 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 border-t-4 border-blue-500 dark:border-blue-600 animate-fade-in mb-4"
            style={{ animationDelay: `${index * 0.07}s` }} // Staggered animation
          >
            <div>
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-3">
                Tip #{index + 1}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                {tip}
              </p>
            </div>
          </div>
        ))}
      </div>

      {hasMoreTips && (
        <button
          onClick={loadMoreTips}
          className={`px-5 py-2 rounded-lg shadow-md transition duration-200 ease-in-out bg-blue-600 text-white mb-8`}
        >
          Discover More Insights
        </button>
      )}

      {!hasMoreTips && displayedTips.length > 0 && (
        <p className="text-gray-600 dark:text-gray-400 mt-8 text-lg italic mb-8">
          You've seen all the tips! Keep practicing your awareness.
        </p>
      )}
    </section>
  );
};

export default TipsPage;
