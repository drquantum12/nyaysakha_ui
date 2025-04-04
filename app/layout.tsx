"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/userContext";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/sidebar";
import { useState} from "react";
import { useRouter } from "next/navigation";
// import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Neurosattva",
//   description: "Neurosattva - Your AI Assistant",
//   icons: {
//     icon: "/favicon.png",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="container">
          <Header
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onLoginClick={() => router.push("/auth/signin")}
      />

      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {children}
          </div>
        </AuthProvider>
        <style jsx>{`
        .container {
          max-width: 600px;
          width: 90%;
          margin: 0 auto;
          padding: 20px;
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .chat-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 10px;
          overflow-y: auto;
          padding-bottom: 70px;
        }

        .chat-input-wrapper {
          position: fixed;
          left: 53%;
          transform: translateX(-50%);
          max-width: 800px;
          width: 90%;
          display: flex;
          justify-content: center;
          transition: top 0.3s ease, bottom 0.3s ease;
        }

        .chat-input-wrapper:not(.chat-visible) {
          top: 50%;
        }

        .chat-visible {
          bottom: 15px;
          top: auto;
        }

        .helper-text {
          position: fixed;
          bottom: 55%;
          left: 52%;
          width: 90%;
          transform: translateX(-50%);
          text-align: center;
          margin-bottom: 10px;
          font-size: 24px;
          color: #333;
          font-weight: bold;
          transition: opacity 0.3s ease;
        }

        .helper-text.hidden {
          opacity: 0;
          pointer-events: none;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .container {
            width: 95%;
            max-width: 100%;
          }
          .chat-input-wrapper {
            width: 95%;
            left: 50%;
          }
          .helper-text {
            font-size: 20px;
            left: 50%;
          }
        }
      `}</style>
      </body>
    </html>
  );
}
