const InstitutionRegistry = artifacts.require("InstitutionRegistry");

module.exports = function(deployer) {
  deployer.deploy(InstitutionRegistry);
};
