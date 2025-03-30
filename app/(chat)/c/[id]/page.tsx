"use client";
import { useState, useEffect, useRef } from "react";
import ChatBox from "@/components/ChatBox";
import ChatInput from "@/components/ChatInput";
import {useParams } from "next/navigation";

interface Message {
  content: string;
  role: string;
}

export default function ChatHistory() {
  const id = useParams().id;
  const [messages, setMessages] = useState<Message[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const lastActiveRoleRef = useRef<string | null>(null);
  const isFetched = useRef(false);

  useEffect(() => {
    console.log(`api url : ${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`);

    if (isFetched.current) return;
    isFetched.current = true; // Mark as fetched

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/getConversation/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          },
          method: 'GET'
        });
        const data = await response.json();
        lastActiveRoleRef.current = data["messages"][data["messages"].length - 1]["role"];
        console.log("user role check", lastActiveRoleRef.current === "user");
        setMessages(data["messages"]);
        if (lastActiveRoleRef.current === "user") {
          handleSendMessage(data["messages"][data["messages"].length - 1]["content"]);
          lastActiveRoleRef.current = "bot";
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  });
  
  const handleSendMessage = async (text: string) => {

    if(lastActiveRoleRef.current === "bot") {
    setMessages((prevMessages) => [...prevMessages, { "content": text, "role": "user" }]);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ "prompt": text, "lastActiveRole": lastActiveRoleRef.current })
    });
    if (!response.body) {
      throw new Error("Response body is null");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let botResponse = "";

    // Add an empty bot message to start "typing"
  setMessages((prevMessages) => [...prevMessages, { content: "", role: "bot" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      botResponse += chunk;


      // Typewriter effect: add text character by character
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage?.role === "bot") {
        return [
          ...prevMessages.slice(0, -1),
          { ...lastMessage, content: botResponse }
        ];
      }
      return prevMessages;
    });

    // Small delay for the typewriter effect
    await new Promise((resolve) => setTimeout(resolve, 30));
  }
};

  return (
    <div className="mt-10">
      <ChatBox messages={messages} chatBoxRef={chatBoxRef} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};