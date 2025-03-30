import { FaBars, FaUser } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useUser } from '@/context/userContext';
import { useEffect, useState } from 'react';

const Header = ({onMenuClick, onLoginClick }: {onMenuClick: () => void, onLoginClick: () => void }) => {
  const router = useRouter();
  const {user} = useUser();

  

  return (
    <header className="header">
      {/* render menu bar if user logged in */}
      {user?(<div className="menu-icon" onClick={onMenuClick}>
        <FaBars size={24} />
      </div>):null}

      <div className="app-name" onClick={() => router.push("/")}>
        <h1>NyaySakha</h1>
      </div>
      <div className="login">
        {user ? (
          // <FaUser size={24} />
          <p>{user.firstName}</p>
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
