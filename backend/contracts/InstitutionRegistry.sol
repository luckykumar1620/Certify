// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InstitutionRegistry {
    
    // Struct to store institution details
    struct Institution {
        address institutionAddress;
        string name;
        string email;
        string accreditationId;
        string country;
        uint256 registrationTimestamp;
        bool isActive;
    }
    
    // Mapping to store institutions by their ethereum address
    mapping(address => Institution) public institutions;
    
    // Mapping to check if email is already registered
    mapping(string => bool) private emailExists;
    
    // Mapping to check if accreditation ID is already registered
    mapping(string => bool) private accreditationIdExists;
    
    // Array to store all registered institution addresses
    address[] public institutionAddresses;
    
    // Events
    event InstitutionRegistered(
        address indexed institutionAddress,
        string name,
        string email,
        string accreditationId,
        string country,
        uint256 timestamp
    );
    
    event InstitutionUpdated(
        address indexed institutionAddress,
        string name,
        string email,
        string country,
        uint256 timestamp
    );
    
    event InstitutionDeactivated(
        address indexed institutionAddress,
        uint256 timestamp
    );
    
    // Modifiers
    modifier onlyNewAddress(address _address) {
        require(
            institutions[_address].institutionAddress == address(0),
            "Institution already registered at this address"
        );
        _;
    }
    
    modifier onlyRegisteredInstitution(address _address) {
        require(
            institutions[_address].institutionAddress != address(0),
            "Institution not registered"
        );
        _;
    }
    
    // Function to register a new institution
    function registerInstitution(
        address _institutionAddress,
        string memory _name,
        string memory _email,
        string memory _accreditationId,
        string memory _country
    ) public onlyNewAddress(_institutionAddress) returns (bool) {
        
        // Validate inputs
        require(_institutionAddress != address(0), "Invalid ethereum address");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(_accreditationId).length > 0, "Accreditation ID cannot be empty");
        require(bytes(_country).length > 0, "Country cannot be empty");
        
        // Check if email already exists
        require(!emailExists[_email], "Email already registered");
        
        // Check if accreditation ID already exists
        require(!accreditationIdExists[_accreditationId], "Accreditation ID already registered");
        
        // Create new institution
        institutions[_institutionAddress] = Institution({
            institutionAddress: _institutionAddress,
            name: _name,
            email: _email,
            accreditationId: _accreditationId,
            country: _country,
            registrationTimestamp: block.timestamp,
            isActive: true
        });
        
        // Mark email and accreditation ID as used
        emailExists[_email] = true;
        accreditationIdExists[_accreditationId] = true;
        
        // Add to institutions array
        institutionAddresses.push(_institutionAddress);
        
        // Emit event
        emit InstitutionRegistered(
            _institutionAddress,
            _name,
            _email,
            _accreditationId,
            _country,
            block.timestamp
        );
        
        return true;
    }
    
    // Function to get institution details
    function getInstitution(address _institutionAddress) 
        public 
        view 
        onlyRegisteredInstitution(_institutionAddress) 
        returns (Institution memory) 
    {
        return institutions[_institutionAddress];
    }
    
    // Function to check if institution exists
    function institutionExists(address _institutionAddress) 
        public 
        view 
        returns (bool) 
    {
        return institutions[_institutionAddress].institutionAddress != address(0);
    }
    
    // Function to check if email is already registered
    function isEmailRegistered(string memory _email) 
        public 
        view 
        returns (bool) 
    {
        return emailExists[_email];
    }
    
    // Function to check if accreditation ID is already registered
    function isAccreditationIdRegistered(string memory _accreditationId) 
        public 
        view 
        returns (bool) 
    {
        return accreditationIdExists[_accreditationId];
    }
    
    // Function to get total number of registered institutions
    function getTotalInstitutions() 
        public 
        view 
        returns (uint256) 
    {
        return institutionAddresses.length;
    }
    
    // Function to get all institution addresses
    function getAllInstitutionAddresses() 
        public 
        view 
        returns (address[] memory) 
    {
        return institutionAddresses;
    }
    
    // Function to deactivate an institution
    function deactivateInstitution(address _institutionAddress) 
        public 
        onlyRegisteredInstitution(_institutionAddress) 
        returns (bool) 
    {
        institutions[_institutionAddress].isActive = false;
        
        emit InstitutionDeactivated(_institutionAddress, block.timestamp);
        
        return true;
    }
    
    // Function to reactivate an institution
    function reactivateInstitution(address _institutionAddress) 
        public 
        onlyRegisteredInstitution(_institutionAddress) 
        returns (bool) 
    {
        institutions[_institutionAddress].isActive = true;
        
        return true;
    }
    
    // Function to update institution details (except ethereum address and accreditation ID)
    function updateInstitution(
        address _institutionAddress,
        string memory _name,
        string memory _email,
        string memory _country
    ) 
        public 
        onlyRegisteredInstitution(_institutionAddress) 
        returns (bool) 
    {
        Institution storage institution = institutions[_institutionAddress];
        
        // If email is being changed, check if new email is available
        if (keccak256(bytes(_email)) != keccak256(bytes(institution.email))) {
            require(!emailExists[_email], "Email already registered");
            emailExists[institution.email] = false;
            emailExists[_email] = true;
        }
        
        // Update institution details
        institution.name = _name;
        institution.email = _email;
        institution.country = _country;
        
        emit InstitutionUpdated(
            _institutionAddress,
            _name,
            _email,
            _country,
            block.timestamp
        );
        
        return true;
    }
}
