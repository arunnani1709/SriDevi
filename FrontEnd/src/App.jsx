// src/App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './output.css'
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import AddPatient from './Components/Patent/AddPatient/AddPatient'; // ✅ Correct
import PatientList from './Components/Patent/PatientList/PatientList'; // ✅ Corrected
import PatientDetails from './Components/Patent/PatientDetails/PatientDetails'; // ✅ Corrected
import AddMedicine from './Components/Medicin/AddMedicine/AddMedicine';
import MedicineList from './Components/Medicin/MedicineList/MedicineList';
import AboutUs from './Components/AboutUs/AboutUs';
import Layout from './Components/Footer/Layout/Layout';
import Dashboard from './Components/Dashboard/Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={ <Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/add-patient" element={<AddPatient />} />
           <Route path="/patient-list" element={<PatientList />} />
           <Route path="/patients/:id" element={<PatientDetails />} />
           <Route path="/add-medicine" element={<AddMedicine />} />
           <Route path="/medicine-list" element={<MedicineList/>} />
            <Route path="/about-us" element={<AboutUs/>} />
           </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
