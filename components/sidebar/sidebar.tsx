import { useEffect, useState } from 'react';
import { FaCog, FaQuestionCircle, FaUser , FaLockOpen, FaLock } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useAuth } from '@/context/userContext';
import { auth } from '@/lib/firebase';

interface conversations {
  conversationId: string;
  topic: string;
}

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isPersistent, setIsPersistent] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [conversations_, setConversations] = useState<conversations[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // fetch conversations if user is logged in
      const fetchConversations = async () => {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/getConversations`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'GET'
        });
        if (response.ok) {
          const messages = await response.json();
          setConversations(messages["result"]);
        }
      };
      fetchConversations();

    }
  }, [user]);

  useEffect(() => {
    const persistentState = localStorage.getItem('sidebarPersistent');
    if (persistentState === 'true') {
      setIsPersistent(true);
      setIsSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarPersistent', isPersistent.toString());
  }, [isPersistent]);

  useEffect(() => {
    if (isPersistent) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(isOpen);
    }
  }, [isOpen, isPersistent]);

  const handleClose = () => {
    if (!isPersistent) {
      onClose();
    }
  };

  const togglePersistent = () => {
    setIsPersistent((prev) => !prev);
  };

  return (
    // render sidebar only if user is logged in
    <>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button onClick={togglePersistent} className="persistent-btn">
            {isPersistent ? <FaLock title='Toggle sidebar open/close' size={12} /> : <FaLockOpen title='Keep sidebar open' size={14} />}
          </button>
        </div>
        <div className="sidebar-content">
        {/* past conversations like chatgpt sidebar */}
        <ul>
          {conversations_.map((conversation, index) => (
            <Link key={index} href={`/c/${conversation.conversationId}`}>
             <p>{conversation.topic}</p>
            </Link>
          ))}
        </ul>
          <ul>
            <li onClick={() => router.push('/settings')}>
              <FaCog size={17} className="icon" />
              Settings
            </li>
            <li onClick={() => router.push('/help')}>
              <FaQuestionCircle size={17} className="icon" />
              Help
            </li>
            <li onClick={() => router.push('/aboutUs')}>
              <FaQuestionCircle size={17} className="icon" />
              About Us
            </li>
          </ul>
        </div>
        <div className="sidebar-footer" onClick={() => router.push('/myAccount')}>
          <FaUser size={15} className="icon" />
          <span>My Account</span>
        </div>
      </div>
  
      {isSidebarOpen && <div className="overlay" onClick={handleClose}></div>}
  
      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: -260px;
          width: 260px;
          height: 100%;
          background-color: #222;
          color: white;
          transition: left 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
          z-index: 1100;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
        }

        .sidebar.open {
          left: 0;
        }

        .sidebar-header {
          position: absolute;
          top: 8%;
          right: 10px;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
  
        .persistent-btn {
            cursor: pointer;
            padding: 4px;
            transition: background-color 0.3s ease, transform 0.5s ease;
            border-radius: 50%;
            background-color: transparent;
            color: white;
        }
        
        .persistent-btn:hover {
            color: #007bff;
            background-color: white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            transform: scale(1.1);
        }

        .sidebar-content {
          flex-grow: 1;
          padding: 80px 0px;
        }
  
        .sidebar-content ul {
          list-style: none;
          padding: 4px;
        }
  
        .sidebar-content li {
          display: flex;
          align-items: center;
          padding: 12px;
          gap: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
  
        .sidebar-content li:hover {
          background-color: #333;
          color: #007bff;
        }
  
        .icon {
          margin-right: 10px;
          font-size: 18px;
        }
  
        .sidebar-footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          background-color: #333;
          padding: 10px 18px;
          gap: 6px;
          display: flex;
          align-items: center;
          font-weight: bold;
          cursor: pointer;
          margin: 15px 0 0;
        }
  
        .sidebar-footer:hover {
          color: #007bff;
        }
  
        /* Overlay only for mobile */
        @media (max-width: 768px) {
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
          }
        }
      `}</style>
    </>
  );  
};

export default Sidebar;