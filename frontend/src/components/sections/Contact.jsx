import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative py-28 bg-[#020617] text-white overflow-hidden"
    >
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500/5 to-cyan-500/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="mt-6 text-gray-400 text-lg">
            Have questions or want to collaborate? Reach out to us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl">

          <form className="space-y-6">

            <div>
              <label className="block mb-2 text-gray-300">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-400 outline-none transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-green-400 to-cyan-400 hover:shadow-[0_0_25px_#22c55e] hover:scale-105 transition duration-300"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default Contact;
