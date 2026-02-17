import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 min-h-screen flex items-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0b1120] text-white overflow-hidden">

      {/* Floating Glow Background */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-cyan-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            Blockchain-Enabled  
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Tamper-Proof
            </span>
            <br />
            Certificate System
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-xl">
            Issue, manage, and verify digital certificates securely using Ethereum smart contracts and decentralized IPFS storage.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link to="/issue" className="px-8 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-green-400 to-cyan-400 hover:shadow-[0_0_30px_#22c55e] hover:scale-105 transition duration-300 inline-block text-center">
              Issue Certificate
            </Link>

            <Link to="/verify" className="px-8 py-3 rounded-lg border border-green-400 font-semibold hover:bg-green-400 hover:text-black transition duration-300 inline-block text-center">
              Verify Certificate
            </Link>

            <Link to="/register" className="px-8 py-3 rounded-lg border border-green-400 font-semibold hover:bg-green-400 hover:text-black transition duration-300 inline-block text-center">
              Register Institution
            </Link>

          </div>
        </div>

        {/* RIGHT SIDE LIVE CERTIFICATE PREVIEW */}
        <div className="hidden md:block">

          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto hover:scale-105 transition duration-500">

            {/* Certificate Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-cyan-400">
                Digital Certificate
              </h3>
              <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                ✔ Verified
              </span>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 text-sm">

              <div>
                <p className="text-gray-400">Issued To</p>
                <p className="text-white font-semibold">Lucky Kumar</p>
              </div>

              <div>
                <p className="text-gray-400">Course</p>
                <p className="text-white font-semibold">Blockchain Development</p>
              </div>

              <div>
                <p className="text-gray-400">Certificate ID</p>
                <p className="text-cyan-400 font-mono text-xs break-all">
                  0xA7F3B29C98E3D1F45AB67C90123DEF456789ABCD
                </p>
              </div>

              <div>
                <p className="text-gray-400">Stored On</p>
                <p className="text-white">Ethereum Network + IPFS</p>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 text-right">
              <button className="text-cyan-400 text-sm hover:underline">
                View on Blockchain →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
