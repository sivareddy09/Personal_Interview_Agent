import React, { useState, useEffect, useRef } from 'react';

// --- CSS Styles ---
const GlobalStyles = () => (
  <style>{`
    /* General App Styles */
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f3f4f6;
    }

    .app-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }

    .main-card {
      width: 100%;
      max-width: 56rem; /* 896px */
      background-color: white;
      border-radius: 1rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .card-header {
      padding: 1.5rem;
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .stage-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #374151;
      text-align: center;
      margin: 0;
    }

    .card-body {
      padding: 1rem;
    }

    @media (min-width: 640px) {
      .card-body {
        padding: 1.5rem;
      }
    }

    .text-center {
      text-align: center;
    }

    .p-6 { padding: 1.5rem; }
    .p-8 { padding: 2rem; }

    /* Component Titles */
    .component-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .component-subtitle {
      color: #4b5563;
      margin-bottom: 1rem;
    }

    /* Buttons */
    .button {
      font-weight: bold;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 1rem;
      margin-top: 1rem;
    }

    .button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .button-primary {
      background-color: #4f46e5;
      color: white;
    }
    .button-primary:hover:not(:disabled) {
      background-color: #4338ca;
    }

    .button-next {
      background-color: #10b981;
      color: white;
    }
    .button-next:hover:not(:disabled) {
      background-color: #059669;
    }

    .button-secondary {
      background-color: #4b5563;
      color: white;
    }
    .button-secondary:hover:not(:disabled) {
      background-color: #374151;
    }

    /* Forms & Inputs */
    .input-group {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-direction: column;
    }
    @media (min-width: 640px) {
      .input-group {
        flex-direction: row;
      }
    }

    .input-field, .textarea-field, .select-field {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      width: 100%;
      box-sizing: border-box;
      font-size: 1rem;
    }
    .input-field:focus, .textarea-field:focus, .select-field:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 2px #c7d2fe;
    }
    .input-group .input-field {
      flex-grow: 1;
    }
    .textarea-field {
      margin-bottom: 1rem;
      resize: vertical;
    }

    .select-group {
      margin-bottom: 1rem;
    }
    .select-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    /* New File Upload Styles */
    .file-upload-wrapper {
      border: 2px dashed #d1d5db;
      border-radius: 0.5rem;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      background-color: #f9fafb;
      margin-bottom: 1rem;
      transition: background-color 0.2s, border-color 0.2s;
    }
    .file-upload-wrapper:hover {
      background-color: #f3f4f6;
      border-color: #4f46e5;
    }
    .file-upload-wrapper input[type="file"] {
      display: none;
    }
    .file-upload-text {
      color: #4b5563;
      font-weight: 500;
    }
    .file-upload-text span {
      color: #4f46e5;
      font-weight: bold;
    }
    .file-name {
      margin-top: 1rem;
      font-weight: bold;
      color: #374151;
    }

    /* New Mic Button Styles */
    .button-icon {
      padding: 0.5rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e5e7eb;
      color: #4b5563;
      margin-left: 0.5rem;
      flex-shrink: 0;
    }
    .button-icon:hover:not(:disabled) {
      background-color: #d1d5db;
    }
    .button-icon.listening {
      background-color: #ef4444;
      color: white;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }

    .textarea-wrapper {
      position: relative;
      display: flex;
      align-items: flex-start;
    }
    .textarea-wrapper .textarea-field {
      width: 100%;
      padding-right: 50px; /* Space for the button */
    }
    .textarea-wrapper .button-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      margin-top: 0;
    }

    /* Results & Display Boxes */
    .results-box {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #f9fafb;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
    }
    .results-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .prose {
      color: #374151;
      line-height: 1.6;
    }

    .question-box {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background-color: #f9fafb;
      margin-bottom: 1rem;
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
    }

    /* Feature Specific Styles */
    .welcome-title { font-size: 2.25rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem; }
    .welcome-subtitle { font-size: 1.125rem; color: #4b5563; margin-bottom: 2rem; }

    .feature-box {
      margin: 1.5rem 0;
      padding: 1rem;
      border-left: 4px solid #4f46e5;
      background-color: #eef2ff;
      border-radius: 0 0.5rem 0.5rem 0;
    }
    .feature-box h3 { margin-top: 0; color: #3730a3; }
    .feature-box p { color: #4338ca; }

    .generated-pitch-box {
      margin-top: 1rem;
      padding: 1rem;
      background-color: white;
      border-radius: 0.5rem;
      border: 1px solid #d1d5db;
    }
    .generated-pitch-box h4 { font-weight: 600; margin-bottom: 0.5rem; margin-top: 0; }
    .generated-pitch-box p { font-style: italic; color: #374151; }

    /* Mock Interview Chat */
    .mock-interview-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .chat-window {
      flex-grow: 1;
      background-color: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1rem;
      overflow-y: auto;
      margin-bottom: 1rem;
      box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
      min-height: 400px;
    }
    .chat-message-wrapper {
      display: flex;
      margin-bottom: 0.75rem;
    }
    .chat-message-wrapper.user { justify-content: flex-end; }
    .chat-message-wrapper.ai { justify-content: flex-start; }
    .chat-message {
      padding: 0.5rem 1rem;
      border-radius: 0.75rem;
      max-width: 80%;
    }
    .chat-message-wrapper.user .chat-message {
      background-color: #4f46e5;
      color: white;
    }
    .chat-message-wrapper.ai .chat-message {
      background-color: #e5e7eb;
      color: #1f2937;
    }

    /* Thank You Screen */
    .thank-you-title { font-size: 2.25rem; font-weight: bold; color: #10b981; margin-bottom: 1rem; }
    .thank-you-subtitle { font-size: 1.125rem; color: #4b5563; margin-bottom: 2rem; }
    .thank-you-feature-box {
      margin: 2.5rem 0;
      padding: 1.5rem;
      border-top: 4px solid #4f46e5;
      background-color: #f9fafb;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
    .thank-you-inputs {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    @media (min-width: 768px) {
      .thank-you-inputs {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Loading Spinner */
    .loading-spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
    .loading-spinner {
      animation: spin 1s linear infinite;
      border-radius: 50%;
      height: 2rem;
      width: 2rem;
      border-bottom: 2px solid #4f46e5;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
      border-top: 2px solid transparent;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}</style>
);


// --- Helper Functions & Constants ---
const API_KEY = "AIzaSyAXvsgiQFh2KEV0OcCaPSxsSue11T_rOzM"; // PASTE YOUR GEMINI API KEY HERE

const STAGES = {
  WELCOME: 'WELCOME',
  COMPANY_RESEARCH: 'COMPANY_RESEARCH',
  RESUME_REVIEW: 'RESUME_REVIEW',
  BEHAVIORAL_QUESTIONS: 'BEHAVIORAL_QUESTIONS',
  TECHNICAL_QUESTIONS: 'TECHNICAL_QUESTIONS',
  MOCK_INTERVIEW: 'MOCK_INTERVIEW',
  QUESTIONS_FOR_INTERVIEWER: 'QUESTIONS_FOR_INTERVIEWER',
  THANK_YOU: 'THANK_YOU',
};

const behavioralQuestions = [
  "Tell me about yourself.",
  "What are your biggest strengths and weaknesses?",
  "Tell me about a time you had to overcome a challenge.",
  "Where do you see yourself in 5 years?",
  "Why do you want to work for this company?",
  "Describe a time you had a conflict with a coworker and how you resolved it.",
  "Tell me about a project you are particularly proud of.",
];

const technicalTopics = {
  "Data Structures": ["Arrays", "Linked Lists", "Trees", "Graphs", "Hash Tables"],
  "Algorithms": ["Sorting", "Searching", "Dynamic Programming", "Recursion", "Big O Notation"],
  "System Design": ["Scalability", "Databases", "Caching", "Load Balancing", "API Design"],
  "Databases": ["SQL", "NoSQL", "Indexing", "Transactions", "Normalization"],
  "Networking": ["TCP/IP", "HTTP/HTTPS", "DNS", "OSI Model", "Sockets"]
};

// --- API Call Helper ---
const callGeminiAPI = async (prompt, filePayload = null, retries = 3, delay = 1000) => {
  if (!API_KEY) {
    return "Error: API key is missing. Please add your Gemini API key to the `API_KEY` constant in `src/App.js`.";
  }

  const userParts = [{ text: prompt }];
  if (filePayload) {
    userParts.push({
      inlineData: {
        mimeType: filePayload.mimeType,
        data: filePayload.data
      }
    });
  }

  const payload = {
    contents: [{ role: "user", parts: userParts }]
  };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
      } else if (result.promptFeedback) {
        console.error("API call blocked:", result.promptFeedback);
        return `Sorry, my safety filters blocked the request. Reason: ${result.promptFeedback.blockReason}.`;
      }
      else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      if (i === retries - 1) {
        console.error("API call failed after multiple retries:", error);
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
      }
      await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
    }
  }
};


// --- UI Components ---

const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
  </div>
);

// --- New SpeechRecognitionButton Component ---
const SpeechRecognitionButton = ({ onTranscript, isListening, setIsListening }) => {
  const recognitionRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Web Speech API is not supported by this browser.");
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscript, setIsListening]);

  const toggleListen = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };
  
  if (!isSupported) {
    return null; // Don't render the button if the browser doesn't support the API
  }

  return (
    <button onClick={toggleListen} className={`button button-icon ${isListening ? 'listening' : ''}`} title="Use Microphone">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
    </button>
  );
};

const WelcomeScreen = ({ onStart }) => (
  <div className="text-center p-8">
    <h1 className="welcome-title">Welcome to Your Personal Interview Coach</h1>
    <p className="welcome-subtitle">Let's get you ready for your next big interview. We'll cover everything from company research to a full mock interview.</p>
    <button onClick={onStart} className="button button-primary">
      Let's Get Started
    </button>
  </div>
);

const CompanyResearch = ({ onComplete }) => {
  const [companyName, setCompanyName] = useState('');
  const [research, setResearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResearch = async () => {
    if (!companyName) return;
    setIsLoading(true);
    const prompt = `Provide a brief overview of ${companyName}. Include its mission, key products/services, and recent news or developments. Format it nicely for an interview candidate.`;
    const result = await callGeminiAPI(prompt);
    setResearch(result);
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="component-title">Company Research</h2>
      <p className="component-subtitle">Enter the company you're interviewing with. Understanding the company is key to a successful interview.</p>
      <div className="input-group">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g., Google, Microsoft"
          className="input-field"
        />
        <button onClick={handleResearch} disabled={isLoading || !companyName} className="button button-primary">
          {isLoading ? 'Researching...' : 'Research'}
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
      {research && (
        <div className="results-box">
          <h3 className="results-title">About {companyName}</h3>
          <div className="prose" dangerouslySetInnerHTML={{ __html: research.replace(/\n/g, '<br />') }} />
          <button onClick={() => onComplete(companyName)} className="button button-next">
            Next: Resume Review
          </button>
        </div>
      )}
    </div>
  );
};

// --- Updated ResumeReview Component ---
const ResumeReview = ({ onComplete }) => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setFileData({
          mimeType: selectedFile.type,
          data: base64String
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleReview = async () => {
    if (!fileData) return;
    setIsLoading(true);
    const prompt = "Please review this uploaded resume and provide constructive feedback. Focus on clarity, impact, and formatting. Suggest specific improvements to make it stand out to recruiters.";
    const result = await callGeminiAPI(prompt, fileData);
    setFeedback(result);
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="component-title">Resume Review</h2>
      <p className="component-subtitle">Upload your resume (PDF, DOCX, etc.). I'll provide feedback to help you make the best impression.</p>
      
      <div className="file-upload-wrapper" onClick={() => fileInputRef.current.click()}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,text/plain"
        />
        <p className="file-upload-text">
          {file ? `Selected file:` : <><span>Click to browse</span> or drag and drop a file</>}
        </p>
        {file && <p className="file-name">{file.name}</p>}
      </div>

      <button onClick={handleReview} disabled={isLoading || !file} className="button button-primary">
        {isLoading ? 'Analyzing...' : 'Get Feedback'}
      </button>

      {isLoading && <LoadingSpinner />}
      {feedback && (
        <div className="results-box">
          <h3 className="results-title">Resume Feedback</h3>
          <div className="prose" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />
          <button onClick={onComplete} className="button button-next">
            Next: Behavioral Questions
          </button>
        </div>
      )}
    </div>
  );
};


const BehavioralQuestions = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const [pitchPoints, setPitchPoints] = useState('');
  const [generatedPitch, setGeneratedPitch] = useState('');
  const [isPitchLoading, setIsPitchLoading] = useState(false);

  const handleGetFeedback = async () => {
    if (!answer) return;
    setIsLoading(true);
    const prompt = `The interview question is: "${behavioralQuestions[currentQuestionIndex]}". The candidate's answer is: "${answer}". Please provide feedback on this answer. Suggest how to improve it using the STAR (Situation, Task, Action, Result) method.`;
    const result = await callGeminiAPI(prompt);
    setFeedback(result);
    setIsLoading(false);
  };

  const handleGeneratePitch = async () => {
    if (!pitchPoints) return;
    setIsPitchLoading(true);
    const prompt = `Based on these key points, craft a compelling 60-second "Tell me about yourself" elevator pitch for a job interview. Make it sound natural and confident.\n\nKey Points:\n${pitchPoints}`;
    const result = await callGeminiAPI(prompt);
    setGeneratedPitch(result);
    setIsPitchLoading(false);
  };

  const handleNextQuestion = () => {
    setFeedback('');
    setAnswer('');
    setGeneratedPitch('');
    setPitchPoints('');
    if (currentQuestionIndex < behavioralQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="p-6">
      <h2 className="component-title">Behavioral Questions</h2>
      <div className="question-box">
        <p>{behavioralQuestions[currentQuestionIndex]}</p>
      </div>

      {currentQuestionIndex === 0 && (
        <div className="feature-box">
          <h3>Need help with your pitch?</h3>
          <p>Enter some key points about your experience and skills, and I'll help you craft a great "Tell me about yourself" answer.</p>
          <textarea
            value={pitchPoints}
            onChange={(e) => setPitchPoints(e.target.value)}
            placeholder="e.g., - 5 years experience in React development&#10;- Passionate about building user-friendly interfaces&#10;- Led a team of 3 on the new checkout project"
            className="textarea-field"
            style={{height: '6rem'}}
          />
          <button onClick={handleGeneratePitch} disabled={isPitchLoading || !pitchPoints} className="button button-primary">
            {isPitchLoading ? 'Generating...' : '✨ Generate Pitch'}
          </button>
          {isPitchLoading && <LoadingSpinner />}
          {generatedPitch && (
            <div className="generated-pitch-box">
              <h4>Here's a draft you can use:</h4>
              <p>{generatedPitch}</p>
            </div>
          )}
        </div>
      )}

      <div className="textarea-wrapper">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type or click the mic to speak your answer..."
          className="textarea-field"
          style={{height: '10rem'}}
        />
        <SpeechRecognitionButton
          onTranscript={(transcript) => setAnswer(prev => prev ? `${prev} ${transcript}` : transcript)}
          isListening={isListening}
          setIsListening={setIsListening}
        />
      </div>

      <button onClick={handleGetFeedback} disabled={isLoading || !answer} className="button button-primary">
        {isLoading ? 'Getting Feedback...' : 'Get Feedback'}
      </button>
      {isLoading && <LoadingSpinner />}
      {feedback && (
        <div className="results-box">
          <h3 className="results-title">Feedback</h3>
          <div className="prose" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />
          <button onClick={handleNextQuestion} className="button button-next">
            {currentQuestionIndex < behavioralQuestions.length - 1 ? 'Next Question' : 'Next: Technical Questions'}
          </button>
        </div>
      )}
    </div>
  );
};

const TechnicalQuestions = ({ onComplete }) => {
    const [topic, setTopic] = useState(Object.keys(technicalTopics)[0]);
    const [subTopic, setSubTopic] = useState(technicalTopics[topic][0]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [questionLoading, setQuestionLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);

    // Reset sub-topic when main topic changes
    useEffect(() => {
        setSubTopic(technicalTopics[topic][0]);
    }, [topic]);

    const generateQuestion = async () => {
        if (!topic || !subTopic) return;
        setQuestionLoading(true);
        setQuestion('');
        setAnswer('');
        setFeedback('');
        const prompt = `Generate a common interview question for a software engineering role on the topic of: ${topic}, specifically about ${subTopic}.`;
        const result = await callGeminiAPI(prompt);
        setQuestion(result);
        setQuestionLoading(false);
    };

    // Generate a new question whenever the topic or sub-topic changes
    useEffect(() => {
        generateQuestion();
    }, [topic, subTopic]);

    const handleGetFeedback = async () => {
        if (!answer) return;
        setIsLoading(true);
        const prompt = `The technical interview question is: "${question}". The candidate's answer is: "${answer}". Please evaluate this answer for correctness, clarity, and efficiency. Provide constructive feedback.`;
        const result = await callGeminiAPI(prompt);
        setFeedback(result);
        setIsLoading(false);
    };

    return (
        <div className="p-6">
            <h2 className="component-title">Technical Questions</h2>
            <div className="select-group">
                <label htmlFor="topic-select">Choose a topic:</label>
                <select id="topic-select" value={topic} onChange={e => setTopic(e.target.value)} className="select-field">
                    {Object.keys(technicalTopics).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            
            <div className="select-group">
                <label htmlFor="sub-topic-select">Choose a sub-topic:</label>
                <select id="sub-topic-select" value={subTopic} onChange={e => setSubTopic(e.target.value)} className="select-field">
                    {technicalTopics[topic].map(st => <option key={st} value={st}>{st}</option>)}
                </select>
            </div>
            
            {questionLoading && <LoadingSpinner />}

            {question && (
                <>
                    <div className="question-box">
                        <p>{question}</p>
                    </div>
                    <div className="textarea-wrapper">
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Write or click the mic to speak your solution..."
                            className="textarea-field"
                            style={{height: '12rem', fontFamily: 'monospace'}}
                        />
                        <SpeechRecognitionButton
                          onTranscript={(transcript) => setAnswer(prev => prev ? `${prev} ${transcript}` : transcript)}
                          isListening={isListening}
                          setIsListening={setIsListening}
                        />
                    </div>
                    <button onClick={handleGetFeedback} disabled={isLoading || !answer} className="button button-primary">
                        {isLoading ? 'Evaluating...' : 'Evaluate Answer'}
                    </button>
                    {isLoading && <LoadingSpinner />}
                    {feedback && (
                        <div className="results-box">
                            <h3 className="results-title">Evaluation</h3>
                            <div className="prose" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />
                            <button onClick={onComplete} className="button button-next">
                                Next: Mock Interview
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const MockInterview = ({ onComplete }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{ sender: 'ai', text: "Welcome to your mock interview. I'll ask you a series of behavioral and technical questions. Let's start with this: Tell me about yourself." }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const conversationHistory = newMessages.map(msg => `${msg.sender === 'ai' ? 'Interviewer' : 'Candidate'}: ${msg.text}`).join('\n');
    const prompt = `This is a mock interview. Here is the conversation so far:\n\n${conversationHistory}\n\nBased on the candidate's last response, ask a relevant follow-up question or a new standard interview question (mix of behavioral and technical). If the candidate seems to be finishing, you can provide final feedback. Keep your response as the interviewer only.`;
    
    const aiResponse = await callGeminiAPI(prompt);
    setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="p-6 mock-interview-container">
      <h2 className="component-title">Mock Interview Simulation</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-wrapper ${msg.sender === 'user' ? 'user' : 'ai'}`}>
            <div className="chat-message">
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="chat-message-wrapper ai"><div className="chat-message">...</div></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-group" style={{alignItems: 'center'}}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          placeholder="Type or click the mic to speak..."
          className="input-field"
          disabled={isLoading}
        />
        <SpeechRecognitionButton
          onTranscript={(transcript) => setUserInput(prev => prev ? `${prev} ${transcript}` : transcript)}
          isListening={isListening}
          setIsListening={setIsListening}
        />
        <button onClick={handleSendMessage} disabled={isLoading} className="button button-primary">
          Send
        </button>
      </div>
       <div className="text-center">
         <button onClick={onComplete} className="button button-next">
            Finish Interview
         </button>
       </div>
    </div>
  );
};

const QuestionsForInterviewer = ({ companyName, onComplete }) => {
    const [questions, setQuestions] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSuggestQuestions = async () => {
        setIsLoading(true);
        const prompt = `Generate 5 insightful questions for a candidate to ask an interviewer at ${companyName || 'the company'}. The questions should demonstrate interest in the company culture, team dynamics, and the role's challenges and opportunities. Format them as a numbered list.`;
        const result = await callGeminiAPI(prompt);
        setQuestions(result);
        setIsLoading(false);
    };
    
    return (
        <div className="p-6">
            <h2 className="component-title">Questions for the Interviewer</h2>
            <p className="component-subtitle">Asking smart questions shows your engagement and interest. Let's prepare some for {companyName || 'your interview'}.</p>
            <button onClick={handleSuggestQuestions} disabled={isLoading} className="button button-primary">
                {isLoading ? 'Generating...' : '✨ Suggest Questions'}
            </button>
            {isLoading && <LoadingSpinner />}
            {questions && (
                <div className="results-box">
                    <h3 className="results-title">Suggested Questions:</h3>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: questions.replace(/\n/g, '<br />') }} />
                    <button onClick={onComplete} className="button button-next">
                        Finish Prep
                    </button>
                </div>
            )}
        </div>
    );
};


const ThankYouScreen = ({ onRestart }) => {
    const [interviewerName, setInterviewerName] = useState('');
    const [keyPoint, setKeyPoint] = useState('');
    const [draft, setDraft] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDraftNote = async () => {
        if (!interviewerName || !keyPoint) return;
        setIsLoading(true);
        const prompt = `Draft a professional and concise thank you email to an interviewer named ${interviewerName}. The candidate wants to mention their interest in the role and specifically bring up this point from the conversation: "${keyPoint}". The email should be ready to copy and paste.`;
        const result = await callGeminiAPI(prompt);
        setDraft(result);
        setIsLoading(false);
    };

    return (
        <div className="p-8">
            <div className="text-center">
                <h1 className="thank-you-title">Congratulations!</h1>
                <p className="thank-you-subtitle">You've completed the interview preparation. You're now one step closer to landing your dream job. Best of luck!</p>
            </div>

            <div className="thank-you-feature-box">
                <h2 className="component-title">One Last Step: The Thank You Note</h2>
                <p className="component-subtitle">A well-written thank you note can make a huge difference. Let me help you draft one.</p>
                <div className="thank-you-inputs">
                    <input type="text" value={interviewerName} onChange={e => setInterviewerName(e.target.value)} placeholder="Interviewer's Name" className="input-field" />
                    <input type="text" value={keyPoint} onChange={e => setKeyPoint(e.target.value)} placeholder="One key thing you discussed" className="input-field" />
                </div>
                <button onClick={handleDraftNote} disabled={isLoading || !interviewerName || !keyPoint} className="button button-primary">
                    {isLoading ? 'Drafting...' : '✨ Draft Note'}
                </button>
                {isLoading && <LoadingSpinner />}
                {draft && (
                    <div style={{marginTop: '1rem'}}>
                        <textarea readOnly value={draft} className="textarea-field" style={{height: '16rem', fontFamily: 'monospace'}} />
                    </div>
                )}
            </div>

            <div className="text-center">
                <button onClick={onRestart} className="button button-secondary">
                    Start Over
                </button>
            </div>
        </div>
    );
};

// --- Main App Component ---

export default function App() {
  const [stage, setStage] = useState(STAGES.WELCOME);
  const [companyName, setCompanyName] = useState('');

  const stageComponents = {
    [STAGES.WELCOME]: <WelcomeScreen onStart={() => setStage(STAGES.COMPANY_RESEARCH)} />,
    [STAGES.COMPANY_RESEARCH]: <CompanyResearch onComplete={(name) => { setStage(STAGES.RESUME_REVIEW); setCompanyName(name); }} />,
    [STAGES.RESUME_REVIEW]: <ResumeReview onComplete={() => setStage(STAGES.BEHAVIORAL_QUESTIONS)} />,
    [STAGES.BEHAVIORAL_QUESTIONS]: <BehavioralQuestions onComplete={() => setStage(STAGES.TECHNICAL_QUESTIONS)} />,
    [STAGES.TECHNICAL_QUESTIONS]: <TechnicalQuestions onComplete={() => setStage(STAGES.MOCK_INTERVIEW)} />,
    [STAGES.MOCK_INTERVIEW]: <MockInterview onComplete={() => setStage(STAGES.QUESTIONS_FOR_INTERVIEWER)} />,
    [STAGES.QUESTIONS_FOR_INTERVIEWER]: <QuestionsForInterviewer companyName={companyName} onComplete={() => setStage(STAGES.THANK_YOU)} />,
    [STAGES.THANK_YOU]: <ThankYouScreen onRestart={() => setStage(STAGES.WELCOME)} />,
  };
  
  const stageTitles = {
    [STAGES.WELCOME]: "Welcome",
    [STAGES.COMPANY_RESEARCH]: "Step 1: Company Research",
    [STAGES.RESUME_REVIEW]: "Step 2: Resume Review",
    [STAGES.BEHAVIORAL_QUESTIONS]: "Step 3: Behavioral Questions",
    [STAGES.TECHNICAL_QUESTIONS]: "Step 4: Technical Questions",
    [STAGES.MOCK_INTERVIEW]: "Step 5: Mock Interview",
    [STAGES.QUESTIONS_FOR_INTERVIEWER]: "Step 6: Questions for the Interviewer",
    [STAGES.THANK_YOU]: "All Done!",
  }

  return (
    <div className="app-container">
      <GlobalStyles />
      <div className="main-card">
        <div className="card-header">
          <h1 className="stage-title">{stageTitles[stage]}</h1>
        </div>
        <div className="card-body">
          {stageComponents[stage]}
        </div>
      </div>
    </div>
  );
}
