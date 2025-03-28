const ChatBox = ({ messages, chatBoxRef }: { messages: any[], chatBoxRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div ref={chatBoxRef} className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <p className="message-text">{msg.text}</p>
        </div>
      ))}
      
      <style jsx>{`
        .chat-box {
          flex-grow: 1;
          width: 100%;
          max-width: 800px;
          height: calc(200vh - 300px);
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin: 40px auto;
        }

        .message {
          padding: 12px 16px;
          border-radius: 18px;
          max-width: 75%;
          word-wrap: break-word;
          font-size: 16px;
          line-height: 1.4;
          display: inline-block;
        }

        .message.user {
          background-color: #007bff;
          color: white;
          margin-left: auto;
          text-align: right;
          border-top-right-radius: 2px;
        }

        .message.bot {
          background-color: #ffffff;
          color: #333;
          border: 1px solid #dcdcdc;
          border-top-left-radius: 2px;
        }

        .message-text {
          margin: 0;
        }

        /* Mobile Responsive */
        // @media (max-width: 768px) {
        //   .chat-box {
        //     height: calc(100vh - 160px);
        //     padding: 10px;
        //     max-width: 95%;
        //   }
        //   .message {
        //     max-width: 85%;
        //   }
        // }
      `}</style>
    </div>
  );
};

export default ChatBox;
