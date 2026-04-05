import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  initWeb3,
  getInstitution,
  getAllInstitutions,
  issueCertificateOnChain,
  institutionExists,
  getWeb3,
  isStudentIdUsedOnChain,
  getStudentIdForAddress,
} from "../utils/web3Config";

const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseProgram: "",
    grade: "",
    studentAddress: "",
    institutionWalletAddress: "",
    institutionName: "",
    institutionEmail: "",
    institutionCountry: "",
  });
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  useEffect(() => {
    const fetchInstitution = async () => {
      const addr = formData.institutionWalletAddress?.trim();
      if (!addr) return;
      try {
        await initWeb3();
        const inst = await getInstitution(addr);
        if (inst && inst.name) {
          setFormData((prev) => ({
            ...prev,
            institutionName: inst.name || "",
            institutionEmail: inst.email || "",
            institutionCountry: inst.country || "",
          }));
        }
      } catch (err) {
        setFormData((prev) => ({ ...prev, institutionName: "", institutionEmail: "", institutionCountry: "" }));
        console.error("Failed to fetch institution:", err.message || err);
      }
    };

    fetchInstitution();
  }, [formData.institutionWalletAddress]);

  const handleIssue = async () => {
    setValidationError("");
    setLoading(true);

    const idsKey = "issuedStudentIds";
    const mapKey = "issuedStudentMap";

    try {
      // Basic required fields
      if (!formData.studentAddress || !formData.institutionWalletAddress || !formData.studentId) {
        setValidationError("Student Address, Institution Address and Student ID are required.");
        setLoading(false);
        return;
      }

      const studentAddr = formData.studentAddress.trim().toLowerCase();
      const institutionAddr = formData.institutionWalletAddress.trim().toLowerCase();

      if (studentAddr === institutionAddr) {
        setValidationError("Student wallet address cannot be the same as the institution wallet address.");
        setLoading(false);
        return;
      }

      await initWeb3();

      const allInst = await getAllInstitutions();
      const instAddresses = allInst.map((i) => (i.institutionAddress || "").toLowerCase());
      if (instAddresses.includes(studentAddr)) {
        setValidationError("Student wallet address is registered as an institution address and cannot be used.");
        setLoading(false);
        return;
      }

      const instExists = await institutionExists(formData.institutionWalletAddress.trim());
      if (!instExists) {
        setValidationError("The provided institution wallet address is not a registered institution.");
        setLoading(false);
        return;
      }

      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const from = (accounts[0] || "").toLowerCase();
      if (from !== institutionAddr) {
        setValidationError("You must be connected with the institution wallet in MetaMask to issue a certificate.");
        setLoading(false);
        return;
      }

      const instUsedAsStudent = await getStudentIdForAddress(formData.institutionWalletAddress.trim());
      if (instUsedAsStudent && instUsedAsStudent.length > 0) {
        setValidationError("The institution wallet address is already used as a student wallet and cannot issue certificates.");
        setLoading(false);
        return;
      }

      // On-chain uniqueness checks
      const onChainUsed = await isStudentIdUsedOnChain(formData.studentId);
      if (onChainUsed) {
        setValidationError("Student ID has already been used for an issued certificate (on-chain).");
        setLoading(false);
        return;
      }

      const onChainMappedId = await getStudentIdForAddress(formData.studentAddress.trim());
      if (onChainMappedId && onChainMappedId.length > 0 && onChainMappedId !== formData.studentId) {
        setValidationError("This student wallet address is already associated with a different Student ID (on-chain).");
        setLoading(false);
        return;
      }

      // LocalStorage fallback checks
      try {
        const storedIds = JSON.parse(localStorage.getItem(idsKey) || "[]");
        const storedMap = JSON.parse(localStorage.getItem(mapKey) || "{}");
        const mappedId = storedMap[studentAddr];
        if (mappedId && mappedId !== formData.studentId) {
          setValidationError("This student wallet address is already associated with a different Student ID.");
          setLoading(false);
          return;
        }
        if (storedIds.includes(formData.studentId)) {
          setValidationError("Student ID has already been used for an issued certificate.");
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("localStorage error", e);
      }

      // Create certificateId and call on-chain
      const certificateId = `${formData.studentId}-${Date.now()}`;
      const certData = {
        certificateId,
        studentAddress: formData.studentAddress.trim(),
        studentName: formData.studentName.trim(),
        studentId: formData.studentId.trim(),
        courseProgram: formData.courseProgram.trim(),
        grade: formData.grade.trim(),
      };

      try {
        await issueCertificateOnChain(certData);
      } catch (err) {
        console.error("issueCertificateOnChain failed", err);
        setValidationError(`Failed to record certificate on-chain: ${err.message || err}`);
        setLoading(false);
        return;
      }

      // Generate PDF
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      // Header
      doc.setFillColor(6, 78, 59);
      doc.rect(0, 0, 595, 90, "F");
      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      doc.text("Certificate of Completion", 40, 55);

      doc.setFontSize(12);
      doc.setTextColor(200, 255, 245);
      doc.text(`${formData.institutionName || ""}`, 420, 40, { align: "right" });
      doc.setTextColor(255, 255, 255);

      doc.setFillColor(255, 255, 255);
      doc.roundedRect(40, 110, 515, 420, 10, 10, "F");

      doc.setFontSize(20);
      doc.setTextColor(6, 78, 59);
      doc.text(`${formData.studentName || ""}`, 300, 180, { align: "center" });

      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      const leftCol = 80;
      const rightCol = 340;
      let y = 220;

      doc.text("Student ID", leftCol, y - 8);
      doc.setFontSize(13);
      doc.text(`${formData.studentId || ""}`, leftCol, y + 6);

      doc.setFontSize(11);
      doc.text("Course / Program", rightCol, y - 8);
      doc.setFontSize(13);
      doc.text(`${formData.courseProgram || ""}`, rightCol, y + 6);

      y += 36;
      doc.setFontSize(11);
      doc.text("Grade", leftCol, y - 8);
      doc.setFontSize(13);
      doc.text(`${formData.grade || ""}`, leftCol, y + 6);

      doc.setFontSize(11);
      doc.text("Student Wallet", rightCol, y - 8);
      doc.setFontSize(11);
      doc.text(`${formData.studentAddress || ""}`, rightCol, y + 6);

      y += 46;
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(`Issued By: ${formData.institutionName || ""}`, leftCol, y);
      doc.text(`Institution Email: ${formData.institutionEmail || ""}`, rightCol, y);

      y += 26;
      const issuedOn = new Date().toLocaleDateString();
      doc.text(`Issued On: ${issuedOn}`, leftCol, y);

      doc.setDrawColor(6, 78, 59);
      doc.setLineWidth(0.5);
      doc.rect(80, 500, 200, 24);
      doc.setFontSize(10);
      doc.setTextColor(6, 78, 59);
      doc.text(`Certificate ID: ${certificateId}`, 90, 516);

      const filename = `${formData.studentName || "certificate"}_${formData.studentId || Date.now()}.pdf`;
      doc.save(filename);

      // Persist local mappings
      try {
        const storedIds = JSON.parse(localStorage.getItem(idsKey) || "[]");
        storedIds.push(formData.studentId);
        localStorage.setItem(idsKey, JSON.stringify(storedIds));

        const storedMap = JSON.parse(localStorage.getItem(mapKey) || "{}");
        storedMap[studentAddr] = formData.studentId;
        localStorage.setItem(mapKey, JSON.stringify(storedMap));
      } catch (e) {
        console.error("Failed to persist student data in localStorage", e);
      }

      setLoading(false);
      setValidationError("");
      setFormData((prev) => ({ ...prev, studentName: "", studentId: "", courseProgram: "", grade: "", studentAddress: "" }));
    } catch (err) {
      console.error(err);
      setValidationError(err.message || "Failed to issue certificate");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0f172a] to-[#0b1120] text-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center mb-8 bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Issue Certificate</h2>

        {validationError && <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-200 rounded">{validationError}</div>}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-2 text-gray-300 font-medium">Institution Wallet Address</label>
            <input name="institutionWalletAddress" value={formData.institutionWalletAddress} onChange={handleChange} placeholder="0x..." className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white" />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">Institution Name (auto)</label>
            <input name="institutionName" value={formData.institutionName} readOnly className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">Student Wallet Address</label>
            <input name="studentAddress" value={formData.studentAddress} onChange={handleChange} placeholder="0x..." className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-gray-300 font-medium">Student Name</label>
              <input name="studentName" value={formData.studentName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white" />
            </div>
            <div>
              <label className="block mb-2 text-gray-300 font-medium">Student ID</label>
              <input name="studentId" value={formData.studentId} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">Course / Program</label>
            <input name="courseProgram" value={formData.courseProgram} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white" />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">Grade</label>
            <input name="grade" value={formData.grade} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white" />
          </div>

          <button onClick={handleIssue} disabled={loading} className="mt-4 py-3 rounded-lg font-semibold text-black bg-linear-to-r from-green-400 to-cyan-400 w-full">
            {loading ? "Issuing..." : "Issue Certificate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCertificate;

