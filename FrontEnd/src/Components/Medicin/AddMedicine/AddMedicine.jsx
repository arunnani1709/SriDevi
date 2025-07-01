import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import axios from 'axios';

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: '',
    code: '',
    quantity: '',
    type: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [medicinesList, setMedicinesList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false); // ✅ control suggestion list

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('/api/medicines');
      setMedicinesList(res.data || []);
    } catch (err) {
      console.error('Failed to fetch medicines:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'code' ? value.toUpperCase() : value;
    setMedicine((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSuggestionClick = (selectedMed) => {
    setMedicine((prev) => ({
      ...prev,
      name: selectedMed.name,
      code: selectedMed.code, // ✅ auto-fill code
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const { name, code, quantity, type } = medicine;

    if (!name.trim() || !code.trim() || !quantity.trim() || !type.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await axios.post('/api/medicines', {
        name: name.trim(),
        code: code.trim(),
        quantity: parseInt(quantity),
        type: type.trim(),
      });

      setMessage(res.data.message || 'Medicine saved successfully');
      setMedicine({ name: '', code: '', quantity: '', type: '' });
      fetchMedicines();
      setTimeout(() => setMessage(null), 1000);
    } catch (err) {
      console.error('Error saving medicine:', err);
      const errorMsg = err?.response?.data?.error || 'Failed to save medicine. Please try again.';
      setError(errorMsg);
    }
  };

  const filteredSuggestions = medicine.name
    ? medicinesList.filter((m) =>
        m.name.toLowerCase().includes(medicine.name.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />
        <div className="max-w-xl w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">
            Add / Update Medicine
          </h2>

          {message && (
            <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">
              ✅ {message}
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-700 bg-red-100 p-2 rounded">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <div className="relative">
              <input
  type="text"
  name="name"
  placeholder="Medicine Name"
  required
  value={medicine.name}
  onChange={(e) => {
    handleChange(e);
    setShowSuggestions(true);

    // ✅ Clear code if name is manually cleared
    if (e.target.value.trim() === '') {
      setMedicine((prev) => ({ ...prev, code: '' }));
    }
  }}
  className="w-full border rounded px-3 py-2"
/>


              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded max-h-40 overflow-y-auto shadow mt-1">
                  {filteredSuggestions.map((med, i) => (
                    <li
                      key={i}
                      onClick={() => handleSuggestionClick(med)}
                      className="px-3 py-1 hover:bg-green-100 cursor-pointer text-sm"
                    >
                      {med.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="text"
              name="code"
              placeholder="Medicine Code"
              required
              value={medicine.code}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            <select
              name="type"
              required
              value={medicine.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Medicine Type</option>
              <option value="Tablet">Tablet</option>
              <option value="Kashaya">Kashaya</option>
              <option value="Grutha">Grutha(Thuppa)</option>
              <option value="Thila">Thila(OIL)</option>
              <option value="Leha">Leha</option>
              <option value="Linements">Linements(Ayntment)</option>
              <option value="Powder">Powder</option>
              <option value="NaselDrop">NaselDrop</option>
              <option value="Capsule">Capsule</option>
              <option value="Soap">Soap</option>
              <option value="Paste">Paste</option>
              <option value="Shampu">Shampu</option>
            </select>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Quantity {medicine.type === 'Powder' && '(in grams)'}
              </label>
              <input
                type="number"
                name="quantity"
                placeholder={
                  medicine.type === 'Powder'
                    ? 'Enter quantity in grams'
                    : 'Quantity to Add'
                }
                required
                min="1"
                value={medicine.quantity}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save Medicine
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;
