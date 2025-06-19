import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Login/authSlice"; // Update path if needed

const logoUrl = "https://img.freepik.com/premium-vector/minimalist-logo-design-any-corporate-brand-business-company_1253202-77511.jpg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-green-700 px-6 py-3 flex justify-between items-center shadow-md relative">
      {/* Left: Logo, Clinic Name & Home */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <img src={logoUrl} alt="Clinic Logo" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-bold text-white">Sri Devi Ayurveda Clinic</span>
        </div>

        
      </div>

      {/* Right: User Info & Dropdown */}
      <div className="relative flex items-center space-x-4" ref={dropdownRef}>
        {user && (
          <>
            <span className="text-white font-semibold hidden sm:block">
              Dr. {user.name}
            </span>
            <div
              onClick={toggleDropdown}
              className="cursor-pointer bg-white text-green-700 font-bold rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
            >
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {showDropdown && (
              <div className="absolute top-12 right-0 w-48 bg-white border rounded shadow-lg z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold text-green-700">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
