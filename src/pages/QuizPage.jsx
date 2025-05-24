import { useState, useEffect, useRef } from "react"; // Added useRef for potential future use, though not directly used in quiz
import {
  collection,
  addDoc,
  serverTimestamp,
  query, // Added query
  orderBy, // Added orderBy
  limit, // Added limit
  onSnapshot, // Added onSnapshot
} from "firebase/firestore";
import MessageBox from "../utils/MessageBox";
import allQuizQuestions from "../data/QuizQuestions";


// Number of questions to display per quiz session
const NUMBER_OF_QUIZ_QUESTIONS = 7;

// Quiz Page Component
const QuizPage = ({ db, userId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxContent, setMessageBoxContent] = useState("");
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]); // Questions for current session
  const [pastQuizResults, setPastQuizResults] = useState([]); // To track past performance

  // --- START: Fetch Past Quiz Results ---
  useEffect(() => {
    if (!db || !userId) return;

    const appId = process.env.REACT_APP_CANVAS_APP_ID;
    const quizResultsCollectionRef = collection(
      db,
      `artifacts/${appId}/users/${userId}/quiz_results`
    );

    // Order by timestamp and limit to, say, the last 5 results
    const q = query(
      quizResultsCollectionRef,
      orderBy("timestamp", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPastQuizResults(results);
      },
      (error) => {
        console.error("Error fetching past quiz results:", error);
        setMessageBoxContent(
          "Failed to load past quiz performance. Please check your connection."
        );
        setShowMessageBox(true);
      }
    );

    return () => unsubscribe();
  }, [db, userId]);
  // --- END: Fetch Past Quiz Results ---

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  // Function to start or retake the quiz with random questions
  const startQuiz = () => {
    // Shuffle all questions and pick a subset
    const shuffledQuestions = shuffleArray([...allQuizQuestions]);
    setCurrentQuizQuestions(
      shuffledQuestions.slice(0, NUMBER_OF_QUIZ_QUESTIONS)
    );

    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
  };

  // Start the quiz when the component mounts initially
  useEffect(() => {
    startQuiz();
  }, []); // Run once on component mount

  const handleAnswerOptionClick = async (selectedOption) => {
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    const newAnswer = {
      question: currentQuestion.question,
      selectedOption: selectedOption,
      correctAnswer: currentQuestion.answer,
      isCorrect: isCorrect,
    };

    const updatedUserAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedUserAnswers);

    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < currentQuizQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResults(true);
      // Log quiz results to Firestore
      if (db && userId) {
        try {
          const appId = process.env.REACT_APP_CANVAS_APP_ID;
          const quizCollectionRef = collection(
            db,
            `artifacts/${appId}/users/${userId}/quiz_results`
          );
          await addDoc(quizCollectionRef, {
            score: newScore,
            totalQuestions: currentQuizQuestions.length,
            answers: updatedUserAnswers, // Log the complete set of answers
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          console.error("Error logging quiz results to Firestore:", error);
          setMessageBoxContent(
            "Failed to save quiz results. Please check your connection."
          );
          setShowMessageBox(true);
        }
      }
    }
  };

  return (
    <section className="bg-purple-50 dark:bg-purple-950 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-6 text-center">
        Test Your Phishing Awareness
      </h2>

      {currentQuizQuestions.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Loading quiz questions...
          </p>
        </div>
      ) : showResults ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Quiz Results
          </h3>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            You scored {score} out of {currentQuizQuestions.length}!
          </p>
          <div className="space-y-4 mb-6 text-left max-h-96 overflow-y-auto custom-scrollbar p-2">
            {userAnswers.map((answer, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Q{index + 1}: {answer.question}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your Answer:{" "}
                  <span
                    className={
                      answer.isCorrect ? "text-green-600" : "text-red-600"
                    }
                  >
                    {answer.selectedOption}
                  </span>
                </p>
                {!answer.isCorrect && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Correct Answer:{" "}
                    <span className="text-green-600">
                      {answer.correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={startQuiz} // Changed to startQuiz
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out"
          >
            Retake Quiz
          </button>

          {/* --- START: Past Performance Tracker --- */}
          {pastQuizResults.length > 0 && (
            <div className="mt-8 text-left border-t pt-4 border-gray-300 dark:border-gray-700">
              <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Your Past Quiz Performance
              </h4>
              <ul className="space-y-2">
                {pastQuizResults.map((result) => (
                  <li
                    key={result.id}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <p className="text-gray-700 dark:text-gray-300">
                      Score:{" "}
                      <span className="font-bold">
                        {result.score} / {result.totalQuestions}
                      </span>{" "}
                      (
                      {new Date(
                        result.timestamp?.toDate()
                      ).toLocaleDateString()}{" "}
                      {new Date(
                        result.timestamp?.toDate()
                      ).toLocaleTimeString()}
                      )
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Showing last {pastQuizResults.length} attempts.
              </p>
            </div>
          )}
          {/* --- END: Past Performance Tracker --- */}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Question {currentQuestionIndex + 1}/{currentQuizQuestions.length}
          </h3>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            {currentQuizQuestions[currentQuestionIndex]?.question}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuizQuestions[currentQuestionIndex]?.options.map(
              (option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option)}
                  className="p-4 border border-purple-300 dark:border-purple-700 rounded-lg text-left hover:bg-purple-100 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      )}
      {showMessageBox && (
        <MessageBox
          message={messageBoxContent}
          onClose={() => setShowMessageBox(false)}
        />
      )}
    </section>
  );
};

export default QuizPage;
