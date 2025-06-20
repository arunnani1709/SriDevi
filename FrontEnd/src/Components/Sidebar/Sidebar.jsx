import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp, UserPlus, Home, Pill } from 'lucide-react';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const baseLink =
    'block pl-10 pr-4 py-2 rounded-md transition duration-200 text-sm font-medium';
  const linkStyle =
    'text-green-800 hover:bg-green-100 hover:text-green-700';
  const activeStyle =
    'bg-green-100 text-green-800 shadow font-semibold';

  return (
    <div
      className="min-h-screen bg-[#f0fdf4] p-6 shadow-md flex flex-col"
      style={{ width: '300px' }}
    >
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center tracking-wide">
        Doctor Portal
      </h2>

      {/* Home Link */}
      <div className="bg-white/80 backdrop-blur rounded-xl p-2 mb-4 shadow-inner">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-md font-medium transition ${
              isActive
                ? 'bg-green-100 text-green-800 shadow'
                : 'text-green-800 hover:bg-green-100 hover:text-green-700'
            }`
          }
        >
          <Home size={18} />
          Home
        </NavLink>
      </div>

      {/* Patients Dropdown */}
      <div className="bg-white/80 backdrop-blur rounded-xl p-2 space-y-2 shadow-inner">
        <button
          onClick={() => toggleDropdown('patients')}
          className="flex items-center justify-between w-full px-4 py-3 text-green-900 font-medium rounded-md hover:bg-green-100 transition"
        >
          <span className="flex items-center gap-2">
            <UserPlus size={18} />
            Patients
          </span>
          {openDropdown === 'patients' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openDropdown === 'patients' && (
          <div className="pt-1 space-y-1">
            <NavLink
              to="/add-patient"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyle : linkStyle}`
              }
            >
              Add Patient
            </NavLink>
            <NavLink
              to="/patient-list"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyle : linkStyle}`
              }
            >
              Patient List
            </NavLink>
          </div>
        )}
      </div>

      {/* Medicine Dropdown */}
      <div className="bg-white/80 backdrop-blur rounded-xl p-2 space-y-2 shadow-inner mt-4">
        <button
          onClick={() => toggleDropdown('medicine')}
          className="flex items-center justify-between w-full px-4 py-3 text-green-900 font-medium rounded-md hover:bg-green-100 transition"
        >
          <span className="flex items-center gap-2">
            <Pill size={18} />
            Medicine
          </span>
          {openDropdown === 'medicine' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openDropdown === 'medicine' && (
          <div className="pt-1 space-y-1">
            <NavLink
              to="/add-medicine"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyle : linkStyle}`
              }
            >
              Add Medicine
            </NavLink>
            <NavLink
              to="/medicine-list"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyle : linkStyle}`
              }
            >
              Medicine List
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
