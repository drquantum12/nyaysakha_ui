"use client";
import { useRef } from "react";
import ChatBox from "@/components/ChatBox";
import ChatInput from "@/components/ChatInput";
import {useRouter } from "next/navigation";

interface Message {
  content: string;
  role: string;
}

export default function ChatHistory() {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const messages: Message[] = [];
  

  const handleSendMessage = async (text: string) => {
    console.log("Sending message:", text);
    const response = await fetch(`${process.env.API_URL}/chat/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ "prompt": text, "lastActiveRole": "user" })
    });

    if(response.ok){
      const conversationId = await response.json().then(data => data["conversationId"]);
      router.push(`/c/${conversationId}`);
    }
  
};

  


  return (
    <div className="mt-10">
      <ChatBox messages={messages} chatBoxRef={chatBoxRef} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};