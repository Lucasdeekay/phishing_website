import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import MessageBox from "../utils/MessageBox";

// Quiz Page Component
const QuizPage = ({ db, userId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxContent, setMessageBoxContent] = useState("");

  const quizQuestions = [
    {
      question: "Which of these is a common sign of a phishing email?",
      options: [
        "A personalized greeting with your name",
        "A generic greeting like 'Dear Customer'",
        "Links to official company websites",
        "Proper grammar and spelling",
      ],
      answer: "A generic greeting like 'Dear Customer'",
    },
    {
      question:
        "What should you do if you receive a suspicious email asking for your password?",
      options: [
        "Click the link and enter your password",
        "Reply to the email asking for more information",
        "Forward it to a friend to check",
        "Delete the email and report it if possible",
      ],
      answer: "Delete the email and report it if possible",
    },
    {
      question: "What is 'smishing'?",
      options: [
        "Phishing attempts via email",
        "Phishing attempts via phone calls",
        "Phishing attempts via SMS messages",
        "Phishing attempts via social media",
      ],
      answer: "Phishing attempts via SMS messages",
    },
    {
      question: "Why is it important to hover over links before clicking them?",
      options: [
        "To see a preview of the webpage",
        "To check if the link is broken",
        "To reveal the actual URL and check for legitimacy",
        "To save the link for later",
      ],
      answer: "To reveal the actual URL and check for legitimacy",
    },
    {
      question: "What is two-factor authentication (2FA)?",
      options: [
        "Using two different passwords for one account",
        "A security process that requires two methods of identification",
        "Logging in from two different devices simultaneously",
        "Sharing your password with two trusted friends",
      ],
      answer: "A security process that requires two methods of identification",
    },
    {
      question:
        "A legitimate company asks for your password via email. Is this normal?",
      options: [
        "Yes, if they explain why",
        "No, legitimate companies never ask for passwords via email",
        "Only if it's from their official support email",
        "Sometimes, for account verification",
      ],
      answer: "No, legitimate companies never ask for passwords via email",
    },
    {
      question:
        "What is the best way to verify a suspicious phone call claiming to be from your bank?",
      options: [
        "Give them your account number to verify",
        "Call them back on the number they provided",
        "Hang up and call your bank using a number from their official website or statement",
        "Tell them you'll call them back later",
      ],
      answer:
        "Hang up and call your bank using a number from their official website or statement",
    },
  ];

  const handleAnswerOptionClick = async (selectedOption) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
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
    if (nextQuestion < quizQuestions.length) {
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
            totalQuestions: quizQuestions.length,
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

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
  };

  return (
    <section className="bg-purple-50 dark:bg-purple-950 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-6 text-center">
        Test Your Phishing Awareness
      </h2>
      {showResults ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Quiz Results
          </h3>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            You scored {score} out of {quizQuestions.length}!
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
            onClick={resetQuiz}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Question {currentQuestionIndex + 1}/{quizQuestions.length}
          </h3>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            {quizQuestions[currentQuestionIndex]?.question}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizQuestions[currentQuestionIndex]?.options.map(
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
