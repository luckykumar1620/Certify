import React, { useState } from "react";

const Institutions = () => {
  // Dummy Data (backend connect karne tak)
  const [institution] = useState({
    name: "ABC University",
    email: "contact@abcuniversity.edu",
    accreditationId: "ACC-2024-XYZ",
    country: "India",
    address: "0xA7F3B29C98E3D1F45AB67C90123DEF456789ABCD",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0b1120] text-white flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Registered Institution
        </h2>

        <div className="space-y-6">

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-gray-400">Institution Name</p>
            <p className="text-white font-semibold">{institution.name}</p>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-gray-400">Email</p>
            <p className="text-white font-semibold">{institution.email}</p>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-gray-400">Accreditation ID</p>
            <p className="text-white font-semibold">{institution.accreditationId}</p>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-gray-400">Country</p>
            <p className="text-white font-semibold">{institution.country}</p>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-gray-400">Ethereum Address</p>
            <p className="text-cyan-400 font-mono break-all text-sm">
              {institution.address}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Institutions;
