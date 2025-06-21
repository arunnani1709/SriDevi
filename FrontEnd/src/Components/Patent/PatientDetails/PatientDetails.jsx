import React, { useState, } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";

const PatientDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const patient = state?.patient;

  const [doctorNotes, setDoctorNotes] = useState([]);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [noteDate, setNoteDate] = useState("");
  const [shortForm, setShortForm] = useState("");
  const [dose1, setDose1] = useState("");
  const [dose2, setDose2] = useState("");
  const [dose3, setDose3] = useState("");
  const [doseTime, setDoseTime] = useState("B/F");
  const [showSuggestions, setShowSuggestions] = useState(false);


  const medicineMap = {
    PCM: "Paracetamol",
    PBM: "Paraceta",
    CRM: "Paral",
    AZ: "Azithromycin",
    DLO: "Dolopar",
    CPM: "Cetirizine",
    RNT: "Rantac",
    AMX: "Amoxicillin",
    IBP: "Ibuprofen",
  };

  const filteredMedicines = Object.keys(medicineMap).filter(
    (key) => key.toLowerCase().startsWith(shortForm.toLowerCase()) && shortForm !== ""
  );
  const handleDownloadPDF = () => {
    const content = document.createElement("div");
    const patientSection = document.querySelector("#patient-section");
    if (patientSection) {
      content.appendChild(patientSection.cloneNode(true));
    }

    const notes = doctorNotes.filter((note) => note.saved);
    notes.forEach((note) => {
      const noteDiv = document.createElement("div");
      noteDiv.innerHTML = `
        <h3>Doctor's Note - ${note.visitDate}</h3>
        <p><strong>Complaint:</strong> ${note.complaint}</p>
        <p><strong>Diagnosis:</strong> ${note.diagnosis}</p>
        <p><strong>Prescription:</strong> ${note.prescription}</p>
        <h4>Medicines:</h4>
        <ul>
          ${note.medicines
            .map(
              (med) =>
                `<li>${med.name} - ${med.dose1}, ${med.dose2}, ${med.dose3} (${med.time})</li>`
            )
            .join("")}
        </ul>
      `;
      content.appendChild(noteDiv);
    });

    const opt = {
      margin: 0.5,
      filename: `Patient_${patient?.clinicId || "Details"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(content).save();
  };

  
  const handleAddNote = () => {
    if (!noteDate) return alert("Please enter a date before adding a note.");

    const newVisitDate = new Date(noteDate);
    const lastVisit = doctorNotes.map((n) => new Date(n.visitDate)).sort((a, b) => b - a)[0];

    let daysDifference = null;
    if (lastVisit) {
      const diffTime = newVisitDate.getTime() - lastVisit.getTime();
      daysDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const newNote = {
      id: Date.now(),
      visitDate: noteDate,
      complaint: "",
      diagnosis: "",
      tests: "",
      prescription: "",
      medicines: [],
      saved: false,
      daysSinceLastVisit: daysDifference,
    };

    setDoctorNotes((prev) => [...prev, newNote]);
    setNoteDate("");
    setOpenNoteId(newNote.id);
  };

  const handleChange = (id, field, value) => {
    setDoctorNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, [field]: value } : note))
    );
  };

  const handleSave = (id) => {
    setDoctorNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, saved: true } : note))
    );
  };

  const toggleDropdown = (id) => {
    setOpenNoteId((prev) => (prev === id ? null : id));
  };

  const handleMedicineAdd = (id, name, d1, d2, d3, time) => {
    setDoctorNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              medicines: [...note.medicines, { name, dose1: d1, dose2: d2, dose3: d3, time }],
            }
          : note
      )
    );
  };

  const handleSuggestionClick = (code) => {
    setShortForm(medicineMap[code]);
    setShowSuggestions(false);
  };

  const getShortCodeFromFullName = (fullName) =>
    Object.keys(medicineMap).find((key) => medicineMap[key] === fullName);

  if (!patient) {
    return (
      <div className="p-8 text-center text-red-600">
        Patient data not found. Please go back to the list.
        <br />
        <button
          onClick={() => navigate("/patients")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />
        <div className="p-8 mx-auto w-[1050px]">

        
          <div className="bg-white rounded shadow p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
              Patient Details
            </h2>
            <div className="overflow-x-auto border rounded-md mb-6">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-green-100 text-green-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Clinic ID</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Age</th>
                    <th className="px-4 py-3 font-semibold">Sex</th>
                    <th className="px-4 py-3 font-semibold">Place</th>
                    <th className="px-4 py-3 font-semibold">Visit Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">{patient.clinicId}</td>
                    <td className="px-4 py-2">{patient.name}</td>
                    <td className="px-4 py-2">{patient.phone}</td>
                    <td className="px-4 py-2">{patient.age}</td>
                    <td className="px-4 py-2">{patient.sex}</td>
                    <td className="px-4 py-2">{patient.address}</td>
                    <td className="px-4 py-2">{patient.visitDate}</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Back to List
              </button>
            </div>
          

          <div className="mb-4 flex gap-4 items-center">
            <input
              type="date"
              value={noteDate}
              onChange={(e) => setNoteDate(e.target.value)}
              className="border rounded px-4 py-2"
            />
            <button
              onClick={handleAddNote}
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              Doctor's Note
            </button>
          </div>
{/* displaying return date  */}

          {doctorNotes.map((note, index) => (
            <div key={note.id} className="mb-6 border rounded-lg shadow bg-white">
              <div className="p-2 border-b flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-700 text-base">
                    Doctor's Note - {note.visitDate}
                  </p>
                  {index !== doctorNotes.length - 1 && doctorNotes[index + 1]?.daysSinceLastVisit != null && (
                    <p className="text-xs text-gray-500">
                      Returned after <span className="text-green-700 font-semibold">{doctorNotes[index + 1].daysSinceLastVisit}</span> day{doctorNotes[index + 1].daysSinceLastVisit > 1 ? "s" : ""} <span className="text-gray-400">(Previous visit: {note.visitDate})</span>
                    </p>
                  )}
                </div>

            {/* print */}
              <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Download PDF
            </button>

                <button
                  onClick={() => toggleDropdown(note.id)}
                  className="text-green-700 text-xl font-bold hover:bg-green-100 w-8 h-8 rounded-full"
                >
                  {/* prescription note */}
                  {openNoteId === note.id ? "−" : "+"}
                </button>

              </div>
              {openNoteId === note.id && (
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Complaint</label>
                    <textarea
                      value={note.complaint}
                      onChange={(e) => handleChange(note.id, "complaint", e.target.value)}
                      className="w-full border rounded-md p-2"
                      disabled={note.saved}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Diagnosis</label>
                    <textarea
                      value={note.diagnosis}
                      onChange={(e) => handleChange(note.id, "diagnosis", e.target.value)}
                      className="w-full border rounded-md p-2  min-h-[100px]"
                      disabled={note.saved}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Tests/Reports</label>
                    <textarea
                      value={note.tests}
                      onChange={(e) => handleChange(note.id, "tests", e.target.value)}
                      className="w-full border rounded-md p-2  min-h-[300px]"
                      disabled={note.saved}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Prescription</label>
                    <textarea
                      value={note.prescription}
                      onChange={(e) => handleChange(note.id, "prescription", e.target.value)}
                      className="w-full border rounded-md p-2 min-h-[150px]"
                      disabled={note.saved}
                    />
                  </div>

                  {/* Medicine Prescription Entry */}
                  {!note.saved && (
                    <div className="bg-gray-50 p-4 border rounded">
                      <h4 className="font-medium text-sm mb-3">Add Medicine</h4>
                      <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative w-[200px]">
                          <input
                            type="text"
                            placeholder="Search medicine"
                            value={shortForm}
                            onChange={(e) => {
                              setShortForm(e.target.value.toUpperCase());
                              setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            className="border rounded-md p-2 w-full"
                          />
                          {showSuggestions && filteredMedicines.length > 0 && (
                            <ul className="absolute bg-white border rounded shadow-md w-full mt-1 z-50">
                              {filteredMedicines.map((code) => (
                                <li
                                  key={code}
                                  onClick={() => handleSuggestionClick(code)}
                                  className="px-3 py-1 text-sm hover:bg-green-100 cursor-pointer"
                                >
                                  {code} - {medicineMap[code]}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Dose 1"
                          value={dose1}
                          onChange={(e) => setDose1(e.target.value)}
                          className="border rounded p-2 w-[60px]"
                        />
                        <input
                          type="text"
                          placeholder="Dose 2"
                          value={dose2}
                          onChange={(e) => setDose2(e.target.value)}
                          className="border rounded p-2 w-[60px]"
                        />
                        <input
                          type="text"
                          placeholder="Dose 3"
                          value={dose3}
                          onChange={(e) => setDose3(e.target.value)}
                          className="border rounded p-2 w-[60px]"
                        />
                        <select
                          value={doseTime}
                          onChange={(e) => setDoseTime(e.target.value)}
                          className="border rounded p-2"
                        >
                          <option value="B/F">B/F</option>
                          <option value="I/B/F">I/B/F</option>
                          <option value="A/F">A/F</option>
                        </select>
                        <button
                          onClick={() => {
                            const fullName = shortForm;
                            const shortCode = getShortCodeFromFullName(fullName);
                            const finalShort = shortCode || fullName;
                            const finalFull = medicineMap[finalShort];
                            if (!finalFull) return alert("Medicine not found.");

                            handleMedicineAdd(note.id, finalFull, dose1, dose2, dose3, doseTime);
                            setShortForm("");
                            setDose1("");
                            setDose2("");
                            setDose3("");
                            setDoseTime("B/F");
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {note.medicines.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium text-sm">Prescribed Medicines</h4>
                      {note.medicines.map((med, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-6 bg-white p-3 rounded shadow-sm text-base border"
                        >
                          <span className="w-1/4 font-medium">{med.name}</span>
                          <span className="w-16 text-center">
                            <div className="text-[10px] text-gray-500">Morning</div>
                            <div>{med.dose1}</div>
                          </span>
                          <span className="w-16 text-center">
                            <div className="text-[10px] text-gray-500">Afternoon</div>
                            <div>{med.dose2}</div>
                          </span>
                          <span className="w-16 text-center">
                            <div className="text-[10px] text-gray-500">Evening</div>
                            <div>{med.dose3}</div>
                          </span>
                          <span className="w-40 text-center">
                            {med.time === "B/F"
                              ? "Before Food"
                              : med.time === "I/B/F"
                              ? "In Between Food"
                              : med.time === "A/F"
                              ? "After Food"
                              : med.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    {!note.saved ? (
                      <button
                        onClick={() => handleSave(note.id)}
                        className="px-5 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <p className="text-sm text-green-600 font-medium">Saved ✅</p>
                        <button
                          onClick={() =>
                            setDoctorNotes((prev) =>
                              prev.map((n) =>
                                n.id === note.id ? { ...n, saved: false } : n
                              )
                            )
                          }
                          className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
