import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Fetch patients from backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/patients"); // Assumes backend is proxied or same origin
        const data = await response.json();
        setPatients(data);
        setFilteredPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = patients.filter(
      (p) =>
        p.name.toLowerCase().includes(value) ||
        p.clinicId.toLowerCase().includes(value) ||
        p.phone.includes(value)
    );
    setFilteredPatients(filtered);
  };

  const handleView = (patient) => {
    navigate(`/patients/${patient.clinicId}`, { state: { patient } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Patient List
          </h2>

          <input
            type="text"
            placeholder="Search by name, clinic ID or phone..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 mb-6"
          />

          {filteredPatients.length === 0 ? (
            <p className="text-gray-500">No patients found.</p>
          ) : (
            <div className="overflow-auto rounded-md shadow border bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-green-100 text-green-800">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Clinic ID
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">Address</th>
                    <th className="px-4 py-3 text-left font-semibold">Visit Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.clinicId}>
                      <td className="px-4 py-2">{patient.clinicId}</td>
                      <td className="px-4 py-2">{patient.name}</td>
                      <td className="px-4 py-2">{patient.phone}</td>
                      <td className="px-4 py-2">{patient.address}</td>
                      <td className="px-4 py-2">{patient.visitDate}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleView(patient)}
                          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          View
                        </button>
                      </td>
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

export default PatientList;
