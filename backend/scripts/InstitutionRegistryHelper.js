const Web3 = require('web3');
const InstitutionRegistry = require('../build/contracts/InstitutionRegistry.json');

class InstitutionRegistryHelper {
  constructor(providerUrl = 'http://localhost:8545') {
    this.web3 = new Web3(providerUrl);
    this.contractABI = InstitutionRegistry.abi;
    this.contract = null;
  }

  // Initialize contract with address
  async initializeContract(contractAddress) {
    this.contract = new this.web3.eth.Contract(this.contractABI, contractAddress);
    return this.contract;
  }

  // Register institution
  async registerInstitution(
    fromAddress,
    institutionAddress,
    name,
    email,
    accreditationId,
    country,
    privateKey = null
  ) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      const data = this.contract.methods.registerInstitution(
        institutionAddress,
        name,
        email,
        accreditationId,
        country
      ).encodeABI();

      if (privateKey) {
        // Sign and send transaction
        const gasEstimate = await this.contract.methods.registerInstitution(
          institutionAddress,
          name,
          email,
          accreditationId,
          country
        ).estimateGas({ from: fromAddress });

        const tx = {
          to: this.contract.options.address,
          data: data,
          gas: gasEstimate,
          from: fromAddress
        };

        const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
      } else {
        // Regular transaction send
        return await this.contract.methods.registerInstitution(
          institutionAddress,
          name,
          email,
          accreditationId,
          country
        ).send({ from: fromAddress });
      }
    } catch (error) {
      console.error('Error registering institution:', error.message);
      throw error;
    }
  }

  // Get institution details
  async getInstitution(institutionAddress) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      const institution = await this.contract.methods.getInstitution(institutionAddress).call();
      return {
        address: institution.institutionAddress,
        name: institution.name,
        email: institution.email,
        accreditationId: institution.accreditationId,
        country: institution.country,
        registrationTimestamp: new Date(institution.registrationTimestamp * 1000),
        isActive: institution.isActive
      };
    } catch (error) {
      console.error('Error getting institution:', error.message);
      throw error;
    }
  }

  // Check if institution exists
  async institutionExists(institutionAddress) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      return await this.contract.methods.institutionExists(institutionAddress).call();
    } catch (error) {
      console.error('Error checking institution existence:', error.message);
      throw error;
    }
  }

  // Check if email is registered
  async isEmailRegistered(email) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      return await this.contract.methods.isEmailRegistered(email).call();
    } catch (error) {
      console.error('Error checking email registration:', error.message);
      throw error;
    }
  }

  // Check if accreditation ID is registered
  async isAccreditationIdRegistered(accreditationId) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      return await this.contract.methods.isAccreditationIdRegistered(accreditationId).call();
    } catch (error) {
      console.error('Error checking accreditation ID registration:', error.message);
      throw error;
    }
  }

  // Get total institutions
  async getTotalInstitutions() {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      return await this.contract.methods.getTotalInstitutions().call();
    } catch (error) {
      console.error('Error getting total institutions:', error.message);
      throw error;
    }
  }

  // Get all institution addresses
  async getAllInstitutionAddresses() {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      return await this.contract.methods.getAllInstitutionAddresses().call();
    } catch (error) {
      console.error('Error getting all institution addresses:', error.message);
      throw error;
    }
  }

  // Deactivate institution
  async deactivateInstitution(fromAddress, institutionAddress) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      return await this.contract.methods.deactivateInstitution(institutionAddress).send({ from: fromAddress });
    } catch (error) {
      console.error('Error deactivating institution:', error.message);
      throw error;
    }
  }

  // Reactivate institution
  async reactivateInstitution(fromAddress, institutionAddress) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      return await this.contract.methods.reactivateInstitution(institutionAddress).send({ from: fromAddress });
    } catch (error) {
      console.error('Error reactivating institution:', error.message);
      throw error;
    }
  }

  // Update institution
  async updateInstitution(fromAddress, institutionAddress, name, email, country) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Call initializeContract first.');
      }

      return await this.contract.methods.updateInstitution(
        institutionAddress,
        name,
        email,
        country
      ).send({ from: fromAddress });
    } catch (error) {
      console.error('Error updating institution:', error.message);
      throw error;
    }
  }
}

module.exports = InstitutionRegistryHelper;
