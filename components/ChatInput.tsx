import { useState, useRef, useEffect } from 'react';


import { FaPaperPlane, FaPaperclip, FaSearch, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ChatInput = ({ onSendMessage }: { onSendMessage: (text: string) => void }) => {
  const [message, setMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  // const [isListening, setIsListening] = useState<boolean>(false);
  // const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [hasText, setHasText] = useState<boolean>(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px'; // Reset height
      if (message.trim() !== '' || attachedFiles.length > 0) {
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 250)}px`;
        setHasText(true);
      } else {
        setHasText(false);
      }
    }
  }, [message, attachedFiles]);

  // useEffect(() => {
  //   if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  //     recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //     recognitionRef.current.interimResults = true; // Enable interim results
  //     recognitionRef.current.lang = 'en-US';

  //     recognitionRef.current.onresult = (event) => {
  //       const transcript = Array.from(event.results)
  //         .map(result => result[0].transcript)
  //         .join('');
        
  //       // Update the message state with the transcript
  //       setMessage(transcript);
  //       setHasText(transcript.trim() !== '');
  //     };

  //     recognitionRef.current.onend = () => {
  //       setIsListening(false);
  //     };
  //   } else {
  //     console.error('Speech Recognition not supported in this browser.');
  //     alert('Speech Recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
  //   }
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.trim() !== '' || attachedFiles.length > 0);
    setHasText(e.target.value.trim() !== '' || attachedFiles.length > 0);
  };

  const handleSend = () => {
    if (message.trim() || attachedFiles.length > 0) {
      // onSendMessage(message, attachedFiles);
      onSendMessage(message);
      setMessage('');
      setAttachedFiles([]);
      setIsTyping(false);
      setHasText(false);
      // if (isListening) {
      //   recognitionRef.current?.stop();
      //   recognitionRef.current?.start();
      // }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      if (attachedFiles.length + filesArray.length > 2) {
        alert('You can only attach up to 2 files.');
        return;
      }
      const validFiles = filesArray.filter(file => 
        ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type)
      );
      setAttachedFiles([...attachedFiles, ...validFiles]);
      setIsTyping(true);
      setHasText(true);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(updatedFiles);
    if (updatedFiles.length === 0 && message.trim() === '') {
      setIsTyping(false);
      setHasText(false);
    }
  };

  const handleWebSearchClick = () => {
    router.push('https://www.google.com');
  };

  // const handleVoiceInputClick = () => {
  //   if (recognitionRef.current) {
  //     if (isListening) {
  //       recognitionRef.current.stop();
  //     } else {
  //       navigator.mediaDevices.getUserMedia({ audio: true })
  //         .then(() => {
  //           recognitionRef.current.start();
  //           setIsListening(true);
  //         })
  //         .catch((err) => {
  //           console.error('Microphone permission denied:', err);
  //           alert('Microphone access is required for voice input. Please allow microphone access in your browser settings.');
  //         });
  //     }
  //   }
  // };

  return (
    <div className={`chat-input-container ${hasText ? 'has-text' : ''}`}>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={1}
      />
      <div className="attached-files">
        {attachedFiles.map((file, index) => (
          <div key={index} className="file-preview">
            <span>{file.name}</span>
            <div
              style={{ cursor: 'pointer', display: 'inline-block', color: ""}}
              onClick={() => removeFile(index)}
            >
              <FaTimes />
            </div>
          </div>
        ))}
      </div>
      <div className="input-actions">
        <div className="left-icons">
          <label className="icon-wrapper filter-option">
            <FaPaperclip size={14} className="icon" />
            <span>Attach File</span>
            <input type="file" accept=".png,.jpg,.jpeg,.pdf" multiple hidden onChange={handleAttachClick} />
          </label>
          <div className="icon-wrapper filter-option" onClick={handleWebSearchClick}>
            <FaSearch size={14} className="icon" />
            <span>Web Search</span>
          </div>
        </div>
        <div className="right-icons">
        <div className="icon-wrapper" onClick={handleSend} title="Send Message">
              <FaPaperPlane size={20} className="icon" />
            </div>
            {isTyping && (
              <div className="icon-wrapper" title="Typing...">
                <span>Typing...</span>
              </div>
            )}
            {/*
          {isTyping || attachedFiles.length > 0 ? (
            <div className="icon-wrapper" onClick={handleSend} title="Send Message">
              <FaPaperPlane size={20} className="icon" />
            </div>
          ) : 
          (
            <div className="icon-wrapper" onClick={handleVoiceInputClick} title="Voice Input">
              <FaMicrophone size={20} className="icon" style={{ color: isListening ? '#007bff' : 'black' }} />
            </div>
          )
          }
          */}
        </div>
      </div>
      <style jsx>{`
        .chat-input-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 5px;
          border: 1px solid #ccc;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease, border-color 0.3s ease, border 0.3s ease;
          background: #fff;
          padding: 10px;
          position: relative;
        }

        .chat-input-container:hover {
          border-color: transparent;
          box-shadow: 0 4px 10px rgba(0, 123, 255, 0.4);
        }

        .chat-input-container.has-text {
          box-shadow: 0 4px 10px rgba(0, 123, 255, 0.4);
        }

        /* Hide scrollbar for WebKit browsers */
        textarea::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for Firefox */
        textarea {
          scrollbar-width: none;
        }

        textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: none;
          outline: none;
          resize: none;
          background: transparent;
          box-sizing: border-box;
          min-height: 50px;
          max-height: 200px;
          overflow-y: auto;
        }

        .attached-files {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 5px;
        }

        .file-preview {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #f0f0f0;
          padding: 3px;
          border-radius: 5px;
          font-size: 12px;
        }

        .input-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
        }

        .right-icons {
          display: flex;
          gap: 15px;
        }

        .left-icons {
          display: flex;
          gap: 15px;
        }

        .filter-option {
          background-color: #f0f0f0;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border-radius: 20px;
          padding: 5px 10px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .icon-wrapper:hover {
          color: #007bff;
        }

        .filter-option:hover {
          background-color: #e6f7fe;
        }

        .icon {
          font-size: 20px;
          transition: color 0.3s ease;
        }

        .icon-wrapper span {
          font-size: 12px;
          color: #808080;
          transition: color 0.3s ease;
        }

        .icon-wrapper:hover span {
          color: #007bff;
        }

        @media (max-width: 480px) {
          .chat-input-container {
            border-radius: 10px;
          }
        
          textarea {
            font-size: 14px;
          }

          .icon {
            font-size: 18px;
          }

          .icon-wrapper span {
            font-size: 13px;
          }

          .left-icons {
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatInput;