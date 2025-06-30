// src/App.jsx
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
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
import PrivateRoute from './Components/PrivateRouter';
import { syncAuthFromStorage } from './Components/Login/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// AuthSyncWrapper to load localStorage state
const AuthSyncWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncAuthFromStorage());
  }, [dispatch]);

  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthSyncWrapper>
          <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={ <Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/add-patient" element={<PrivateRoute><AddPatient /></PrivateRoute>} />
            <Route path="/patient-list" element={ <PrivateRoute><PatientList /></PrivateRoute>} />
            <Route path="/patients/:id" element={<PrivateRoute><PatientDetails /></PrivateRoute>} />
            <Route path="/add-medicine" element={<PrivateRoute><AddMedicine /></PrivateRoute>} />
            <Route path="/medicine-list" element={<PrivateRoute><MedicineList/></PrivateRoute>} />
              <Route path="/about-us" element={<PrivateRoute><AboutUs/></PrivateRoute>} />
            </Route>
          </Routes>
          <ToastContainer position="top-center" autoClose={2000} />
        </AuthSyncWrapper>
      </Router>
    </Provider>
  );
};

export default App;
