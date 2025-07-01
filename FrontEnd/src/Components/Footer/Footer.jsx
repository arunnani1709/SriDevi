// src/components/Footer/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Sri Devi Ayurveda Clinic. All rights reserved.</p>
        <p className="text-sm mt-2 md:mt-0">Contact: +91 89718 53788 | Email: shivunagaraj44@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
