import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Web3 from "web3";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConnectWallet = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Check if ethereum is available (MetaMask or other wallet)
      if (typeof window.ethereum === "undefined") {
        setError("Please install MetaMask or another Ethereum wallet");
        setIsLoading(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        setWalletAddress(account);
        setIsConnected(true);

        // Initialize Web3 with the provider
        const web3 = new Web3(window.ethereum);

        // Store wallet address in localStorage for persistence
        localStorage.setItem("walletAddress", account);

        // Listen for account changes
        window.ethereum.on("accountsChanged", (newAccounts) => {
          if (newAccounts.length > 0) {
            setWalletAddress(newAccounts[0]);
            localStorage.setItem("walletAddress", newAccounts[0]);
          } else {
            setIsConnected(false);
            setWalletAddress("");
            localStorage.removeItem("walletAddress");
          }
        });

        // Listen for chain (network) changes
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      }
    } catch (err) {
      if (err.code === 4001) {
        setError("Wallet connection was rejected");
      } else {
        setError("Failed to connect wallet. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    localStorage.removeItem("walletAddress");
  };

  // Check if wallet was previously connected
  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress && typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0 && accounts[0] === storedAddress) {
            setWalletAddress(storedAddress);
            setIsConnected(true);
          }
        })
        .catch(() => {
          localStorage.removeItem("walletAddress");
        });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-[#0b1120]/90 backdrop-blur-md shadow-xl border-b border-slate-800"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">


        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent tracking-wide cursor-pointer">
          CertiFy
        </div>


        <div className="hidden md:flex space-x-8 font-medium text-gray-300">

          <button
            onClick={() => handleScrollToSection("home")}
            className="hover:text-green-400 transition duration-300"
          >
            Home
          </button>

          <button
            onClick={() => handleScrollToSection("features")}
            className="hover:text-green-400 transition duration-300"
          >
            Features
          </button>

          <button
            onClick={() => handleScrollToSection("about")}
            className="hover:text-green-400 transition duration-300"
          >
            About
          </button>

          <button
            onClick={() => handleScrollToSection("contact")}
            className="hover:text-green-400 transition duration-300"
          >
            Contact
          </button>

          <Link
            to="/institutions"
            className="hover:text-green-400 transition duration-300"
          >
            Institutions
          </Link>

        </div>



        <div className="relative">
          <button
            onClick={isConnected ? handleDisconnectWallet : handleConnectWallet}
            disabled={isLoading}
            className={`relative px-6 py-2 rounded-lg font-semibold transition duration-300 ${
              isConnected
                ? "text-black bg-gradient-to-r from-blue-400 to-purple-400 hover:shadow-[0_0_25px_#3b82f6] hover:scale-105"
                : "text-black bg-gradient-to-r from-green-400 to-cyan-400 hover:shadow-[0_0_25px_#22c55e] hover:scale-105"
            } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Connecting...
              </span>
            ) : isConnected ? (
              `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
            ) : (
              "Connect Wallet"
            )}
          </button>

          {error && (
            <div className="absolute top-full mt-2 right-0 bg-red-500 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-10">
              {error}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
