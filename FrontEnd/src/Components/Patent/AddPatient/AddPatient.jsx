// AddPatient.jsx (React Frontend with working Backend API integration)

import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    sex: "",
    address: "",
    visitDate: "",
    clinicId: "",
  });

  const [success, setSuccess] = useState(false);

  // Generate Clinic ID from current patient count
  useEffect(() => {
    const generateClinicId = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/patients");
        const data = await res.json();
        const count = data.length + 1;
        const newId = `SDC${String(count).padStart(4, "0")}`;
        setFormData((prev) => ({ ...prev, clinicId: newId }));
      } catch (err) {
        console.error("Failed to fetch patients:", err);
        setFormData((prev) => ({ ...prev, clinicId: "SDC0001" }));
      }
    };

    generateClinicId();
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!formData.sex) {
    alert("Please select the patient's sex.");
    return;
  }
    try {
      const response = await fetch("http://localhost:3001/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          age: "",
          sex: "",
          address: "",
          visitDate: "",
          clinicId: "",
        });
         setTimeout(() => {
        setSuccess(false);
      }, 2000);
      } else {
        alert("Failed to add patient.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />

        <div className="flex-1 flex justify-center items-start p-8">
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-green-800">
              Add New Patient
            </h2>

            {success && (
              <div className="mb-4 text-green-600 font-medium">
                ✅ Patient added successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  required
                  pattern="[0-9]{10}"
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    required
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                  <div className="flex items-center gap-4 mt-2">
                    {['Male', 'Female', 'Other'].map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="sex"
                          value={option}
                          checked={formData.sex === option}
                          onChange={handleChange}
                          className="text-green-600 focus:ring-green-500"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Place
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  required
                  onChange={handleChange}
                  rows="1"
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Visit Date
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Clinic Patient ID
                </label>
                <input
                  type="text"
                  name="clinicId"
                  value={formData.clinicId}
                  readOnly
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition"
              >
                Add Patient
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
