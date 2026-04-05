// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        address issuer;
        address studentAddress;
        string studentName;
        string studentId;
        string course;
        string grade;
        uint256 issuedOn;
    }

    mapping(string => Certificate) private certificates;
    mapping(string => bool) private studentIdExists;
    mapping(address => string) private studentAddressToId;

    event CertificateIssued(
        string certificateId,
        address indexed issuer,
        address indexed studentAddress,
        string studentName,
        string studentId,
        string course,
        string grade,
        uint256 issuedOn
    );

    function issueCertificate(
        string memory _certificateId,
        address _studentAddress,
        string memory _studentName,
        string memory _studentId,
        string memory _course,
        string memory _grade
    ) public returns (bool) {
        require(bytes(_certificateId).length > 0, "Invalid certificate id");
        require(_studentAddress != address(0), "Invalid student address");
        // ensure not already issued
        require(certificates[_certificateId].issuedOn == 0, "Certificate id already exists");

        // ensure studentId is unique
        require(!studentIdExists[_studentId], "Student ID already used");

        // ensure studentAddress is either unused or mapped to same studentId
        string storage mappedId = studentAddressToId[_studentAddress];
        bytes memory mappedIdBytes = bytes(mappedId);
        if (mappedIdBytes.length != 0) {
            require(keccak256(mappedIdBytes) == keccak256(bytes(_studentId)), "Student wallet mapped to different studentId");
        }

        certificates[_certificateId] = Certificate({
            issuer: msg.sender,
            studentAddress: _studentAddress,
            studentName: _studentName,
            studentId: _studentId,
            course: _course,
            grade: _grade,
            issuedOn: block.timestamp
        });

        // Mark studentId and mapping
        studentIdExists[_studentId] = true;
        studentAddressToId[_studentAddress] = _studentId;

        emit CertificateIssued(_certificateId, msg.sender, _studentAddress, _studentName, _studentId, _course, _grade, block.timestamp);
        return true;
    }

    function getCertificate(string memory _certificateId)
        public
        view
        returns (
            address issuer,
            address studentAddress,
            string memory studentName,
            string memory studentId,
            string memory course,
            string memory grade,
            uint256 issuedOn
        )
    {
        Certificate storage c = certificates[_certificateId];
        require(c.issuedOn != 0, "Certificate not found");
        return (c.issuer, c.studentAddress, c.studentName, c.studentId, c.course, c.grade, c.issuedOn);
    }

    function isStudentIdUsed(string memory _studentId) public view returns (bool) {
        return studentIdExists[_studentId];
    }

    function getStudentIdByAddress(address _studentAddress) public view returns (string memory) {
        return studentAddressToId[_studentAddress];
    }
}
