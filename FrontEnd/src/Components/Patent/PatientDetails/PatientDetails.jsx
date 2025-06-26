import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import DoctorNotes from "../DoctorNotes/DoctorNotes";

const PatientDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const patient = state?.patient;

  if (!patient) {
    return (
      <div className="p-8 text-center text-red-600">
        Patient data not found. Please go back to the list.
        <br />
        <button
          onClick={() => navigate("/patients")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />
        <div className="p-8 mx-auto w-full max-w-[1100px]">
          <div className="bg-white rounded shadow p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
              Patient Details
            </h2>
            <div className="overflow-x-auto border rounded-md mb-6">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-green-100 text-green-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Clinic ID</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Age</th>
                    <th className="px-4 py-3 font-semibold">Sex</th>
                    <th className="px-4 py-3 font-semibold">Place</th>
                    <th className="px-4 py-3 font-semibold">Visit Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">{patient.clinicId}</td>
                    <td className="px-4 py-2">{patient.name}</td>
                    <td className="px-4 py-2">{patient.phone}</td>
                    <td className="px-4 py-2">{patient.age}</td>
                    <td className="px-4 py-2">{patient.sex}</td>
                    <td className="px-4 py-2">{patient.address}</td>
                    <td className="px-4 py-2">{patient.visitDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 mr-4"
              >
                Back
              </button>
            </div>
          </div>

          {/* 👇 Doctor Notes appears below Patient Info */}
          <DoctorNotes clinicId={patient.clinicId} />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
