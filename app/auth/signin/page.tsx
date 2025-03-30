"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose, AiOutlineMail, AiFillLock } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useUser } from '@/context/userContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const {refreshUser} = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required.');
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else if (!password) {
      setPasswordError('Password is required.');
      return;
    }
    try{
      const response = await fetch(`${process.env.API_URL}/auth/login/`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setEmailError(errorData.message || 'Failed to sign in. Please try again.');
        return;
      }
      const data = await response.json();
      console.log(data.msg);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user_id', data.user_id);
      refreshUser();
      router.push("/");
    } catch (error) {
      console.error('Error during sign-in:', error);
      setEmailError('An error occurred. Please try again.');
      setPasswordError('');
    }
  };

  const handleGoogleSignIn = () => {
    alert('Google sign-in not added.');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <span
          className={`close-icon ${isHovered ? 'rotate' : ''}`} 
          onClick={() => router.push("/")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AiOutlineClose size={20} title=''/>
        </span>
        <div className="logo-container" onClick={() => router.push("/")}>
          <Image 
            src={Logo}
            alt="Legal Insight Logo" 
            className="logo" 
            width={150}
            height={50}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-wrapper">
              <AiOutlineMail color='#808080' className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="input-container">
            <div className="input-wrapper password-container">
              <AiFillLock color='#808080' className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
              </span>
            </div>
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          <div className="footer">
            <a onClick={() => router.push("/forgotPassword")} className="footer-link">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="signup-text">
          <span>Don't have an account? </span>
          <span 
            className="footer-link signup-link" 
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </div>
        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">or</span>
          <span className="divider-line"></span>
        </div>

        <button className="google-button" onClick={handleGoogleSignIn}>
          <FcGoogle size={20} style={{ marginRight: '8px' }} />
          <span>Log in with Google</span>
        </button>
      </div>

      <style jsx>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .login-container {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
          color: #fff;
        }

        .close-icon.rotate {
          transform: rotate(180deg);
        }

        .logo-container {
          margin: 10px 0 20px 0;
          display: inline-block;
          cursor: pointer;
        }

        .logo {
          display: block;
          transition: transform 0.3s;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .input-container {
          margin: 10px 0;
          text-align: left;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 3px 10px;
        }

        .input-icon {
          color: #ccc;
        }

        .login-container input {
          width: 100%;
          border: none;
          outline: none;
          padding: 10px;
        }

        .error-message {
          color: red;
          font-size: 14px;
          margin-top: 5px;
        }

        .password-container {
          position: relative;
        }

        .eye-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #bdbdbd;
        }

        .login-button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }

        .login-button:hover {
          background-color: #0056b3;
        }

        .footer {
          margin-top: 10px;
          text-align: left;
        }

        .footer-link {
          color: #007bff;
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
        }

        .signup-link {
          text-decoration: underline;
        }

        .footer-link:hover {
          text-decoration: none;
          color: #0056b3;
        }

        .signup-text {
          margin-top: 15px;
          text-align: center;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 10px 0 15px 0px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background-color: #ccc;
        }

        .divider-text {
          margin: 0 10px;
          color: #808080;
        }

        .google-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 10px;
          color: #808080;
          border: 1px solid #ccc;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s, color 0.3s;
        }

        .google-button:hover {
          background-color: #f8f8f8;
          color: #007bff;
        }

        /* Responsive styles */
        @media (max-width: 480px) {
          .login-container {
            padding: 15px;
            max-width: 90%;
          }

          .login-container input {
            padding: 8px;
          }

          .login-button {
            padding: 10px;
          }

          .error-message {
            color: red;
            font-size: 12px;
            margin-top: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default Signin;