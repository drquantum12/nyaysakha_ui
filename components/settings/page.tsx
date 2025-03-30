"use client";

import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
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
          <h1>Settings</h1>
          <p>Customize your experience by adjusting the settings below:</p>
          <div className="setting-item">
            <label htmlFor="theme">Theme:</label>
            <select id="theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="setting-item">
            <label htmlFor="notifications">Notifications:</label>
            <input type="checkbox" id="notifications" />
          </div>
          <div className="setting-item">
            <label htmlFor="language">Language:</label>
            <select id="language">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="setting-item">
            <label htmlFor="privacy">Privacy Settings:</label>
            <select id="privacy">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button className="save-btn">Save Changes</button>
        </div>
      </section>
      <section className="page" id="page2">
        <div className="content">
          <h2>Advanced Settings</h2>
          <p>Explore additional settings to enhance your experience:</p>
          <div className="advanced-setting-item">
            <Image
              src="https://via.placeholder.com/50"
              alt="Icon"
              className="icon"
            />
            <div>
              <h3>Data Usage</h3>
              <p>Manage your data usage preferences.</p>
            </div>
          </div>
          <div className="advanced-setting-item">
            <Image
              src="https://via.placeholder.com/50"
              alt="Icon"
              className="icon"
            />
            <div>
              <h3>Account Security</h3>
              <p>Enable two-factor authentication for added security.</p>
            </div>
          </div>
          <div className="advanced-setting-item">
            <Image
              src="https://via.placeholder.com/50"
              alt="Icon"
              className="icon"
            />
            <div>
              <h3>App Preferences</h3>
              <p>Customize your app preferences for a better experience.</p>
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
        .setting-item {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        label {
          margin-right: 10px;
        }
        .save-btn {
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .save-btn:hover {
          background-color: #0056b3;
        }
        .advanced-setting-item {
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

export default SettingsPage;
