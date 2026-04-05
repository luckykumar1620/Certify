import Web3 from "web3";
import InstitutionRegistryABI from "./InstitutionRegistry.json";
import CertificateRegistryABI from "./CertificateRegistry.json";

const CONTRACT_ADDRESS = "0x35c3864eE8f7cf2469dECe89Ce209501bCC36578"; // Deployed on development network
const EXPECTED_CHAIN_ID = "1337"; // Ganache development network (or your local chain ID)
const CONTRACT_ABI = InstitutionRegistryABI;
const CERT_CONTRACT_ABI = CertificateRegistryABI.abi || CertificateRegistryABI;

let web3 = null;
let contract = null;
let certContract = null;

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
      // Try to create certificate contract if address is provided in file (set below)
      try {
        const CERT_CONTRACT_ADDRESS = "0xDEe4C296C625a5398e661F203EA4c53bF191CBC8"; // Deployed CertificateRegistry address
        if (CERT_CONTRACT_ADDRESS && web3.utils.isAddress(CERT_CONTRACT_ADDRESS)) {
          certContract = new web3.eth.Contract(CERT_CONTRACT_ABI, CERT_CONTRACT_ADDRESS);
        }
      } catch (e) {
        // ignore
      }
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

export const getCertificateContract = () => {
  if (!certContract) {
    throw new Error("Certificate contract not initialized. Set CERT_CONTRACT_ADDRESS in web3Config or deploy the contract and update the config.");
  }
  return certContract;
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

export const issueCertificateOnChain = async (certificateData) => {
  try {
    const contract = getCertificateContract();
    const web3Instance = getWeb3();
    const accounts = await web3Instance.eth.getAccounts();
    const from = accounts[0];

    const tx = await contract.methods.issueCertificate(
      certificateData.certificateId,
      certificateData.studentAddress,
      certificateData.studentName,
      certificateData.studentId,
      certificateData.courseProgram,
      certificateData.grade
    ).send({ from, gas: 3000000 });

    return tx;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

export const getCertificateOnChain = async (certificateId) => {
  try {
    const contract = getCertificateContract();
    const cert = await contract.methods.getCertificate(certificateId).call();
    return {
      issuer: cert.issuer,
      studentAddress: cert.studentAddress,
      studentName: cert.studentName,
      studentId: cert.studentId,
      course: cert.course,
      grade: cert.grade,
      issuedOn: cert.issuedOn,
    };
  } catch (error) {
    throw new Error(error.message || error);
  }
};

export const isStudentIdUsedOnChain = async (studentId) => {
  try {
    const contract = getCertificateContract();
    const used = await contract.methods.isStudentIdUsed(studentId).call();
    return used;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

export const getStudentIdForAddress = async (studentAddress) => {
  try {
    const contract = getCertificateContract();
    const id = await contract.methods.getStudentIdByAddress(studentAddress).call();
    return id;
  } catch (error) {
    throw new Error(error.message || error);
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
