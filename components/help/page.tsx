"use client";

import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HelpPage = () => {
  const router = useRouter();

  return (
    <div className="scroll-container">
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
      <section className="page" id="page1">
        <div className="content">
          <h1>Help</h1>
          <p>
            If you have any questions, please refer to the following resources:
          </p>
          <ul>
            <li>
              <a href="/faq">Frequently Asked Questions</a>
            </li>
            <li>
              <a href="/contact">Contact Support</a>
            </li>
            <li>
              <a href="/tutorials">User Tutorials</a>
            </li>
          </ul>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Help Resources"
            className="main-image"
          />
        </div>
      </section>
      <section className="page" id="page2">
        <div className="content">
          <h2>Stay Updated!</h2>
          <p>
            Subscribe to our newsletter to receive the latest updates and tips.
          </p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Subscribe"
            className="main-image"
          />
        </div>
      </section>
      <style jsx>{`
        .scroll-container {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
        }
        .logo-container {
          position: absolute;
          top: 20px;
          left: 20px;
          cursor: pointer;
        }
        .page {
          scroll-snap-align: start;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
          padding: 20px;
          transition: background-color 0.3s;
        }
        .content {
          text-align: center;
          max-width: 800px;
        }
        .main-image {
          width: 100%;
          height: auto;
          border-radius: 10px;
          margin-top: 20px;
          animation: fadeIn 1s ease-in;
        }
        h1,
        h2 {
          color: #333;
        }
        p {
          color: #666;
          font-size: 1.2em;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin: 5px 0;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .subscribe-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        .subscribe-form input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
          width: 80%;
          max-width: 300px;
        }
        .subscribe-form button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .subscribe-form button:hover {
          background-color: #0056b3;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HelpPage;
