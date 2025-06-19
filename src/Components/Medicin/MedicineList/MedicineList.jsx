import React from 'react';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

const MedicineList = () => {
  const medicines = [
    { name: 'Paracetamol', code: 'PCM' },
    { name: 'Amoxicillin', code: 'AMX' },
    { name: 'Cetirizine', code: 'CPM' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />

        {/* Full-width container */}
        <div className="flex-1 w-full px-10 py-10">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Medicine List
          </h2>

          <div className="bg-white rounded-lg shadow overflow-hidden border">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-green-100 text-green-800 text-base">
                <tr>
                  <th className="px-6 py-4 border-b">#</th>
                  <th className="px-6 py-4 border-b">Medicine Name</th>
                  <th className="px-6 py-4 border-b">Code</th>
                </tr>
              </thead>
              <tbody>
                {medicines.length > 0 ? (
                  medicines.map((med, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-green-50 transition duration-150 border-b"
                    >
                      <td className="px-6 py-3">{idx + 1}</td>
                      <td className="px-6 py-3 font-medium">{med.name}</td>
                      <td className="px-6 py-3 text-gray-700">{med.code}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No medicines available.
                    </td>
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
