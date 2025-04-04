"use client";

import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LargeContentPage = () => {
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
          <h1>Welcome to Our AI Chat Application</h1>
          <p>
            We are dedicated to providing a seamless chat experience powered by
            artificial intelligence.
          </p>
          <Image
            src="https://via.placeholder.com/800x400"
            alt="AI Chat"
            className="main-image"
          />
        </div>
      </section>
      <section className="page" id="page2">
        <div className="content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to enhance communication through innovative AI
            solutions that cater to user needs.
          </p>
          <Image
            src="https://via.placeholder.com/800x400"
            alt="Mission"
            className="main-image"
          />
        </div>
      </section>
    </div>
  );
};

export default LargeContentPage;
