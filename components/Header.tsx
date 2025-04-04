import { FaBars } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/userContext';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import Logo from '@/assets/svgs/logo.svg';
import { auth } from '@/lib/firebase';
import { FaCircleUser } from 'react-icons/fa6';

const Header = ({onMenuClick, onLoginClick }: {onMenuClick: () => void, onLoginClick: () => void }) => {
  const router = useRouter();
  const {user} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onSignOut = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      console.log("User signed out");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <header className="header flex items-center justify-between px-4 py-2 bg-white shadow-md">
  {/* Render menu bar if user is logged in */}
  <div className="menu-icon cursor-pointer" onClick={onMenuClick}>
    <FaBars size={24} />
  </div>

  {/* Centered Logo + App Name */}
  <div className="flex items-center">
    <Image
      src={Logo}
      alt="Logo"
      width={60}
      height={60}
      className="rounded-full"
    />
    <h1 className="text-xl font-semibold">Neurosattva</h1>
  </div>

  {/* Login/Profile Section */}
  <div className="login">
    {user ? (
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={toggleDropdown}
          className="flex items-center gap-2 px-3 py-2 rounded-lg">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User Avatar"
              width={30}
              height={30}
              className="rounded-full"
            />
          ) : (
            <FaCircleUser size={30} className="text-black"/>
          )}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 text-gray-800">
            <p className="text-sm text-gray-500">{user.email}</p>
            <button
              onClick={onSignOut}
              className="w-full mt-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    ) : (
      <button className="login-btn" onClick={onLoginClick}>
        Login
      </button>
    )}
  </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: white;
          color: black;
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1200;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .menu-icon {
          cursor: pointer;
          color: black;
        }

        .menu-icon:hover {
          color: #007bff;
        }

        .app-name {
          flex-grow: 1;
          text-align: center;
          color: #333;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 1px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          transition: color 0.3s;
          padding-left: 100px;
        }

        .login-btn {
          background-color: transparent;
          border: 1px solid black;
          padding: 3px 10px;
          color: black;
          cursor: pointer;
          border-radius: 5px;
        }

        .login {
          display: flex;
          align-items: center;
          color: black;
        }

        .login-btn:hover {
          background-color: #007bff;
          color: #fff;
          border: 1px solid #007bff;
        }

        .login-btn:focus {
          outline: none;
        }

        @media (max-width: 768px) {
          .app-name {
            font-size: 18px;
            padding-left: 20px
          }
          .login-btn {
            padding: 1px 10px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
