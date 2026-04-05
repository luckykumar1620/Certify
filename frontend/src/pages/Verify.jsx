import React, { useState } from "react";
import { initWeb3, getCertificateOnChain } from "../utils/web3Config";

const Verify = () => {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    setResult(null);
    if (!certificateId.trim()) {
      setError("Please enter a certificate ID");
      return;
    }
    try {
      await initWeb3();
      const cert = await getCertificateOnChain(certificateId.trim());
      setResult(cert);
    } catch (err) {
      const msg = err.message || String(err);
      if (msg.toLowerCase().includes("not found")) {
        setError("Certificate not found");
      } else {
        setError(msg);
      }
      console.error("Verify error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0f172a] to-[#0b1120] text-white flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold text-center mb-8 bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Verify Certificate
        </h2>


        <div>
          <label className="block mb-2 text-gray-300 font-medium">Certificate ID</label>
          <input
            type="text"
            placeholder="e.g. STUD123-1650000000000"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
          />
        </div>

        <button onClick={handleVerify} className="mt-6 w-full py-3 rounded-lg font-semibold text-black bg-linear-to-r from-green-400 to-cyan-400 hover:shadow-[0_0_25px_#22c55e] hover:scale-105 transition duration-300">
          Verify Certificate
        </button>

        {/* Result Section */}
        {error && (
          <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/5 text-red-400 font-semibold">{error}</div>
        )}

        {result && (
          <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5 shadow-lg">
            <h3 className="text-xl font-bold text-green-400 mb-4">Certificate Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Certificate ID</p>
                <p className="text-white font-medium">{certificateId}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Issuer</p>
                <p className="text-white font-medium wrap-break-word">{result.issuer}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Student Wallet</p>
                <p className="text-white font-medium wrap-break-word">{result.studentAddress}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Student Name</p>
                <p className="text-white font-medium">{result.studentName}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Student ID</p>
                <p className="text-white font-medium">{result.studentId}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Course</p>
                <p className="text-white font-medium">{result.course}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Grade</p>
                <p className="text-white font-medium">{result.grade}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Issued On</p>
                <p className="text-white font-medium">{new Date(Number(result.issuedOn) * 1000).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Verify;
