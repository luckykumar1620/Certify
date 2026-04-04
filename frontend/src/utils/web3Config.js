import Web3 from "web3";
import InstitutionRegistryABI from "./InstitutionRegistry.json";

const CONTRACT_ADDRESS = "0x02cd73e11c17eE43D988239645Bdd5433D3817F9"; // Deployed on development network
const EXPECTED_CHAIN_ID = "1337"; // Ganache development network (or your local chain ID)
const CONTRACT_ABI = InstitutionRegistryABI;

let web3 = null;
let contract = null;

export const initWeb3 = async () => {
  if (contract && web3) {
    return web3; // Already initialized
  }

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Check network
      const chainId = await web3.eth.getChainId();
      if (chainId.toString() !== EXPECTED_CHAIN_ID) {
        throw new Error(
          `Wrong network. Please connect to Ganache (Chain ID: ${EXPECTED_CHAIN_ID}). Current: ${chainId}`
        );
      }

      contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      return web3;
    } catch (error) {
      web3 = null;
      contract = null;
      throw new Error(error.message || "Failed to initialize Web3");
    }
  } else {
    throw new Error("MetaMask not installed");
  }
};

export const getContract = () => {
  if (!contract) {
    throw new Error("Web3 not initialized. Call initWeb3 first.");
  }
  return contract;
};

export const getWeb3 = () => {
  if (!web3) {
    throw new Error("Web3 not initialized. Call initWeb3 first.");
  }
  return web3;
};

export const registerInstitution = async (institutionData) => {
  try {
    const contract = getContract();
    const web3Instance = getWeb3();
    const accounts = await web3Instance.eth.getAccounts();
    const from = accounts[0];

    // Validate Ethereum address format
    const institutionAddr = institutionData.institutionAddress.trim();
    if (!web3Instance.utils.isAddress(institutionAddr)) {
      throw new Error("Invalid institution address format. Must be a valid Ethereum address (0x...)");
    }

    // Checksum the address
    const checksummedAddress = web3Instance.utils.toChecksumAddress(institutionAddr);

    // Validate other fields
    if (!institutionData.name?.trim()) throw new Error("Institution name is required");
    if (!institutionData.email?.trim()) throw new Error("Email is required");
    if (!institutionData.accreditationId?.trim()) throw new Error("Accreditation ID is required");
    if (!institutionData.country?.trim()) throw new Error("Country is required");

    // Send transaction directly without estimateGas (Ganache handles this well)
    const tx = await contract.methods.registerInstitution(
      checksummedAddress,
      institutionData.name.trim(),
      institutionData.email.trim(),
      institutionData.accreditationId.trim(),
      institutionData.country.trim()
    ).send({ 
      from,
      gas: 3000000 // Fixed gas limit for local Ganache
    });

    return tx;
  } catch (error) {
    // Reset on critical errors
    if (error.message.includes("Wrong network") || error.message.includes("not installed")) {
      web3 = null;
      contract = null;
    }
    throw new Error(error.message);
  }
};

export const getAllInstitutions = async () => {
  try {
    const contract = getContract();
    const addresses = await contract.methods.getAllInstitutionAddresses().call();
    const institutions = [];

    for (let address of addresses) {
      const institution = await contract.methods.getInstitution(address).call();
      institutions.push({
        institutionAddress: institution.institutionAddress,
        name: institution.name,
        email: institution.email,
        accreditationId: institution.accreditationId,
        country: institution.country,
        registrationTimestamp: institution.registrationTimestamp,
        isActive: institution.isActive,
      });
    }

    return institutions;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getInstitution = async (address) => {
  try {
    const contract = getContract();
    const institution = await contract.methods.getInstitution(address).call();
    return institution;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const institutionExists = async (address) => {
  try {
    const contract = getContract();
    const exists = await contract.methods.institutionExists(address).call();
    return exists;
  } catch (error) {
    throw new Error(error.message);
  }
};
