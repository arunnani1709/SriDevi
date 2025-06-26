// AddMedicine.jsx
import React from "react";

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
  bottleCount,
  doseTime,
  setDoseTime,
  handleAddMedicine,
}) => {
  return (
    <div className="bg-gray-50 p-4 border rounded">
      <h4 className="font-medium text-sm mb-3">Add Medicine</h4>
      <div className="flex flex-wrap gap-3 items-center">
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

        <select
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
          }}
          className="border rounded p-2"
        >
          <option value="No">Tab</option>
          <option value="ml">Kashaya</option>
        </select>

        {[dose1, dose2, dose3].map((dose, idx) => (
          <input
            key={idx}
            type="number"
            placeholder={`Dose ${idx + 1}${unit === "ml" ? " (ml)" : ""}`}
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

        <input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => updateDays(e.target.value)}
          className="border rounded p-2 w-[70px]"
        />

        <div className="flex items-center gap-2">
  <input
    type="text"
    value={`${totalAmount}`}
    readOnly
    className="border rounded p-2 w-[100px] bg-gray-100"
  />
  <span className="text-sm text-gray-600">
    {unit === "ml" ? "ml" : "Tab"}
  </span>
</div>

        {unit === "ml" && (
          <input
            type="text"
            value={`${bottleCount} bottle${bottleCount > 1 ? "s" : ""}`}
            readOnly
            className="border rounded p-2 w-[100px] bg-gray-100"
          />
        )}

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
