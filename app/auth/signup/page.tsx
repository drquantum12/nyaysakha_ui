"use client";

import { useState } from 'react';
import { AiOutlineClose, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, getFirebaseToken } from '@/lib/firebase';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!userName || !email || !password) {
      setError('All fields are required.');
      return;
    }
    try{
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("userCredential", userCredential);
      console.log({
        "username" : userName,
        "email" : userCredential.user.email
      })
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/`,{
        method : "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uid": userCredential.user.uid,
          "username" : userName,
          "email" : userCredential.user.email
        })
      });

      if(response.ok){
        const data = await response.json();
        console.log("sign with email", data)
      }
      setMessage('User created successfully!');
      router.push('/');
    }
    catch(error) {
      setError('Failed to create an account. Please try again.');
    }

    
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(async () => {
          const token = await getFirebaseToken();
          if(token){
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-signin/`,{
              method : "GET",
              headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            if(response.ok){
              const data = await response.json();
              console.log("sign with google", data)
              router.push('/');
            }
            else{
              setError('Failed to sign in with Google. Please try again.');
            }

          }
        });
    } catch (error) {
      console.error("Google sign-in error", error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      {/* <div className="logo-container" onClick={() => router.push("/")}> 
        <Image 
            src={Logo}
            alt="Legal Insight Logo" 
            className="logo" 
            width={150}
            height={50}
          />
          <span></span>
      </div> */}
      <div className="form-container">
        <span
          className={`close-icon ${isHovered ? 'rotate' : ''}`} 
          onClick={() => router.push("/")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AiOutlineClose size={20} title=''/>
        </span>
       <form onSubmit={handleSubmit}>
          <div className="input-group">
          <label>User Name *</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Enter your user name"
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
          {error && <div className="error">{error}</div>}
          {message && <div className="success">{message}</div>}
          <button className='sign-up-btn' type="submit">Sign Up</button>
        </form>
        <div className="footer">
          <span>Already have an account? </span>
          <span 
            className="footer-link" 
            onClick={() => router.push("/auth/signin")}
          >
            Sign in
          </span>
        </div>

        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">or</span>
          <span className="divider-line"></span>
        </div>

         <button className="google-button" onClick={handleGoogleSignIn}>
                  <FcGoogle size={20} style={{ marginRight: '8px' }} />
                  <span>Continue with Google</span>
                </button>
      </div>
    </div>
  );
};

export default Signup;