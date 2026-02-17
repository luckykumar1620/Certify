import React from "react";
import { Typewriter } from "react-simple-typewriter";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-28 bg-gradient-to-b from-[#0f172a] to-[#020617] text-white overflow-hidden"
    >
      {/* Background Glow */}
      {/* <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500 opacity-10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500 opacity-10 blur-3xl rounded-full animate-pulse"></div> */}

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Animated Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            <Typewriter
              words={["About CertiChain"]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
            />
          </h2>

          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
            CertiChain is a blockchain-enabled certificate issuance and verification
            platform designed to eliminate fraud, ensure transparency, and enable
            instant global authentication of academic and professional credentials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left Side Content with Fade-in */}
          <div className="transition duration-700 hover:translate-x-2">
            <h3 className="text-3xl font-semibold mb-6">
              Why We Built This Platform
            </h3>

            <p className="text-gray-300 leading-relaxed mb-6">
              Traditional certificate systems suffer from forgery, delayed verification,
              centralized vulnerabilities, and lack of global accessibility. CertiChain
              leverages Ethereum smart contracts and decentralized IPFS storage to
              provide a tamper-proof and scalable solution.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Our goal is to redefine credential management by making verification
              instant, secure, and universally accessible.
            </p>
          </div>

          {/* Right Side Glass Card with Floating Animation */}
          <div className="float-card bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl transition duration-500 hover:scale-105 hover:border-cyan-400/40">

            <h4 className="text-2xl font-semibold text-green-400 mb-6">
              Core Technologies
            </h4>

            <ul className="space-y-4 text-gray-300">
              <li>• Ethereum Smart Contracts</li>
              <li>• IPFS Decentralized Storage</li>
              <li>• React + Vite Frontend</li>
              <li>• Web3 Integration</li>
              <li>• Tamper-Proof Cryptographic Hashing</li>
            </ul>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
