import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PrescriptionTemplate = () => {
  const location = useLocation();
  const note = location.state?.note;
  const [patient, setPatient] = useState(null);

  // ✅ Fetch patient info using clinicId
 useEffect(() => {
  if (!note?.clinicId) return;
  axios
    .get(`/api/patients/${note.clinicId}`)
    .then((res) => {
      setPatient(res.data);
    })
    .catch((err) => {
      console.error("Error fetching patient:", err);
    });
}, [note]);


  const handleDownload = () => {
    if (!note || !patient) return;

    const doc = new jsPDF();
    const topMargin = 42;
    const bottomMargin = 30;

    const addHeaderFooter = (doc) => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Sri Devi Ayurveda Clinic", 105, 20, { align: "center" });
        doc.setFontSize(10);
        doc.text("Doreswamy Complex, Opp Kiran Nursing Home, Huliyar Road, Hiriyur", 105, 26, { align: "center" });
        doc.text("Contact: +91-8971859788 | shivunagaraj44@gmail.com", 105, 32, { align: "center" });
        doc.line(20, 36, 190, 36);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(0, 102, 0);
        doc.text("Sri Devi Ayurveda Clinic", 105, 275, { align: "center" });
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text("Doreswamy Complex, Opp Kiran Nursing Home, Huliyar Road, Hiriyur", 105, 281, { align: "center" });
        doc.setTextColor(0, 0, 255);
        doc.text("Mob: 8971859788 | Email: shivunagaraj44@gmail.com", 105, 287, { align: "center" });
      }
    };

    // ✅ Patient info table
    autoTable(doc, {
      startY: topMargin,
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
      headStyles: {
        fillColor: [204, 255, 229],
        textColor: [0, 80, 0],
        fontStyle: "bold",
      },
      head: [["Clinic ID", "Name", "Phone", "Age", "Sex", "Place", "Visit Date"]],
      body: [[
        patient.clinicId || "-",
        patient.name || "-",
        patient.phone || "-",
        patient.age || "-",
        patient.sex || "-",
        patient.address || "-",
        note.visitDate || "-",
      ]],
      margin: { top: topMargin, bottom: bottomMargin, left: 20, right: 20 },
    });

    let y = doc.lastAutoTable.finalY + 10;

    // ✅ Visit Info Table
    autoTable(doc, {
      startY: y,
      theme: "grid",
      styles: { fontSize: 10 },
      head: [["Field", "Value"]],
      body: [
        ["Complaint", note.complaint || "-"],
        ["Diagnosis", note.diagnosis || "-"],
        ["Tests", note.tests || "-"],
        ["Prescription", note.prescription || "-"],
      ],
      margin: { top: topMargin, bottom: bottomMargin, left: 20, right: 20 },
    });

    y = doc.lastAutoTable.finalY + 10;

    // ✅ Medicines Table
    if (note.medicines?.length) {
      autoTable(doc, {
        startY: y,
        theme: "grid",
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { fontSize: 10 },
        head: [["#", "Medicine Name", "Morning", "Afternoon", "Night", "Days", "Qty", "Unit"]],
        body: note.medicines.map((med, i) => [
          i + 1,
          med.name,
          med.dose1 || "-",
          med.dose2 || "-",
          med.dose3 || "-",
          med.days || "-",
          med.totalAmount || "-",
          med.unit || "-",
        ]),
        margin: { top: topMargin, bottom: bottomMargin, left: 20, right: 20 },
      });
    }

    addHeaderFooter(doc);
    doc.save(`Prescription_${note.visitDate}.pdf`);
  };

  if (!note) {
    return <div className="p-6 text-center text-red-500">No note data available</div>;
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Download Prescription</h2>
      <button
        onClick={handleDownload}
        disabled={!patient}
        className={`px-4 py-2 rounded ${
          patient
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        Download PDF
      </button>
    </div>
  );
};

export default PrescriptionTemplate;
