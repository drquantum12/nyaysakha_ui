"use client";

import { useState } from 'react';
import { AiOutlineClose, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from "next/navigation";
import Logo from '@/assets/images/logo.png';
import Image from 'next/image';
import TermsAndConditions from '@/components/TermsAndConditions';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setPhone('');

    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (!isAgreed) {
      alert('You must agree to the Terms & Conditions to sign up.');
      return;
    }

    try {
      const response = await fetch(`${process.env.API_URL}/auth/signup/?token=jessica`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
        headers: { 
          'Content-Type': 'application/json',
          'x-token' : 'fake-super-secret-token'
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to sign up. Please try again.');
        return;
      }
      const data = await response.json();
      setMessage(data.msg);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user_id', data.user_id);
      router.push("/");
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="signup-page">
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
          className={`close-icon ${isHovered ? 'rotate' : ''}`} 
          onClick={() => router.push("/")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AiOutlineClose size={20} title=''/>
        </span>
        <h4>Please give the below details for sign up and use all Legal Insight services.</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
          <label>First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className="input-group">
            <label>Last Name *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div className="input-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password *</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
              </span>
            </div>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
            />
            <span>
              By signing up, I agree to the <span className="terms-link" onClick={handleOpenModal}>Terms & Conditions</span> of Legal Insight.
            </span>
          </div>
          {error && <div className="error">{error}</div>}
          {message && <div className="success">{message}</div>}
          <button type="submit">Sign Up</button>
        </form>
        <div className="footer">
          <span>Already have an account? </span>
          <span 
            className="footer-link" 
            onClick={() => router.push("/signin")}
          >
            Sign in
          </span>
        </div>
      </div>

      <TermsAndConditions isOpen={isModalOpen} onClose={handleCloseModal} />
  
      <style jsx>{`
        .signup-page {
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
          // text-align: center;
          position: relative;
        }

        .form-container h4 {
          font-size: 14px;
          margin: 20 0 10px 0;
        }

        .terms-link {
          color: #007bff;
          text-decoration: underline;
          cursor: pointer;
        }
        
        .terms-link:hover {
          text-decoration : none;
          color: #0056b3;
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
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .input-group {
          margin: 20px 0px 20px 0px;
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

        .checkbox-container {
          display: flex;
          align-items: center;
          font-size: 12px;
          text-align: left;
          margin: 20px 0px 20px 0px;
        }

        .checkbox-container input {
          margin-right: 10px;
          cursor: pointer;
          width: 5%;
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
          margin-top: 5px;
        }

        .footer {
          margin-top: 14px;
          text-align: center;
        }

        .footer-link {
          color: #007bff;
          text-decoration: underline;
          cursor: pointer;
        }

        .footer-link:hover {
          text-decoration : none;
          color: #0056b3;
        }

        @media (max-width: 480px) {
          .form-container {
            padding: 20px;
            max-width: 90%;
          }

          .logo-container {
            position: absolute;
            top: 5px;
            left: 33%;
            cursor: pointer;
          }

          .form-container h4 {
            font-size: 12px;
          }

          .checkbox-container {
            margin: 10px 0px 10px 0px;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;