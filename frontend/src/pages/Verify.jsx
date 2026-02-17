import React, { useState } from "react";

const Verify = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    // Dummy result for UI testing
    setResult({
      hasCertificates: true,
      count: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0b1120] text-white flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Verify Certificate
        </h2>

        <div>
          <label className="block mb-2 text-gray-300 font-medium">
            Student Wallet Address
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
          />
        </div>

        <button
          onClick={handleVerify}
          className="mt-6 w-full py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-green-400 to-cyan-400 hover:shadow-[0_0_25px_#22c55e] hover:scale-105 transition duration-300"
        >
          Verify Certificate
        </button>

        {/* Result Section */}
        {result && (
          <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/5">
            {result.hasCertificates ? (
              <div className="text-green-400 font-semibold">
                ✅ Certificates Found: {result.count}
              </div>
            ) : (
              <div className="text-red-400 font-semibold">
                ❌ No Certificates Found
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Verify;
