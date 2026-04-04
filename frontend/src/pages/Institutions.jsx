import React, { useState, useEffect } from "react";
import { initWeb3, getAllInstitutions } from "../utils/web3Config";

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        setLoading(true);
        await initWeb3();
        const data = await getAllInstitutions();
        setInstitutions(data);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to fetch institutions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0b1120] text-white px-6 py-20">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Registered Institutions
        </h2>

        <p className="text-center text-gray-400 mb-12">
          View all registered institutions on our network
        </p>

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Loading institutions...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutions.map((institution, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 hover:border-green-400/50 hover:shadow-[0_0_20px_#22c55e/30] transition duration-300 transform hover:scale-105"
                >
                  {/* Institution Name */}
                  <h3 className="text-xl font-bold mb-4 text-green-400">
                    {institution.name}
                  </h3>

                  {/* Email */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-white font-medium truncate">
                      {institution.email}
                    </p>
                  </div>

                  {/* Country */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Country
                    </p>
                    <p className="text-white font-medium flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></span>
                      {institution.country}
                    </p>
                  </div>

                  {/* Accreditation ID */}
                  {/* (Removed Accreditation ID and Address per requirements) */}
                </div>
              ))}
            </div>

            {institutions.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                  No institutions registered yet.
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Institutions;
