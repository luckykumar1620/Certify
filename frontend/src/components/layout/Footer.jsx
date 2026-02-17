import React from 'react'

const Footer = () => {
   return (
    <footer className="bg-slate-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-white text-2xl font-bold">
            CertiFy
          </h2>
          <p className="mt-4 text-sm">
            Blockchain-powered certificate issuance and verification platform for academic and professional credentials.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Issue Certificate</li>
            <li>Verify Certificate</li>
            <li>Institutions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>
          <p className="text-sm">
           Email: luckykr1620@email.com
          </p>
          <p>
            Phone:+919065728764
          </p>
        </div>

      </div>

      <div className="text-center mt-10 text-xs text-gray-600">
        © 2026 CertiFy. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
