import React, { useState, useEffect } from "react";
import axios from "axios";
import AddInduviualPatientMedicine from "../AddInduviualPatientMedicine/AddInduviualPatientMedicine";

const getBackendType = (unit, selectedType) => {
  if (selectedType === "Grutha" || selectedType === "Kashaya") return selectedType;
  if (["NaselDrop", "Thaila", "Soap", "Shampu", "Linements"].includes(selectedType)) {
    return selectedType;
  }
  if (unit === "ml") return "Kashaya";
  return selectedType || "Tablet";
};

const getFrontendUnit = (type) => (type === "Kashaya" ? "ml" : "No");

const DoctorNotes = ({ clinicId }) => {
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
  const [unit, setUnit] = useState("No");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [fullForm, setFullForm] = useState("");
  const [selectedType, setSelectedType] = useState("");

    const hideTimeTypes = [
    "Thila",
    "Linements",
    "NaselDrop",
    "Soap",
    "Paste",
    "Shampu",
  ];

  useEffect(() => {
    axios.get("/api/medicines").then((res) => setMedicines(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!clinicId) return;
    axios.get(`/api/notes/clinic/${clinicId}`).then((res) => {
      const sorted = res.data.sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));
      const enriched = sorted.map((note, idx, arr) => {
        let daysSinceLastVisit = null;
        if (idx < arr.length - 1) {
          const prev = new Date(arr[idx + 1].visitDate);
          const curr = new Date(note.visitDate);
          daysSinceLastVisit = Math.ceil((curr - prev) / (1000 * 60 * 60 * 24));
        }
        return {
          ...note,
          id: note.id,
          dbId: note.id,
          saved: true,
          medicines: note.medicines || [],
          daysSinceLastVisit,
        };
      });
      setDoctorNotes(enriched);
    }).catch(console.error);
  }, [clinicId]);

  const filteredMedicines = medicines.filter((med) =>
    med.code.toLowerCase().startsWith(shortForm.toLowerCase())
  ).map((med) => `${med.code} - ${med.name}`);

  const handleAddNote = () => {
    if (!noteDate) return alert("Please enter a date before adding a note.");
    const newNote = {
      id: Date.now(),
      dbId: null,
      visitDate: noteDate,
      complaint: "",
      diagnosis: "",
      tests: "",
      prescription: "",
      medicines: [],
      saved: false,
      daysSinceLastVisit: null,
    };
    setDoctorNotes((prev) => [...prev, newNote]);
    setNoteDate("");
    setOpenNoteId(newNote.id);
  };

  const handleChange = (id, field, value) => {
    setDoctorNotes((prev) => prev.map((note) => note.id === id ? { ...note, [field]: value } : note));
  };

  const handleSave = async (id) => {
    const note = doctorNotes.find((n) => n.id === id);
    try {
      let savedNote;
      if (note.dbId) {
        savedNote = await axios.put(`/api/notes/${note.dbId}`, { ...note, clinicId, medicines: [] });
      } else {
        savedNote = await axios.post("/api/notes", { ...note, clinicId, medicines: [] });
      }
      if (note.medicines.length > 0) {
        const enrichedMedicines = note.medicines.map((med) => ({
          ...med,
          clinicId,
          visitDate: note.visitDate,
          type: med.type || getBackendType(med.unit, med.selectedType),
        }));
        await axios.post("/api/notes/prescriptions", {
          clinicId,
          visitDate: note.visitDate,
          medicines: enrichedMedicines,
        });
      }
      setDoctorNotes((prev) => prev.map((n) => n.id === id ? { ...n, saved: true, dbId: savedNote.data.id } : n));
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save doctor's note.");
    }
  };

  const handleMedicineAdd = async (noteId, code, d1, d2, d3, time, days, totalAmount, unit, bottleCount) => {
    if (!selectedType) {
      alert("Please select a medicine type.");
      return;
    }
    const backendType = getBackendType(unit, selectedType);
    const actualCode = code.split(" - ")[0];

    const med = medicines.find(
      (m) =>
         m.code.trim().toLowerCase() === actualCode.trim().toLowerCase() &&
    m.type.trim().toLowerCase() === backendType.trim().toLowerCase()
    );

    if (!med) return alert(`Selected medicine (${actualCode} - ${backendType}) not found.`);

    const payload = backendType === "Kashaya" || backendType === "Grutha"
      ? { bottleCount: Number(bottleCount) }
      : { quantity: Number(totalAmount) };

    if ((payload.quantity && payload.quantity <= 0) || (payload.bottleCount && payload.bottleCount <= 0)) {
      return alert("Invalid quantity to deduct.");
    }
    try {
      await axios.put(`/api/medicines/${actualCode}/${backendType}/deduct`, payload);
      const newMedicine = {
        code: med.code,
        name: med.name,
        dose1: d1,
        dose2: d2,
        dose3: d3,
        time,
        days,
        totalAmount,
        unit,
        bottleCount,
        type: backendType,
        selectedType,
      };
      setDoctorNotes((prev) => prev.map((note) =>
        note.id === noteId ? { ...note, medicines: [...note.medicines, newMedicine] } : note
      ));
    } catch (err) {
      console.error("Error deducting medicine:", err);
      alert(err?.response?.data?.error || "Failed to deduct medicine from inventory.");
    }
  };

  const handleSuggestionClick = (code) => {
    const matched = medicines.find((m) => `${m.code} - ${m.name}` === code);
    if (matched) {
      setShortForm(code);
      setUnit(getFrontendUnit(matched.type));
      setFullForm(matched.name);
      setSelectedType(matched.type); // ✅ important fix
    } else {
      setShortForm(code);
    }
    setShowSuggestions(false);
  };

  const updateDays = (value) => {
  setDays(value);
  const manualTypes = ["Thila", "Linements", "NaselDrop", "Powder", "Leha"];

  const total = (Number(dose1 || 0) + Number(dose2 || 0) + Number(dose3 || 0)) * Number(value || 0);

  if (!manualTypes.includes(selectedType)) {
    setTotalAmount(total > 0 ? total : "");
  }

  if (unit === "ml" && !manualTypes.includes(selectedType)) {
    const mlPerBottle = selectedType === "Grutha" ? 150 : selectedType === "Kashaya" ? 210 : 1;
    setBottleCount(Math.ceil(total / mlPerBottle));
  } else {
    setBottleCount("");
  }
};

  const toggleDropdown = (id) => {
    setOpenNoteId(openNoteId === id ? null : id);
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
            <p className="font-semibold text-green-700">
              Doctor's Note - {note.visitDate}
            </p>
            {note.daysSinceLastVisit !== null && (
              <p className="text-sm text-gray-600">
                Last visited {note.daysSinceLastVisit} day(s) ago
              </p>
            )}

            <button
              onClick={() => toggleDropdown(note.id)}
              className="text-green-700 text-xl font-bold hover:bg-green-100 w-8 h-8 rounded-full"
            >
              {openNoteId === note.id ? "−" : "+"}
            </button>
          </div>

          {openNoteId === note.id && (
            <div className="p-4 space-y-4">
              {["complaint", "diagnosis", "tests", "prescription"].map(
                (field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold mb-1 capitalize">
                      {field}
                    </label>
                    <textarea
                      value={note[field]}
                      onChange={(e) =>
                        handleChange(note.id, field, e.target.value)
                      }
                      className="w-full border rounded-md p-2 min-h-[100px]"
                      disabled={note.saved}
                    />
                  </div>
                )
              )}

              {!note.saved && (
                <AddInduviualPatientMedicine
  shortForm={shortForm}
  setShortForm={setShortForm}
  showSuggestions={showSuggestions}
  setShowSuggestions={setShowSuggestions}
  filteredMedicines={filteredMedicines}
  medicineMap={Object.fromEntries(
    medicines.map((m) => [m.code, m.name])
  )}
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
  setTotalAmount={setTotalAmount}
  bottleCount={bottleCount}
  doseTime={doseTime}
  setDoseTime={setDoseTime}
  selectedType={selectedType}
  setSelectedType={setSelectedType}
  handleAddMedicine={() => {
    if ( !totalAmount)
      return alert("Please enter valid doses and days.");
    handleMedicineAdd(
      note.id,
      shortForm.toUpperCase(),
      dose1,
      dose2,
      dose3,
      doseTime,
      days,
      totalAmount,
      unit,
      bottleCount
    );
    // Reset all fields after add
    setShortForm("");
    setDose1("");
    setDose2("");
    setDose3("");
    setDays("");
    setTotalAmount("");
    setUnit("No");
    setDoseTime("B/F");
    setBottleCount("");
    setFullForm("");
    setSelectedType("");
  }}
/>

              )}

              {fullForm && (
                <p className="text-sm text-gray-700 mt-1 ml-1">
                  <span className="font-semibold">Full Name:</span> {fullForm}
                </p>
              )}

              {note.medicines.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-sm">Prescribed Medicines</h4>
                  {note.medicines.map((med, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-6 bg-white p-3 rounded shadow-sm text-base border"
                    >
                      <div className="w-1/5 text-center">
                        <div className="text-xs text-gray-500">Medicine</div>
                        <div className="font-medium">{med.name}</div>
                      </div>
                      {!["Soap", "Paste", "Shampu"].includes(med.selectedType || med.type) && (
  <>
                      <div className="w-16 text-center">
                        <div className="text-xs text-gray-500">Morn</div>
                        <div>{med.dose1}</div>
                      </div>
                      <div className="w-16 text-center">
                        <div className="text-xs text-gray-500">Aft</div>
                        <div>{med.dose2}</div>
                      </div>
                      <div className="w-16 text-center">
                        <div className="text-xs text-gray-500">Eve</div>
                        <div>{med.dose3}</div>
                      </div>
                      </>
                      )}
                       {/* ✅ Only show Time if not in excluded types */}
    {!hideTimeTypes.includes(med.selectedType || med.type ) && (
      <div className="w-28 text-center">
        <div className="text-xs text-gray-500">Time</div>
        <div>
          {{
            "B/F": "Before Food",
            "A/F": "After Food",
            "I/B/F": "In Between Food",
          }[med.time] || med.time}
        </div>
      </div>
    )}
                      <div className="w-20 text-center">
                        <div className="text-xs text-gray-500">Days</div>
                        <div>{med.days}</div>
                      </div>
                      <div className="w-28 text-center">
                        <div className="text-xs text-gray-500">Total</div>
                        <div>
                          {med.totalAmount} {med.unit}
                        </div>
                      </div>
                      <div className="w-28 text-center">
                        <div className="text-xs text-gray-500">Bottle</div>
                        <div>
                          {med.unit === "ml" ? `${med.bottleCount} bottle` : "-"}
                        </div>
                      </div>
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
                    <p className="text-sm text-green-600 font-medium">
                      Saved ✅
                    </p>
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
  );
};

export default DoctorNotes;
