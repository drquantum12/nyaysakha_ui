"use client";

import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from "next/navigation";
import Logo from '@/assets/images/logo.png';
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
      console.error('Error sending recovery email:', err);
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
    </div>
  );
};

export default ForgotPassword;