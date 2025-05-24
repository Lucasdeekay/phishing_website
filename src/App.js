import { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import HomePage from "./pages/HomePage";
import ChatbotPage from "./pages/ChatBot";
import TipsPage from "./pages/TipsPage";
import QuizPage from "./pages/QuizPage";
import LoadingSpinner from "./utils/LoadingSpinner";
import MessageBox from "./utils/MessageBox";

// --- Main App Component ---
function App() {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [currentPage, setCurrentPage] = useState("home"); // State for current page
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize Firebase and set up authentication listener
  useEffect(() => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };

    // Retrieve the custom app ID for Firestore collections
    const appId = process.env.REACT_APP_CANVAS_APP_ID;

    // Basic validation for config (optional, but good practice)
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !appId) {
      console.error("Firebase environment variables are not set correctly!");
      setErrorMessage("Failed to load configuration. Please check .env file.");
      setShowError(true);
      setIsAuthReady(true); // Mark as ready to show error message
      return; // Stop initialization
    }

    try {
      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestoreDb);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          try {
            // Since you're running locally, we'll rely on anonymous sign-in
            // as you won't have the __initial_auth_token from Canvas.
            await signInAnonymously(firebaseAuth);
          } catch (error) {
            console.error("Error signing in:", error);
            setErrorMessage("Failed to sign in. Some features may not work.");
            setShowError(true);
            setUserId(crypto.randomUUID()); // Fallback if anonymous sign-in fails
          }
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      setErrorMessage("Failed to initialize the application. Please refresh.");
      setShowError(true);
      setUserId(crypto.randomUUID()); // Fallback to a random UUID
      setIsAuthReady(true);
    }
  }, []);

  // Function to render the current page based on state
  const renderPage = useCallback(() => {
    switch (currentPage) {
      case "home":
        return <HomePage userId={userId} />;
      case "chatbot":
        return <ChatbotPage db={db} userId={userId} />;
      case "tips":
        return <TipsPage />;
      case "quiz":
        return <QuizPage db={db} userId={userId} />;
      default:
        return <HomePage userId={userId} />;
    }
  }, [currentPage, db, userId]);

  if (!isAuthReady) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans flex flex-col items-center p-4">
      {/* Header and Navigation */}
      <header className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
          Phishing Hub
        </h1>
        <nav className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setCurrentPage("home")}
            className={`px-5 py-2 rounded-lg shadow-md transition duration-200 ease-in-out ${
              currentPage === "home"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage("chatbot")}
            className={`px-5 py-2 rounded-lg shadow-md transition duration-200 ease-in-out ${
              currentPage === "chatbot"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Chatbot
          </button>
          <button
            onClick={() => setCurrentPage("tips")}
            className={`px-5 py-2 rounded-lg shadow-md transition duration-200 ease-in-out ${
              currentPage === "tips"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Tips
          </button>
          <button
            onClick={() => setCurrentPage("quiz")}
            className={`px-5 py-2 rounded-lg shadow-md transition duration-200 ease-in-out ${
              currentPage === "quiz"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Quiz
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-8">
        {renderPage()}
      </main>

      {showError && (
        <MessageBox
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}

      {/* Tailwind CSS for Inter font and animations */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #777;
        }

        /* Typing indicator animation */
        .typing-indicator .dot {
          animation: bounce 1.4s infinite ease-in-out both;
          width: 8px;
          height: 8px;
          background-color: #a0aec0; /* Tailwind gray-400 */
          border-radius: 50%;
          display: inline-block;
        }
        .dark .typing-indicator .dot {
          background-color: #9ca3af; /* Tailwind gray-400 */
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        /* Fade-in animation for Home page */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in.delay-100 {
          animation-delay: 0.1s;
        }
        `}
      </style>
    </div>
  );
}

export default App;
