"use client";

import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from "next/navigation";
import Logo from '../../assets/images/logo.png';
import Image from 'next/image';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      await fetch('/api/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Password recovery email sent successfully! Please check your inbox.');
    } catch (err) {
      setError('Failed to send recovery email. Please try again.');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="logo-container" onClick={() => router.push("/")}>
        <Image 
          src={Logo}
          alt="Legal Insight Logo" 
          className="logo" 
          width={150}
          height={50}
        />
        <span></span>
      </div>
      <div className="form-container">
        <span 
          // title='Home'
          className={`close-icon ${isHovered ? 'rotate' : ''}`} 
          onClick={() => router.push("/")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AiOutlineClose size={20} />
        </span>
        <h2>Forgot Password</h2>
        {message ? (
          <div className="success">{message}</div>
        ) : (
          <p className="instruction-text">Please give your registered email to send a password reset link.</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
            {error && <div className="error">{error}</div>}
          </div>
          <button type="submit">Send Recovery Email</button>
        </form>
        <div className="footer">
          <span>Remembered your password? </span>
          <span 
            className="footer-link" 
            onClick={() => router.push("/signin")}
          >
            Sign in
          </span>
        </div>
      </div>

      <style jsx>{`
        .forgot-password-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .logo-container {
          position: absolute;
          top: 20px;
          left: 20px;
          cursor: pointer;
        }

        .form-container {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 480px;
          text-align: center;
          position: relative;
        }

        .close-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          color: #808080;
          border-radius: 50%;
          padding: 4px;
          transition: background-color 0.3s ease, transform 0.5s ease;
        }

        .close-icon:hover {
          background-color: #66aaff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          color: #fff
        }

        .close-icon.rotate {
          transform: rotate(180deg);
        }

        h2 {
          margin-bottom: 10px;
          font-size : 20px;
          color: #333;
          font-weight: bold;
        }

        .instruction-text {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
          text-align: left;
        }

        .input-group {
          margin-bottom: 20px;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        button:hover {
          background-color: #0056b3;
        }

        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }

        .success {
          color: green;
          font-size: 12px;
          margin-bottom: 10px;
          text-align: left;
        }

        .footer {
          margin-top: 20px;
          text-align: center;
        }

        .footer-link {
          color: #007bff;
          text-decoration: underline;
          cursor: pointer;
        }

        .footer-link:hover {
          text-decoration: none;
          color: #0056b3;
        }

        @media (max-width: 480px) {
          .form-container {
            padding: 30px;
            max-width: 90%;
          }

          .logo-container {
            position: absolute;
            top: 5px;
            left: 33%;
            cursor: pointer;
          }
                
          .instruction-text {
            font-size: 13px;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;