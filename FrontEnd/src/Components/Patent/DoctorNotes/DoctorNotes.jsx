import React, { useState } from "react";
import AddInduviualPatientMedicine from "../AddInduviualPatientMedicine/AddInduviualPatientMedicine";

const DoctorNotes = () => {
  const [doctorNotes, setDoctorNotes] = useState([]);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [noteDate, setNoteDate] = useState("");
  const [shortForm, setShortForm] = useState("");
  const [dose1, setDose1] = useState("");
  const [dose2, setDose2] = useState("");
  const [dose3, setDose3] = useState("");
  const [doseTime, setDoseTime] = useState("B/F");
  const [days, setDays] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [bottleCount, setBottleCount] = useState("");
  const [unit, setUnit] = useState("No"); // 'No' for tablets, 'ml' for Kashaya
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

  const handleMedicineAdd = (id, name, d1, d2, d3, time, days, totalAmount, unit, bottleCount) => {
    setDoctorNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              medicines: [
                ...note.medicines,
                { name, dose1: d1, dose2: d2, dose3: d3, time, days, totalAmount, unit, bottleCount },
              ],
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

  const updateDays = (value) => {
    setDays(value);
    const total =
      (Number(dose1 || 0) + Number(dose2 || 0) + Number(dose3 || 0)) * Number(value || 0);
    setTotalAmount(total > 0 ? total : "");
    if (unit === "ml") {
      const bottles = Math.ceil(total / 210);
      setBottleCount(bottles > 0 ? bottles : "");
    } else {
      setBottleCount("");
    }
  };

  return (
    <div className="mt-10">
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

      {doctorNotes.map((note) => (
        <div key={note.id} className="mb-6 border rounded-lg shadow bg-white">
          <div className="p-2 border-b flex items-center justify-between">
            <p className="font-semibold text-green-700">Doctor's Note - {note.visitDate}</p>
            <button
              onClick={() => toggleDropdown(note.id)}
              className="text-green-700 text-xl font-bold hover:bg-green-100 w-8 h-8 rounded-full"
            >
              {openNoteId === note.id ? "−" : "+"}
            </button>
          </div>

          {openNoteId === note.id && (
            <div className="p-4 space-y-4">
              {['complaint', 'diagnosis', 'tests', 'prescription'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold mb-1 capitalize">{field}</label>
                  <textarea
                    value={note[field]}
                    onChange={(e) => handleChange(note.id, field, e.target.value)}
                    className="w-full border rounded-md p-2 min-h-[100px]"
                    disabled={note.saved}
                  />
                </div>
              ))}

              {!note.saved && (
                <AddInduviualPatientMedicine
                  shortForm={shortForm}
                  setShortForm={setShortForm}
                  showSuggestions={showSuggestions}
                  setShowSuggestions={setShowSuggestions}
                  filteredMedicines={filteredMedicines}
                  medicineMap={medicineMap}
                  handleSuggestionClick={handleSuggestionClick}
                  unit={unit}
                  setUnit={setUnit}
                  dose1={dose1}
                  setDose1={setDose1}
                  dose2={dose2}
                  setDose2={setDose2}
                  dose3={dose3}
                  setDose3={setDose3}
                  days={days}
                  updateDays={updateDays}
                  totalAmount={totalAmount}
                  bottleCount={bottleCount}
                  doseTime={doseTime}
                  setDoseTime={setDoseTime}
                  handleAddMedicine={() => {
                    const finalShort = getShortCodeFromFullName(shortForm) || shortForm;
                    const finalFull = medicineMap[finalShort];
                    if (!finalFull) return alert("Medicine not found.");
                    if (!days || !totalAmount)
                      return alert("Please enter valid doses and days.");
                    handleMedicineAdd(
                      note.id,
                      finalFull,
                      dose1,
                      dose2,
                      dose3,
                      doseTime,
                      days,
                      totalAmount,
                      unit,
                      bottleCount
                    );
                    setShortForm("");
                    setDose1("");
                    setDose2("");
                    setDose3("");
                    setDays("");
                    setTotalAmount("");
                    setUnit("No");
                    setDoseTime("B/F");
                    setBottleCount("");
                  }}
                />
              )}

              {note.medicines.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-sm">Prescribed Medicines</h4>
                  {note.medicines.map((med, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-6 bg-white p-3 rounded shadow-sm text-base border"
                    >
                      <span className="w-1/5 font-medium">{med.name}</span>
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
                      <span className="w-28 text-center">
                      {{
                      "B/F": "Before Food",
                       "A/F": "After Food",
                       "I/B/F": "In Between Food"
                          }[med.time]}
                       </span>

                      <span className="w-20 text-center">
                        <div className="text-[10px] text-gray-500">Days</div>
                        <div>{med.days}</div>
                      </span>
                      <span className="w-28 text-center">
                        <div className="text-[10px] text-gray-500">Total</div>
                        <div className="font-semibold">
                          {med.totalAmount} {med.unit}
                        </div>
                      </span>
                      {med.unit === "ml" && (
                        <span className="w-28 text-center">
                          <div className="text-[10px] text-gray-500">Bottles</div>
                          <div className="font-semibold">{med.bottleCount}</div>
                        </span>
                      )}
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
                          prev.map((n) => (n.id === note.id ? { ...n, saved: false } : n))
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
  );
};

export default DoctorNotes;