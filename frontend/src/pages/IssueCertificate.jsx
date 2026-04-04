import React, { useState } from "react";

const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseProgram: "",
    grade: "",
    studentAddress: "",
    institutionWalletAddress: "",
    certificateFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0b1120] text-white flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Issue Certificate
        </h2>

        <form className="grid md:grid-cols-2 gap-6">

          {/* Student Name */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Student ID
            </label>
            <input
              type="text"
              name="studentId"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Course / Program
            </label>
            <input
              type="text"
              name="courseProgram"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Grade
            </label>
            <input
              type="text"
              name="grade"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          {/* Student Wallet Address */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-gray-300 font-medium">
              Student Wallet Address
            </label>
            <input
              type="text"
              name="studentAddress"
              placeholder="0x..."
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          {/* Institution Wallet Address */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-gray-300 font-medium">
              Institution Wallet Address
            </label>
            <input
              type="text"
              name="institutionWalletAddress"
              placeholder="0x..."
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none transition text-white"
            />
          </div>

          {/* Certificate File */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-gray-300 font-medium">
              Certificate File 
            </label>
            <input
              type="file"
              name="certificateFile"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full text-gray-400 file:bg-green-400 file:text-black file:px-4 file:py-2 file:rounded-lg file:border-0 file:cursor-pointer hover:file:bg-green-500"
            />
            <p className="text-xs text-gray-500 mt-2">
              Upload PDF or image file. If not provided, certificate data will be stored as JSON.
            </p>
          </div>

        </form>

        <button className="mt-8 w-full py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-green-400 to-cyan-400 hover:shadow-[0_0_25px_#22c55e] hover:scale-105 transition duration-300">
          Issue Certificate
        </button>

      </div>
    </div>
  );
};

export default IssueCertificate;
