# Phishing Awareness Hub

A comprehensive web application designed to educate users about phishing attacks, provide real-time information, and test their knowledge on cybersecurity best practices.

## 🚀 Features

* **Interactive Home Page:** A welcoming dashboard with dynamic cybersecurity insights and clear navigation to key features.
* **AI Chatbot:** An intelligent chatbot powered by Google Gemini, ready to answer your questions about various phishing tactics and online safety.
* **Phishing Tips & Guides:** A curated collection of essential tips displayed in a paginated, scrollable format for easy learning.
* **Knowledge Quiz:** Test your understanding with a dynamic quiz featuring a large pool of questions, random selection, and performance tracking.
* **User Performance Tracking:** Your quiz results are saved to Firebase, allowing you to monitor your progress over time.
* **Anonymous Authentication:** Seamlessly use the app without needing to create an account, powered by Firebase Anonymous Authentication.
* **Responsive Design:** Optimized for seamless viewing and interaction across various devices (mobile, tablet, desktop).
* **Dark Mode Support:** A sleek dark theme for comfortable viewing.

---

## 💻 Technologies Used

* **Frontend:**
    * [React.js](https://react.dev/) - A JavaScript library for building user interfaces.
    * [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
* **Backend / Services:**
    * [Firebase Firestore](https://firebase.google.com/docs/firestore) - A flexible, scalable NoSQL cloud database for storing chat history and quiz results.
    * [Firebase Authentication](https://firebase.google.com/docs/auth) - For anonymous user authentication.
    * [Google Gemini API](https://ai.google.dev/models/gemini) - The Large Language Model powering the interactive chatbot.

---

## 📐 System Architecture (Simplified Chatbot Flow)

The chatbot operates via a client-side React application that communicates with the Google Gemini API through a direct API call (for local development). For a production environment, an API Gateway and a serverless function would typically mediate this interaction for enhanced security and scalability.

```bash
[User (Web Browser)]
↓
(HTTPS)
↓
[Frontend (React App)]
↓
(API Calls / HTTPS)
↓
[Google Gemini API]
↓
(API Response)
↓
[Frontend (React App)]
↓
[User (Sees Response)]
```


**Flow Description:**

1.  **User (Web Browser):** This is where your user interacts with the chatbot within their browser.
2.  **Frontend (React App):** Your React application running in the user's browser captures their input.
3.  **API Calls / HTTPS:** The React app sends the user's message directly to the Google Gemini API (for local setup).
4.  **Google Gemini API:** The Large Language Model processes the request and generates a response.
5.  **Frontend (React App):** The React app receives the chatbot's response.
6.  **User (Sees Response):** The React app displays the chatbot's message to the user.

---

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js & npm (Node Package Manager):**
    * Download and install the LTS version from [nodejs.org](https://nodejs.org/). `npm` and `npx` are included with Node.js.
    * Verify installation by running:
        ```bash
        node -v
        npm -v
        npx -v
        ```
* **Git:** For cloning the repository.
    * Download from [git-scm.com](https://git-scm.com/downloads).

### 1. Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone <repository-url> # Replace <repository-url> with the actual URL of your repository
cd phishing_website
```

### 2. Install Dependencies

Navigate into the project directory and install the necessary Node.js packages:

```bash
npm install
# or if you prefer yarn:
# yarn install
```

### 3. Firebase Setup (Crucial for Chat & Quiz Data)

This application uses Firebase Firestore for chat history and quiz results, and Firebase Authentication for anonymous user sessions.

1.  **Create a Firebase Project:**
    * Go to the [Firebase Console](https://console.firebase.google.com/).
    * Click **"Add project"** and follow the prompts.
2.  **Add a Web App to Your Project:**
    * In your Firebase project dashboard, click the **web icon `< />`** to add a new web app.
    * Register your app and **copy the `firebaseConfig` object** provided.
3.  **Enable Firestore Database:**
    * In the Firebase Console, navigate to **"Build" > "Firestore Database"**.
    * Click **"Create database"** and choose **"Start in production mode"**. Select a location.
    * **Update Firestore Security Rules:** Go to the **"Rules"** tab in Firestore Database and set them to allow read/write for authenticated users (for local testing):
        ```firestore
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            // Allow authenticated users (even anonymous) to read/write their own data
            match /artifacts/{appId}/users/{userId}/{document=**} {
              allow read, write: if request.auth != null && request.auth.uid == userId;
            }
            // Temporarily for quick debugging (INSECURE for production!):
            // match /{document=**} {
            //   allow read, write: if true;
            // }
          }
        }
        ```
        **Note:** The `if true` rule is highly insecure and should only be used for very brief local testing to confirm connectivity, then immediately reverted to more secure rules.
4.  **Enable Anonymous Authentication:**
    * In the Firebase Console, navigate to **"Build" > "Authentication"**.
    * Go to the **"Sign-in method"** tab.
    * Find **"Anonymous"** in the list, click the pencil icon to edit, and **enable it**. Click **"Save"**.

---

### 4. Google Gemini API Key Setup (Crucial for Chatbot)

The chatbot uses the Google Gemini API to generate responses.

1.  **Get a Gemini API Key:**
    * Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
    * Log in with your Google account.
    * Click **"Create API key in new project"** or **"Create API key in existing project"** and **copy the generated API key**.

---

### 5. Configure Environment Variables (`.env` file)

Create a `.env` file in the **root directory** of your project (`phishing_website/.env`).

```bash
# In your project root, create a file named .env
touch .env # On macOS/Linux
# or manually create it on Windows
```

Open `.env` and add your Firebase and Gemini API keys. **Remember to replace the placeholder values with your actual keys**

```bash
# Firebase Configuration (from Firebase Console -> Project settings -> Your apps -> Web app config)
REACT_APP_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
REACT_APP_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
# REACT_APP_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX" # Uncomment if you have Analytics

# Custom App ID for Firestore collections (you can define this yourself)
REACT_APP_CANVAS_APP_ID="phishing-awareness-hub-local"

# Google Gemini API Key (from Google AI Studio)
REACT_APP_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

**Important:** Add `.env` to your `.gitignore` file to prevent it from being committed to version control:

```bash
# .gitignore
.env
```

---

### 6. Run the Application

Start the development server:

```bash
npm start
# or
# yarn start
```
This will open the application in your default web browser at http://localhost:3000 (or another available port).

---

## 📂 Project Structure

phishing_website/
├── public/
├── src/
│   ├── components/
│   │   ├── ChatbotPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── TipsPage.jsx
│   │   └── QuizPage.jsx
│   ├── data/
│   │   ├── phishingFacts.js    # Dynamic facts for Home page
│   │   ├── phishingTips.js      # All tips for Tips page
│   │   └── quizQuestions.js     # All questions for Quiz page
│   ├── utils/
│   │   └── MessageBox.jsx       # Custom message box component
│   ├── App.js                   # Main application component, handles routing
│   ├── index.js                 # Entry point for React app
│   └── index.css                # Global styles, including Tailwind directives and custom animations
├── .env                         # Environment variables (private)
├── .gitignore                   # Specifies intentionally untracked files to ignore
├── package.json                 # Project dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # This file

---

## 💡 Usage

* **Home:** Get an overview of the app and quick facts about phishing.
* **Chatbot:** Type your questions into the input field and press Enter or click "Send" to get AI-powered answers about cybersecurity.
* **Tips:** Browse through essential phishing awareness tips. Click "Load More Tips" to reveal additional content.
* **Quiz:** Test your knowledge by answering multiple-choice questions. Your performance will be tracked.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to [open an issue](https://github.com/Lucasdeekay/phishing_website/issues) or submit a [pull request](https://github.com/Lucasdeekay/phishing_website/pulls).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

* [React.js](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Firebase](https://firebase.google.com/)
* [Google Gemini API](https://ai.google.dev/models/gemini)