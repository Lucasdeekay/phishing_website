import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import MessageBox from "../utils/MessageBox";

// Chatbot Page Component
const ChatbotPage = ({ db, userId }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch chat history from Firestore on component mount
  useEffect(() => {
    if (!db || !userId) return;

    const appId = process.env.REACT_APP_CANVAS_APP_ID;
    const chatCollectionRef = collection(
      db,
      `artifacts/${appId}/users/${userId}/chat_interactions`
    );
    const q = query(chatCollectionRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const history = snapshot.docs.map((doc) => doc.data());
        setChatHistory(history);
      },
      (error) => {
        console.error("Error fetching chat history:", error);
        setErrorMessage("Failed to load chat history. Please try again.");
        setShowError(true);
      }
    );

    return () => unsubscribe();
  }, [db, userId]);

  // Scroll to bottom of chat history
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!message.trim()) {
      setErrorMessage("Please enter a message.");
      setShowError(true);
      return;
    }
    if (!db || !userId) {
      setErrorMessage("Chat service not ready. Please try again later.");
      setShowError(true);
      return;
    }

    const userMessage = message.trim();
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage, timestamp: serverTimestamp() },
    ]);
    setMessage("");
    setIsTyping(true);

    try {
      // Log user message to Firestore
      const appId = process.env.REACT_APP_CANVAS_APP_ID;
      const chatCollectionRef = collection(
        db,
        `artifacts/${appId}/users/${userId}/chat_interactions`
      );
      await addDoc(chatCollectionRef, {
        role: "user",
        text: userMessage,
        timestamp: serverTimestamp(),
      });

      // Prepare payload for Gemini API
      // Filter out any messages without a 'text' property or where text is empty
      let apiChatHistory = chatHistory
        .filter((msg) => msg.text)
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));
      apiChatHistory.push({ role: "user", parts: [{ text: userMessage }] });

      const payload = { contents: apiChatHistory };
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      if (!apiKey) {
        throw new Error(
          "Gemini API Key is missing. Please check your .env file."
        );
      }
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API error: ${response.status} - ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const result = await response.json();

      let botResponseText = "I'm sorry, I couldn't generate a response.";
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        botResponseText = result.candidates[0].content.parts[0].text;
      }

      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: botResponseText, timestamp: serverTimestamp() },
      ]);

      // Log bot response to Firestore
      await addDoc(chatCollectionRef, {
        role: "bot",
        text: botResponseText,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message to Gemini API or Firestore:", error);
      setErrorMessage(
        "Oops! Something went wrong with the chatbot. Please try again later."
      );
      setShowError(true);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Oops! Something went wrong. Please try again later.",
          timestamp: serverTimestamp(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="bg-green-50 dark:bg-green-950 p-6 rounded-xl shadow-lg flex flex-col h-[600px]">
      <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-4 text-center">
        Chat with our Phishing Expert
      </h2>
      <div className="flex-grow overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-900 custom-scrollbar">
        {chatHistory.length === 0 && !isTyping && (
          <p className="text-center text-gray-500 dark:text-gray-400 italic">
            Start a conversation to learn about phishing!
          </p>
        )}
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-3">
            <div className="max-w-[70%] p-3 rounded-xl shadow-sm bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none">
              <div className="typing-indicator flex space-x-1">
                <span
                  className="dot animate-bounce"
                  style={{ animationDelay: "0s" }}
                >
                  .
                </span>
                <span
                  className="dot animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  .
                </span>
                <span
                  className="dot animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  .
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Ask me about phishing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          disabled={isTyping}
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isTyping}
        >
          Send
        </button>
      </div>
      {showError && (
        <MessageBox
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}
    </section>
  );
};

export default ChatbotPage;
