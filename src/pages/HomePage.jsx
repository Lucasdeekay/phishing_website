import React, { useState, useEffect } from "react";
import phishingFacts from "../data/PhishingFacts"; // Import facts from the new file

// HomePage Component
const HomePage = ({ userId, onNavigate }) => {
  const [currentFact, setCurrentFact] = useState("");

  useEffect(() => {
    // Pick a random fact initially
    setCurrentFact(
      phishingFacts[Math.floor(Math.random() * phishingFacts.length)]
    );

    // Set interval to change fact every 8 seconds
    const intervalId = setInterval(() => {
      setCurrentFact(
        phishingFacts[Math.floor(Math.random() * phishingFacts.length)]
      );
    }, 8000); // Change fact every 8 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl text-center max-w-6xl mx-auto my-8">
      {/* Hero Section */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
        Welcome to the Phishing Awareness Hub!
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 animate-fade-in delay-100 max-w-3xl mx-auto">
        Your essential guide to understanding, identifying, and protecting
        yourself from evolving phishing attacks in the digital world.
      </p>

      {/* Dynamic Fact Section */}
      <div className="bg-yellow-100 dark:bg-yellow-800 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 mb-10 rounded-lg shadow-md animate-fade-in delay-200 transition-opacity duration-1000 ease-in-out max-w-4xl mx-auto">
        <p className="text-yellow-800 dark:text-yellow-100 font-semibold text-lg italic">
          Did you know?
        </p>
        <p className="text-yellow-700 dark:text-yellow-200 mt-2 text-md">
          "{currentFact}"
        </p>
      </div>

      {/* Why Phishing Matters Section */}
      <div className="mb-4 mt-4 max-w-4xl mx-4 animate-fade-in delay-300">
        <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-4 mb-4">
          Why Phishing Awareness Matters
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
          Phishing attacks are a constant threat, evolving to trick even the
          most cautious individuals. They can lead to stolen personal data,
          financial loss, and severe security breaches. By enhancing your
          awareness, you become the strongest defense against these insidious
          attacks.
        </p>
      </div>

      {/* Feature Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 px-8">
        {/* Card 1: Chatbot */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex-1 max-w-sm transform hover:scale-105 transition-transform duration-300 border-t-4 border-blue-500 dark:border-blue-600">
          <svg
            className="w-16 h-16 text-blue-500 mb-4 animate-bounce-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">
            Interactive Chatbot
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Ask questions and get real-time information about phishing.
          </p>
        </div>

        {/* Card 2: Awareness Tips */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex-1 max-w-sm transform hover:scale-105 transition-transform duration-300 border-t-4 border-indigo-500 dark:border-indigo-600">
          <svg
            className="w-16 h-16 text-indigo-500 mb-4 animate-pulse-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.205 5 7.5 5A2.5 2.5 0 005 7.5c0 1.334.606 2.5 1.5 3.333L12 14v-4m-6 3H2.25M12 14l-3 3m5-3a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm-5 3v5.75M12 21.75V14.25"
            ></path>
          </svg>
          <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
            Essential Tips & Guides
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Browse a curated list of essential phishing awareness tips.
          </p>
        </div>

        {/* Card 3: Knowledge Quiz */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex-1 max-w-sm transform hover:scale-105 transition-transform duration-300 border-t-4 border-purple-500 dark:border-purple-600">
          <svg
            className="w-16 h-16 text-purple-500 mb-4 animate-spin-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
          <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-2">
            Test Your Knowledge
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Challenge yourself with quizzes and scenarios.
          </p>
        </div>
      </div>

      {/* User ID Display */}
      {userId && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Your User ID:{" "}
          <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">
            {userId}
          </span>
        </p>
      )}
    </div>
  );
};

export default HomePage;
