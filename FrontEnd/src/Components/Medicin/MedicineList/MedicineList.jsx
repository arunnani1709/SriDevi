import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';
import axios from 'axios';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get('/api/medicines');
        setMedicines(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load medicines.');
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />
        <div className="flex-1 px-10 py-10">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Medicine List</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden border">
            <table className="w-full text-sm text-left">
              <thead className="bg-green-100 text-green-800 text-base">
                <tr>
                  <th className="px-6 py-4 border-b">#</th>
                  <th className="px-6 py-4 border-b">Name</th>
                  <th className="px-6 py-4 border-b">Code</th>
                  <th className="px-6 py-4 border-b">Quantity</th>
                  <th className="px-6 py-4 border-b">Type</th> {/* New column */}
                </tr>
              </thead>
              <tbody>
                {medicines.length > 0 ? (
                  medicines.map((med, idx) => (
                    <tr key={idx} className="border-b hover:bg-green-50">
                      <td className="px-6 py-3">{idx + 1}</td>
                      <td className="px-6 py-3">{med.name}</td>
                      <td className="px-6 py-3">{med.code}</td>
                      <td className="px-6 py-3">{med.quantity}</td>
                      <td className="px-6 py-3">{med.type || "N/A"}</td> {/* Safely display type */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No medicines available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
