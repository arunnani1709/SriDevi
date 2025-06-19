import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({ name: '', code: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medicine.name || !medicine.code) {
      alert('Please enter both name and code');
      return;
    }

    // 👉 Here you can send data to your backend or store in Redux etc.
    console.log('Medicine Added:', medicine);

    // Reset form
    setMedicine({ name: '', code: '' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />

        <div className="max-w-xl w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">Add Medicine</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Medicine Name
              </label>
              <input
                type="text"
                name="name"
                value={medicine.name}
                onChange={handleChange}
                placeholder="e.g., Paracetamol"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Medicine Code
              </label>
              <input
                type="text"
                name="code"
                value={medicine.code}
                onChange={handleChange}
                placeholder="e.g., MED001"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Add Medicine
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;
