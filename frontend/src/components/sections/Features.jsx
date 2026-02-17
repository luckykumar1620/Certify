import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Features = () => {
  return (
    <section 
      id="features"
      className="py-24 bg-gradient-to-b from-[#020617] to-[#0f172a] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 text-center">

        {/* Typing Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          <Typewriter
            words={["Why Choose CertiFy?"]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div className="float-card bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl transition duration-500 hover:rotate-1 hover:scale-105 hover:border-cyan-400/40">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">
              Tamper-Proof Storage
            </h3>
            <p className="text-gray-300">
              Certificates are stored using cryptographic hashing on blockchain ensuring complete immutability and fraud prevention.
            </p>
          </div>

          {/* Card 2 */}
          <div className="float-card bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl transition duration-500 hover:-rotate-1 hover:scale-105 hover:border-cyan-400/40">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">
              Instant Verification
            </h3>
            <p className="text-gray-300">
              Employers and institutions can verify certificate authenticity instantly without manual intervention.
            </p>
          </div>

          {/* Card 3 */}
          <div className="float-card bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl transition duration-500 hover:rotate-2 hover:scale-105 hover:border-cyan-400/40">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">
              Decentralized Security
            </h3>
            <p className="text-gray-300">
              Eliminates single points of failure by leveraging Ethereum smart contracts and distributed storage.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;
