// AddInduviualPatientMedicine.jsx
import React, { useState, useEffect } from "react";

const AddInduviualPatientMedicine = ({
  shortForm,
  setShortForm,
  showSuggestions,
  setShowSuggestions,
  filteredMedicines,
  medicineMap,
  handleSuggestionClick,
  unit,
  setUnit,
  dose1,
  setDose1,
  dose2,
  setDose2,
  dose3,
  setDose3,
  days,
  updateDays,
  totalAmount,
  setTotalAmount,
  bottleCount,
  doseTime,
  setDoseTime,
  handleAddMedicine,
  setSelectedType,
}) => {
  const [medicineType, setMedicineType] = useState("");

 const manualQuantityTypes = ["Thila", "Linements", "NaselDrop", "Soap", "Paste", "Shampu", "Powder", "Leha"];
const doseAllowedTypes = ["Thila", "Linements", "NaselDrop", "Powder", "Leha"];
const quantityBoxTypes = manualQuantityTypes;
const hideDoseInputs = !doseAllowedTypes.includes(medicineType) && manualQuantityTypes.includes(medicineType);


 useEffect(() => {
  switch (medicineType) {
    case "Kashaya":
    case "Grutha":
   setUnit("ml");
      break;
    case "Powder":
      setUnit("gr");
      break;
    default:
      setUnit("No");
  }
}, [medicineType, setUnit]);


  return (
    <div className="bg-gray-50 p-4 border rounded">
      <h4 className="font-medium text-sm mb-3">Add Medicine</h4>
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search input with suggestions */}
        <div className="relative w-[180px]">
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
              {filteredMedicines.map((code, index) => {
  const med = medicineMap[code]; // assuming { name, type } stored here
  return (
    <li
      key={`${code}-${med?.name}-${med?.type}-${index}`}
      onClick={() => handleSuggestionClick(code)}
      className="px-3 py-1 text-sm hover:bg-green-100 cursor-pointer"
    >
      {code} - {med?.name} ({med?.type})
    </li>
  );
})}

            </ul>
          )}
        </div>

        {/* Type dropdown */}
        <select
          value={medicineType}
          onChange={(e) => {
    setMedicineType(e.target.value);
    setSelectedType(e.target.value); // ✅ make sure this is included
  }}
          className="border rounded p-2"
        >
          <option value="">Select Medicine Type</option>
          <option value="Tablet">Tablet</option>
          <option value="Kashaya">Kashaya</option>
          <option value="Grutha">Grutha (Thuppa)</option>
          <option value="Thila">Thila (Oil)</option>
          <option value="Leha">Leha</option>
          <option value="Linements">Linements (Ointment)</option>
          <option value="Powder">Powder</option>
          <option value="NaselDrop">NaselDrop</option>
          <option value="Capsule">Capsule</option>
          <option value="Soap">Soap</option>
          <option value="Paste">Paste</option>
          <option value="Shampu">Shampu</option>
        </select>

        {/* Dose inputs */}
        {!hideDoseInputs && [dose1, dose2, dose3].map((dose, idx) => (
          <input
            key={idx}
            type="number"
            placeholder={`Dose ${idx + 1}${unit === "ml" ? " (ml)" : unit === "gr" ? " (spoon)" : ""}`}
            value={idx === 0 ? dose1 : idx === 1 ? dose2 : dose3}
            onChange={(e) =>
              idx === 0
                ? setDose1(e.target.value)
                : idx === 1
                ? setDose2(e.target.value)
                : setDose3(e.target.value)
            }
            className="border rounded p-2 w-[60px]"
          />
        ))}

        {/* Days input */}
          <input
            type="number"
            placeholder="Days"
            value={days}
            onChange={(e) => updateDays(e.target.value)}
            className="border rounded p-2 w-[70px]"
          />
    

        {/* Quantity input (manual input for some types) */}
        {quantityBoxTypes.includes(medicineType) ? (
          <input
            type="number"
            placeholder="Total Quantity"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="border rounded p-2 w-[100px]"
          />
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={`${totalAmount}`}
              readOnly
              className="border rounded p-2 w-[100px] bg-gray-100"
            />
            <span className="text-sm text-gray-600">
              {unit === "ml" ? "ml" : unit === "gr" }
            </span>
          </div>
        )}

        {/* Bottle count (for ml units only) */}
        {unit === "ml" && !hideDoseInputs && (
          <input
            type="text"
            value={`${bottleCount} bottle${bottleCount > 1 ? "s" : ""}`}
            readOnly
            className="border rounded p-2 w-[100px] bg-gray-100"
          />
        )}

        {/* Time dropdown */}
        <select
          value={doseTime}
          onChange={(e) => setDoseTime(e.target.value)}
          className="border rounded p-2"
        >
          <option value="B/F">B/F</option>
          <option value="I/B/F">I/B/F</option>
          <option value="A/F">A/F</option>
        </select>

        {/* Add button */}
        <button
          onClick={handleAddMedicine}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddInduviualPatientMedicine;
