const InstitutionRegistry = artifacts.require("InstitutionRegistry");

contract("InstitutionRegistry", (accounts) => {
  
  let institutionRegistry;
  const ownerAddress = accounts[0];
  const institutionAddress1 = accounts[1];
  const institutionAddress2 = accounts[2];
  
  before(async () => {
    institutionRegistry = await InstitutionRegistry.deployed();
  });
  
  // Test 1: Register Institution Successfully
  it("should register a new institution successfully", async () => {
    const tx = await institutionRegistry.registerInstitution(
      institutionAddress1,
      "Harvard University",
      "admin@harvard.edu",
      "ACCRED001",
      "United States"
    );
    
    assert(tx, "Transaction should succeed");
    
    const institution = await institutionRegistry.getInstitution(institutionAddress1);
    assert.equal(institution.name, "Harvard University", "Institution name mismatch");
    assert.equal(institution.email, "admin@harvard.edu", "Institution email mismatch");
    assert.equal(institution.accreditationId, "ACCRED001", "Accreditation ID mismatch");
    assert.equal(institution.country, "United States", "Institution country mismatch");
    assert.equal(institution.isActive, true, "Institution should be active");
  });
  
  // Test 2: Unique Email Constraint
  it("should fail to register institution with duplicate email", async () => {
    try {
      await institutionRegistry.registerInstitution(
        institutionAddress2,
        "MIT",
        "admin@harvard.edu",
        "ACCRED002",
        "United States"
      );
      assert(false, "Should have thrown an error for duplicate email");
    } catch (error) {
      assert(error.message.includes("Email already registered"), "Error message should indicate duplicate email");
    }
  });
  
  // Test 3: Unique Accreditation ID Constraint
  it("should fail to register institution with duplicate accreditation ID", async () => {
    try {
      await institutionRegistry.registerInstitution(
        institutionAddress2,
        "MIT",
        "admin@mit.edu",
        "ACCRED001",
        "United States"
      );
      assert(false, "Should have thrown an error for duplicate accreditation ID");
    } catch (error) {
      assert(error.message.includes("Accreditation ID already registered"), "Error message should indicate duplicate accreditation ID");
    }
  });
  
  // Test 4: Unique Ethereum Address Constraint
  it("should fail to register institution with duplicate ethereum address", async () => {
    try {
      await institutionRegistry.registerInstitution(
        institutionAddress1,
        "Another University",
        "admin@another.edu",
        "ACCRED003",
        "United States"
      );
      assert(false, "Should have thrown an error for duplicate ethereum address");
    } catch (error) {
      assert(error.message.includes("Institution already registered at this address"), "Error message should indicate duplicate address");
    }
  });
  
  // Test 5: Check Institution Exists
  it("should return true for registered institution", async () => {
    const exists = await institutionRegistry.institutionExists(institutionAddress1);
    assert.equal(exists, true, "Institution should exist");
  });
  
  // Test 6: Check Email Registration
  it("should return true for registered email", async () => {
    const isRegistered = await institutionRegistry.isEmailRegistered("admin@harvard.edu");
    assert.equal(isRegistered, true, "Email should be registered");
  });
  
  // Test 7: Check Accreditation ID Registration
  it("should return true for registered accreditation ID", async () => {
    const isRegistered = await institutionRegistry.isAccreditationIdRegistered("ACCRED001");
    assert.equal(isRegistered, true, "Accreditation ID should be registered");
  });
  
  // Test 8: Get Total Institutions
  it("should return correct total number of institutions", async () => {
    const total = await institutionRegistry.getTotalInstitutions();
    assert.equal(total.toNumber(), 1, "Total institutions should be 1");
  });
  
  // Test 9: Deactivate Institution
  it("should deactivate an institution", async () => {
    const tx = await institutionRegistry.deactivateInstitution(institutionAddress1);
    assert(tx, "Deactivation transaction should succeed");
    
    const institution = await institutionRegistry.getInstitution(institutionAddress1);
    assert.equal(institution.isActive, false, "Institution should be inactive");
  });
  
  // Test 10: Reactivate Institution
  it("should reactivate an institution", async () => {
    const tx = await institutionRegistry.reactivateInstitution(institutionAddress1);
    assert(tx, "Reactivation transaction should succeed");
    
    const institution = await institutionRegistry.getInstitution(institutionAddress1);
    assert.equal(institution.isActive, true, "Institution should be active");
  });
});
