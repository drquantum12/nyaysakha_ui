"use client";
import { useRef } from "react";
import ChatBox from "@/components/ChatBox";
import ChatInput from "@/components/ChatInput";
import {useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

interface Message {
  content: string;
  role: string;
}

export default function ChatHistory() {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const messages: Message[] = [];
  

  const handleSendMessage = async (text: string) => {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/`, {
      headers: {
        Authorization: `Bearer ${token}`,
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