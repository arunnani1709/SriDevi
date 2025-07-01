// src/components/Layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet /> {/* All your pages will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
