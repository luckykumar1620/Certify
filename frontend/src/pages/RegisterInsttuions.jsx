import React, { useState } from "react";
import { initWeb3, registerInstitution } from "../utils/web3Config";

const RegisterInstitution = () => {
  const [formData, setFormData] = useState({
    institutionAddress: "",
    name: "",
    email: "",
    accreditationId: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await initWeb3();
      await registerInstitution(formData);
      setMessageType("success");
      setMessage("Institution registered successfully!");
      setFormData({
        institutionAddress: "",
        name: "",
        email: "",
        accreditationId: "",
        country: "",
      });
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Failed to register institution");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0b1120] text-white flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Register Institution
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {message && (
            <div
              className={`p-4 rounded-lg ${
                messageType === "success"
                  ? "bg-green-500/20 border border-green-500 text-green-300"
                  : "bg-red-500/20 border border-red-500 text-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Institution Ethereum Address
            </label>
            <input
              type="text"
              name="institutionAddress"
              value={formData.institutionAddress}
              placeholder="0x..."
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Institution Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Accreditation ID
            </label>
            <input
              type="text"
              name="accreditationId"
              value={formData.accreditationId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Location
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-green-400 to-cyan-400 hover:shadow-[0_0_25px_#22c55e] hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register Institution"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterInstitution;
