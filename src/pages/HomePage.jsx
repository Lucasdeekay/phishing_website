// Home Page Component
const HomePage = ({ userId }) => (
  <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg text-center">
    <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
      Welcome to the Phishing Awareness Hub!
    </h2>
    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate-fade-in delay-100">
      Your go-to resource for understanding, identifying, and preventing
      phishing attacks.
    </p>
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex-1 min-w-[280px] max-w-sm transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">
          Learn from our Chatbot
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Ask questions and get real-time information about phishing.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex-1 min-w-[280px] max-w-sm transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
          Stay Informed with Tips
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Browse a curated list of essential phishing awareness tips.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex-1 min-w-[280px] max-w-sm transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-2">
          Test Your Knowledge
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Challenge yourself with interactive quizzes and scenarios.
        </p>
      </div>
    </div>
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

export default HomePage;