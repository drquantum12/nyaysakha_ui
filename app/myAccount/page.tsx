"use client";

import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyAccountPage = () => {
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
          <h1>My Account</h1>
          <div className="account-info">
            <p>
              <strong>Username:</strong> user123
            </p>
            <p>
              <strong>Email:</strong> user@example.com
            </p>
            <p>
              <strong>Account Created:</strong> January 1, 2023
            </p>
          </div>
          <button className="edit-btn">Edit Profile</button>
        </div>
      </section>
      <section className="page" id="page2">
        <div className="content">
          <h2>Account Settings</h2>
          <p>Manage your account settings and preferences:</p>
          <div className="setting-item">
            <Image
              src="https://via.placeholder.com/50"
              alt="Profile Icon"
              className="icon"
            />
            <div>
              <h3>Profile Information</h3>
              <p>Update your personal information and profile picture.</p>
            </div>
          </div>
          <div className="setting-item">
            <Image
              src="https://via.placeholder.com/50"
              alt="Security Icon"
              className="icon"
            />
            <div>
              <h3>Security Settings</h3>
              <p>Change your password and enable two-factor authentication.</p>
            </div>
          </div>
          <div className="setting-item">
            <Image
              src="https://via.placeholder.com/50"
              alt="Notification Icon"
              className="icon"
            />
            <div>
              <h3>Notification Preferences</h3>
              <p>
                Customize your notification settings for a better experience.
              </p>
            </div>
          </div>
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
        h1,
        h2 {
          color: #333;
        }
        p {
          color: #666;
          font-size: 1.2em;
        }
        .account-info {
          margin-top: 10px;
          animation: fadeIn 0.5s ease-in;
        }
        .edit-btn {
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .edit-btn:hover {
          background-color: #0056b3;
        }
        .setting-item {
          display: flex;
          align-items: center;
          margin: 15px 0;
          animation: fadeIn 0.5s ease-in;
        }
        .icon {
          margin-right: 10px;
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

export default MyAccountPage;
