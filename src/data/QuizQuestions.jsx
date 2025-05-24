const allQuizQuestions = [
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
  {
    question: "What is a 'spear phishing' attack?",
    options: [
      "A phishing attempt targeting a large group of random people",
      "A highly personalized phishing attempt targeting a specific individual or organization",
      "A phishing attempt conducted over the phone",
      "A phishing attempt that uses fake websites",
    ],
    answer:
      "A highly personalized phishing attempt targeting a specific individual or organization",
  },
  {
    question:
      "Which of these email addresses is most likely to be a phishing attempt?",
    options: [
      "support@amazon.com",
      "billing@apple.com",
      "security@bankofamerica.com",
      "login.update@secure-bank-login.net",
    ],
    answer: "login.update@secure-bank-login.net",
  },
  {
    question: "What is the primary goal of most phishing attacks?",
    options: [
      "To spread malware",
      "To steal sensitive information like login credentials or financial details",
      "To deface websites",
      "To crash computer systems",
    ],
    answer:
      "To steal sensitive information like login credentials or financial details",
  },
  {
    question:
      "If you receive an email from a known sender that looks unusual, what should you do?",
    options: [
      "Click on all links to investigate",
      "Reply to the email immediately asking if they sent it",
      "Call the sender directly using a verified phone number (not from the email)",
      "Ignore it completely",
    ],
    answer:
      "Call the sender directly using a verified phone number (not from the email)",
  },
  {
    question:
      "What type of phishing uses voice communication (like phone calls) to trick victims?",
    options: ["Smishing", "Whaling", "Vishing", "Spamming"],
    answer: "Vishing",
  },
  {
    question: "Which of these is a secure password best practice?",
    options: [
      "Using your birth date",
      "Using the same password for multiple accounts",
      "Creating a long, complex password with a mix of characters",
      "Writing your password down on a sticky note near your computer",
    ],
    answer: "Creating a long, complex password with a mix of characters",
  },
  {
    question:
      "You receive an urgent email about your bank account being locked. What should you do first?",
    options: [
      "Click the 'Unlock Account' button in the email",
      "Log in to your bank's website by typing the official URL into your browser",
      "Reply to the email with your account details",
      "Call the number provided in the email",
    ],
    answer:
      "Log in to your bank's website by typing the official URL into your browser",
  },
  {
    question:
      "What does 'HTTPS' at the beginning of a website address indicate?",
    options: [
      "The site is hosted in the US",
      "The site is primarily for shopping",
      "The site uses a secure, encrypted connection",
      "The site is about health and fitness",
    ],
    answer: "The site uses a secure, encrypted connection",
  },
  {
    question: "What is 'pharming'?",
    options: [
      "A type of malware that blocks access to your files",
      "A technique that redirects legitimate website traffic to fake sites",
      "A method of sending spam emails",
      "A way to crack passwords",
    ],
    answer:
      "A technique that redirects legitimate website traffic to fake sites",
  },
  {
    question: "Which characteristic makes an email attachment most suspicious?",
    options: [
      "It's from someone you know",
      "It has a common file extension like .pdf or .doc",
      "It has an unusual file extension like .exe or .zip (if not expected)",
      "It's related to a project you're working on",
    ],
    answer:
      "It has an unusual file extension like .exe or .zip (if not expected)",
  },
  {
    question: "How can you protect yourself from phishing on social media?",
    options: [
      "Accepting all friend requests",
      "Clicking on all shared links from friends",
      "Being cautious about links, unsolicited messages, and suspicious profiles",
      "Posting all your personal information publicly",
    ],
    answer:
      "Being cautious about links, unsolicited messages, and suspicious profiles",
  },
  {
    question:
      "What is the best way to verify the authenticity of a software update notification?",
    options: [
      "Click the 'Update Now' button in the pop-up",
      "Download the update from a third-party website",
      "Go directly to the software vendor's official website and check for updates there",
      "Ignore it, updates are rarely important",
    ],
    answer:
      "Go directly to the software vendor's official website and check for updates there",
  },
  {
    question: "What does a 'spoofed' email sender address mean?",
    options: [
      "The sender accidentally sent the email to the wrong person",
      "The sender's email account has been hacked",
      "The sender's email address has been faked to appear as someone else",
      "The email is a legitimate marketing email",
    ],
    answer:
      "The sender's email address has been faked to appear as someone else",
  },
  {
    question:
      "You receive an email claiming you've won a lottery you never entered. What is this most likely?",
    options: [
      "A genuine win, congratulations!",
      "A common type of advance-fee scam or phishing attempt",
      "A technical error",
      "A harmless advertisement",
    ],
    answer: "A common type of advance-fee scam or phishing attempt",
  },
  {
    question: "What is the purpose of 'whaling' in the context of phishing?",
    options: [
      "Targeting a large number of victims randomly",
      "Targeting high-profile individuals like CEOs or executives",
      "Phishing through text messages",
      "Phishing through phone calls",
    ],
    answer: "Targeting high-profile individuals like CEOs or executives",
  },
  {
    question:
      "Which of these is a secure action if you suspect a phishing email?",
    options: [
      "Open all attachments to scan them",
      "Reply with a threatening message",
      "Mark the email as spam/junk and delete it",
      "Click the unsubscribe link at the bottom",
    ],
    answer: "Mark the email as spam/junk and delete it",
  },
  {
    question: "What is an indicator of an insecure website connection?",
    options: [
      "The URL starts with 'https://'",
      "A padlock icon in the address bar",
      "The URL starts with 'http://' (missing the 's')",
      "The site loads quickly",
    ],
    answer: "The URL starts with 'http://' (missing the 's')",
  },
  {
    question:
      "Why might a phishing email contain urgent or threatening language?",
    options: [
      "To genuinely inform you of a critical issue",
      "To create a sense of panic and pressure you into immediate action",
      "To test your reading comprehension",
      "To politely ask for your cooperation",
    ],
    answer: "To create a sense of panic and pressure you into immediate action",
  },
  {
    question:
      "If your email provider offers it, what extra security measure should you enable?",
    options: [
      "Email forwarding to another account",
      "Automatic reply messages",
      "Two-factor authentication (2FA) for your email account",
      "Disabling spam filters",
    ],
    answer: "Two-factor authentication (2FA) for your email account",
  },
  {
    question: "What is a 'watering hole' attack?",
    options: [
      "An attack where hackers flood a system with traffic",
      "An attack where a frequently visited website is infected to target its visitors",
      "An attack that uses a fake login page",
      "An attack that targets specific individuals via email",
    ],
    answer:
      "An attack where a frequently visited website is infected to target its visitors",
  },
  {
    question:
      "Which piece of personal information should you be most hesitant to share online?",
    options: [
      "Your favorite color",
      "Your first name",
      "Your social security number or national ID",
      "Your city of residence",
    ],
    answer: "Your social security number or national ID",
  },
  {
    question:
      "A pop-up appears on your screen saying your computer is infected and you need to call a number. What is this?",
    options: [
      "A legitimate virus alert",
      "A tech support scam",
      "A helpful reminder to run antivirus",
      "A notification from your operating system",
    ],
    answer: "A tech support scam",
  },
  {
    question:
      "Before entering login credentials on a website, what should you verify?",
    options: [
      "The color scheme of the website",
      "The number of ads on the page",
      "The URL address and the presence of HTTPS/padlock icon",
      "How quickly the page loads",
    ],
    answer: "The URL address and the presence of HTTPS/padlock icon",
  },
  {
    question: "What is a 'malicious payload' in the context of phishing?",
    options: [
      "The legitimate content of an email",
      "The harmful software or action intended by the attacker (e.g., malware, credential theft)",
      "The subject line of a phishing email",
      "The sender's email address",
    ],
    answer:
      "The harmful software or action intended by the attacker (e.g., malware, credential theft)",
  },
  {
    question:
      "If you accidentally clicked a suspicious link, what should you do immediately?",
    options: [
      "Enter your login details on the opened page",
      "Disconnect from the internet, run a scan, and change passwords",
      "Ignore it and hope for the best",
      "Share the link with others to warn them",
    ],
    answer: "Disconnect from the internet, run a scan, and change passwords",
  },
  {
    question: "What is the purpose of a 'CAPTCHA' on websites?",
    options: [
      "To make websites load faster",
      "To confirm you are a human and not a bot",
      "To track your online activity",
      "To provide extra entertainment",
    ],
    answer: "To confirm you are a human and not a bot",
  },
  {
    question:
      "You receive an email from a government agency requesting your bank details immediately. What is a red flag?",
    options: [
      "It's from a government agency",
      "It asks for bank details via email",
      "It's well-written",
      "It mentions a refund",
    ],
    answer: "It asks for bank details via email",
  },
  {
    question:
      "What is the best way to keep your operating system and software secure against vulnerabilities?",
    options: [
      "Never update anything",
      "Install updates only from third-party sites",
      "Keep them regularly updated from official sources",
      "Download cracked software",
    ],
    answer: "Keep them regularly updated from official sources",
  },
  {
    question: "What is the risk of using public Wi-Fi without a VPN?",
    options: [
      "Your internet speed will be slower",
      "Your data could be intercepted by malicious actors",
      "Your phone battery will drain faster",
      "You can only access certain websites",
    ],
    answer: "Your data could be intercepted by malicious actors",
  },
  {
    question: "What is a 'credential stuffing' attack?",
    options: [
      "Trying random passwords until one works",
      "Using stolen username/password pairs from one breach to try logging into other services",
      "Sending a large number of emails to flood an inbox",
      "Tricking users into installing unwanted software",
    ],
    answer:
      "Using stolen username/password pairs from one breach to try logging into other services",
  },
  {
    question:
      "Why is it risky to click on shortened URLs (e.g., bit.ly, tinyurl.com) from unknown sources?",
    options: [
      "They load slower than regular URLs",
      "You can't see the true destination of the link",
      "They often contain viruses",
      "They are usually broken links",
    ],
    answer: "You can't see the true destination of the link",
  },
  {
    question:
      "What does it mean if an email's sender name looks legitimate but the actual email address is strange (e.g., 'Amazon' <df73f@randomdomain.com>)?",
    options: [
      "It's a genuine email from Amazon",
      "It's a forwarding issue",
      "It's a strong indicator of a phishing attempt (spoofing)",
      "The sender is using an alias",
    ],
    answer: "It's a strong indicator of a phishing attempt (spoofing)",
  },
  {
    question:
      "What information should you avoid sharing in unsolicited emails or messages?",
    options: [
      "Your favorite hobby",
      "Your full name and address",
      "Your general opinion",
      "Your contact number for an appointment you initiated",
    ],
    answer: "Your full name and address",
  },
  {
    question: "Which of these indicates a legitimate government website?",
    options: [
      "Ends in .com",
      "Ends in .org",
      "Ends in .gov (in the US) or country-specific equivalents (.gov.uk, .gov.au)",
      "Has many pop-up ads",
    ],
    answer:
      "Ends in .gov (in the US) or country-specific equivalents (.gov.uk, .gov.au)",
  },
  {
    question:
      "What is the purpose of 'social engineering' in cybersecurity attacks?",
    options: [
      "To develop social media algorithms",
      "To manipulate people into divulging confidential information or performing actions",
      "To design secure social networks",
      "To analyze social trends",
    ],
    answer:
      "To manipulate people into divulging confidential information or performing actions",
  },
  {
    question:
      "You receive an urgent message from a friend asking for money, claiming to be in trouble. What should you do?",
    options: [
      "Send the money immediately to help them",
      "Reply asking for details via email",
      "Contact your friend directly through a different, verified communication method (e.g., call them)",
      "Share the message on social media to get help",
    ],
    answer:
      "Contact your friend directly through a different, verified communication method (e.g., call them)",
  },
  {
    question: "What is the risk of using easily guessable passwords?",
    options: [
      "They are harder to remember",
      "They can be easily cracked by automated attacks",
      "They expire faster",
      "They don't work on all websites",
    ],
    answer: "They can be easily cracked by automated attacks",
  },
  {
    question:
      "Which of these should you look for to confirm a website's legitimacy before entering sensitive info?",
    options: [
      "A catchy slogan",
      "A recent copyright date",
      "A valid SSL certificate (padlock icon, HTTPS) and correct domain name",
      "Many vibrant images",
    ],
    answer:
      "A valid SSL certificate (padlock icon, HTTPS) and correct domain name",
  },
  {
    question:
      "What should you do if you encounter a suspicious website while Browse?",
    options: [
      "Stay on the site and investigate further",
      "Immediately close the browser tab/window",
      "Click on all links to see what happens",
      "Download any suggested 'security' software",
    ],
    answer: "Immediately close the browser tab/window",
  },
  {
    question: "What is 'pretexting' in social engineering?",
    options: [
      "Creating a fake website to trick victims",
      "Inventing a false scenario to gain trust and extract information",
      "Sending unsolicited text messages",
      "Using malware to steal data",
    ],
    answer: "Inventing a false scenario to gain trust and extract information",
  },
  {
    question:
      "Why are public Wi-Fi networks a higher risk for phishing attacks?",
    options: [
      "They are usually slower",
      "They are often unencrypted, making it easier for attackers to intercept data",
      "They limit your internet access",
      "They require too many steps to connect",
    ],
    answer:
      "They are often unencrypted, making it easier for attackers to intercept data",
  },
  {
    question:
      "If an email asks you to download and run a file, what is a major red flag?",
    options: [
      "The file is a PDF",
      "The file is from a recognized company",
      "The request is unexpected and not related to your work/communication",
      "The file size is small",
    ],
    answer:
      "The request is unexpected and not related to your work/communication",
  },
  {
    question:
      "What is the best way to dispose of old electronic devices that store personal data?",
    options: [
      "Throw them in the regular trash",
      "Donate them without wiping data",
      "Professionally wipe or destroy the hard drive/storage before disposal",
      "Just delete files manually",
    ],
    answer:
      "Professionally wipe or destroy the hard drive/storage before disposal",
  },
  {
    question: "What does 'malware' stand for?",
    options: [
      "Malicious software",
      "Managed hardware",
      "Machine learning software",
      "Maintenance alerts",
    ],
    answer: "Malicious software",
  },
  {
    question: "Which of these actions helps prevent account takeover?",
    options: [
      "Using the same password everywhere",
      "Enabling two-factor authentication (2FA)",
      "Clicking on suspicious links",
      "Sharing your password with friends",
    ],
    answer: "Enabling two-factor authentication (2FA)",
  },
  {
    question:
      "An email contains a link to 'verify your account' but has grammatical errors and blurry logos. What should you do?",
    options: [
      "Click the link, errors are common",
      "Correct the grammar and reply",
      "Ignore it and go to the official website directly",
      "Forward it to the company for verification",
    ],
    answer: "Ignore it and go to the official website directly",
  },
  {
    question:
      "What is the danger of clicking 'Allow' on unexpected browser notifications from unknown sites?",
    options: [
      "It slows down your computer",
      "It gives the site permission to send you unwanted ads and potentially malicious pop-ups",
      "It deletes your browser history",
      "It changes your default search engine",
    ],
    answer:
      "It gives the site permission to send you unwanted ads and potentially malicious pop-ups",
  },
  {
    question: "Which of these is NOT a common phishing scam tactic?",
    options: [
      "Offers that are too good to be true",
      "Threats of account suspension",
      "Requests for sensitive personal information (e.g., SSN, credit card)",
      "A legitimate password reset email after you requested one",
    ],
    answer: "A legitimate password reset email after you requested one",
  },
  {
    question:
      "What should you do if you receive an email from your CEO asking you to immediately transfer money?",
    options: [
      "Transfer the money right away as it's from the CEO",
      "Reply to the email to confirm",
      "Verify the request through a different, trusted channel (e.g., phone call to CEO's known number)",
      "Forward the email to the finance department",
    ],
    answer:
      "Verify the request through a different, trusted channel (e.g., phone call to CEO's known number)",
  },
];

export default allQuizQuestions;
