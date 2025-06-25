import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: '',
    code: '',
    quantity: '',
    type: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [dummyMedicines, setDummyMedicines] = useState([]); // local "DB"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const name = medicine.name.trim();
    const code = medicine.code.trim();
    const quantity = medicine.quantity.trim();
    const type = medicine.type.trim();

    if (!name || !code || !quantity || !type) {
      setError('All fields are required');
      return;
    }

    // Check if medicine with same name, code, and type exists
    const index = dummyMedicines.findIndex(
      (m) =>
        m.name.toLowerCase() === name.toLowerCase() &&
        m.code.toLowerCase() === code.toLowerCase() &&
        m.type === type
    );

    if (index !== -1) {
      // Update quantity
      const updatedMedicines = [...dummyMedicines];
      updatedMedicines[index].quantity += parseInt(quantity);
      setDummyMedicines(updatedMedicines);
      setMessage(`Quantity updated for "${name}"`);
    } else {
      // Add new
      const newMedicine = {
        name,
        code,
        quantity: parseInt(quantity),
        type,
      };
      setDummyMedicines([...dummyMedicines, newMedicine]);
      setMessage('Medicine saved successfully');
    }

    setMedicine({ name: '', code: '', quantity: '', type: '' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />
        <div className="max-w-xl w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">
            Add / Update Medicine (Demo Mode)
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Medicine Name"
              required
              value={medicine.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="code"
              placeholder="Medicine Code"
              required
              value={medicine.code}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity to Add"
              required
              min="1"
              value={medicine.quantity}
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
              <option value="Kashya">Kashya</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save Medicine
            </button>
          </form>

          {/* Show dummy table */}
          {dummyMedicines.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-2">Saved Medicines</h3>
              <table className="w-full border text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Code</th>
                    <th className="border px-2 py-1">Quantity</th>
                    <th className="border px-2 py-1">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyMedicines.map((m, idx) => (
                    <tr key={idx}>
                      <td className="border px-2 py-1">{m.name}</td>
                      <td className="border px-2 py-1">{m.code}</td>
                      <td className="border px-2 py-1">{m.quantity}</td>
                      <td className="border px-2 py-1">{m.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;
