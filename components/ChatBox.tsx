import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';


interface Message {
  content: string;
  role: string;
}

const ChatBox = ({ messages, chatBoxRef }: { messages: Message[], chatBoxRef: React.RefObject<HTMLDivElement|null> }) => {
  return (
    <div ref={chatBoxRef} className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          <div className="message-text">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{msg.content}</Markdown>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        .chat-box {
          flex-grow: 1;
          width: 100%;
          max-width: 800px;
          height: calc(100vh - 300px);
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 8px;
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
          background-color: #edeceb;
          color: black;
          margin-left: auto;
          text-align: right;
          border-top-right-radius: 2px;
        }

        .message.bot {
          background-color: #ffffff;
          color: #333;
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
