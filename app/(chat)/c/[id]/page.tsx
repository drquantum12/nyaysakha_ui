"use client";
import { useState, useEffect, useRef, use } from "react";
import ChatBox from "@/components/ChatBox";
import ChatInput from "@/components/ChatInput";
import { useParams } from "next/navigation";

export default function ChatHistory() {
  const id = useParams().id;
  const [messages, setMessages] = useState<any[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/chat/getConversation/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          },
          method: 'GET'
        });
        const data = await response.json();
        setMessages(data["messages"]);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [id]);
  
  const handleSendMessage = async (text: string) => {
    console.log("Sending message:", text);
    setMessages((prevMessages) => [...prevMessages, { "content": text, "role": "user" }]);
    const response = await fetch(`http://localhost:8000/chat/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ "prompt":text })
    });
   if(response.ok){
     const data = await response.json();
     console.log("Received response:", data["results"]);
     setMessages((prevMessages) => [...prevMessages, { "content": data["results"], "role": "bot" }]);
   }
   else{
     console.error("Failed to send message");}
  };

  return (
    <div className="mt-10">
      <ChatBox messages={messages} chatBoxRef={chatBoxRef} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};