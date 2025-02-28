"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import Sidebar from "./sidebar/sidebar";
import { useUser } from '@/context/userContext';

const randomQuestionsAnswers = [
  { question: "What is your name?", answer: "I am Chat.gov Bot!" },
  { question: "How are you?", answer: "I am doing great, thank you!" },
];

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useUser();

  const handleSendMessage = (text: string) => {
    if (!isChatVisible) {
      setIsChatVisible(true);
    }

    setMessages((prevMessages) => [...prevMessages, { sender: "user", text }]);

    const botResponse =
      randomQuestionsAnswers.find(
        (qa) => qa.question.toLowerCase() === text.toLowerCase()
      )?.answer || "I didn’t quite understand that. Could you please rephrase?";

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botResponse },
    ]);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);

  return (
    <div className="container">
      <Header
        loggedIn={loggedIn}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onLoginClick={() => router.push("/signin")}
      />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="chat-container">
        {isChatVisible && <ChatBox messages={messages} chatBoxRef={chatBoxRef} />}
      </div>

      {!isChatVisible || messages.length === 0 ? (
        <div className="helper-text">
          Hey! How can I help you today?
        </div>
      ) : null}

      <div className={`chat-input-wrapper ${isChatVisible ? "chat-visible" : ""}`}>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          width: 90%;
          margin: 0 auto;
          padding: 20px;
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .chat-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 10px;
          overflow-y: auto;
          padding-bottom: 70px;
        }

        .chat-input-wrapper {
          position: fixed;
          left: 53%;
          transform: translateX(-50%);
          max-width: 800px;
          width: 90%;
          display: flex;
          justify-content: center;
          transition: top 0.3s ease, bottom 0.3s ease;
        }

        .chat-input-wrapper:not(.chat-visible) {
          top: 50%;
        }

        .chat-visible {
          bottom: 15px;
          top: auto;
        }

        .helper-text {
          position: fixed;
          bottom: 55%;
          left: 52%;
          width: 90%;
          transform: translateX(-50%);
          text-align: center;
          margin-bottom: 10px;
          font-size: 24px;
          color: #333;
          font-weight: bold;
          transition: opacity 0.3s ease;
        }

        .helper-text.hidden {
          opacity: 0;
          pointer-events: none;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .container {
            width: 95%;
            max-width: 100%;
          }
          .chat-input-wrapper {
            width: 95%;
            left: 50%;
          }
          .helper-text {
            font-size: 20px;
            left: 50%;
          }
        }
      `}</style>
    </div>
  );
}
