import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import axios from 'axios';

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({ name: '', code: '', quantity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/medicines', medicine);
      alert(res.data.message);
      setMedicine({ name: '', code: '', quantity: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to save medicine.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />
        <div className="max-w-xl w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">Add / Update Medicine</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Medicine Name" required value={medicine.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            <input type="text" name="code" placeholder="Medicine Code" required value={medicine.code} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            <input type="number" name="quantity" placeholder="Quantity to Add" required value={medicine.quantity} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Save Medicine</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;
