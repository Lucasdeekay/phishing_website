// Tips Page Component
const TipsPage = () => {
  const phishingTips = [
    "Always check the sender's email address. Does it look legitimate?",
    "Hover over links before clicking to see the actual URL. Does it match the sender's domain?",
    "Beware of urgent or threatening language. Phishers often create a sense of urgency.",
    "Look for grammatical errors and typos. Legitimate organizations usually have professional communications.",
    "Never share personal information (passwords, credit card numbers) via email or unsolicited calls.",
    "Use strong, unique passwords and enable two-factor authentication (2FA).",
    "Keep your software updated, especially your operating system and web browser.",
    "If something feels suspicious, trust your gut. It's better to be safe than sorry.",
    "Verify requests for information by contacting the organization directly using official contact details, not those provided in the suspicious message.",
    "Be cautious of attachments. Malicious attachments can contain malware.",
    "Report suspicious emails to your IT department or email provider.",
    "Educate yourself and your family about common phishing tactics.",
    "Don't click on pop-up windows that claim your computer is infected.",
    "Use antivirus software and keep it updated.",
    "Regularly back up your important data.",
  ];

  return (
    <section className="bg-blue-50 dark:bg-blue-950 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6 text-center">
        Real-time Phishing Awareness Tips
      </h2>
      <div classNameNAme="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phishingTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
              Tip #{index + 1}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipsPage;