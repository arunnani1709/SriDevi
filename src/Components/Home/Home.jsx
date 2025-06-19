import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import ClinicLogo from "../../Photos/Clinic.jpg";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 bg-gray-50">
        <Sidebar />

        {/* Center Logo */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={ClinicLogo}
            alt="Clinic Logo"
            className="w-96 h-auto opacity-10 select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
