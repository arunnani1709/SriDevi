import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

const lowStockThresholds = {
  Tablet: 100,
  Kashya: 5,
  Grutha: 2,
  Thila: 2,
  Leha: 2,
  Capsule: 40,
  Linements: 5,
  Powder: 100,
  Naseldrop: 5,
  Soap: 5,
  Paste: 2,
  Shampu: 5,
};

// Units mapping for display
const unitLabels = {
  Tablet: 'No',
  Powder: 'grams',
  Kashya: 'No',
  Grutha: 'No',
  Thila: 'No',
  Leha: 'No',
  Capsule: 'No',
  Linements: 'No',
  Naseldrop: 'No',
  Soap: 'No',
  Paste: 'No',
  Shampu: 'No',
};

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // all | low | out

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get('/api/medicines');
        setMedicines(res.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = medicines
      .filter((med) => {
        const matchesSearch =
          med.name.toLowerCase().startsWith(lowerSearch) ||
          med.code.toLowerCase().startsWith(lowerSearch);

        const threshold = lowStockThresholds[med.type];
        const isLow = threshold ? med.quantity < threshold && med.quantity > 0 : false;
        const isOut = med.quantity === 0;

        if (activeFilter === 'low') return matchesSearch && isLow;
        if (activeFilter === 'out') return matchesSearch && isOut;
        return matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    setFilteredMedicines(filtered);
  }, [search, medicines, activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const getHeading = () => {
    switch (activeFilter) {
      case 'low':
        return 'Getting Out of Stock';
      case 'out':
        return 'Out of Stock';
      default:
        return 'All Medicines';
    }
  };

  const getRowClass = (med) => {
    const threshold = lowStockThresholds[med.type];
    if (med.quantity === 0) return 'bg-red-100';
    if (threshold && med.quantity < threshold) return 'bg-yellow-100';
    return 'hover:bg-green-50';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />
        <div className="flex-1 px-10 py-10">
          <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
            {getHeading()}
          </h2>

          {/* Search Input */}
          <div className="mb-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by starting letters (name/code)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded ${
                activeFilter === 'all'
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-green-500 text-green-700'
              }`}
            >
              All Medicines
            </button>
            <button
              onClick={() => handleFilterChange('low')}
              className={`px-4 py-2 rounded ${
                activeFilter === 'low'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white border border-yellow-400 text-yellow-600'
              }`}
            >
              Getting Out of Stock
            </button>
            <button
              onClick={() => handleFilterChange('out')}
              className={`px-4 py-2 rounded ${
                activeFilter === 'out'
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-red-500 text-red-600'
              }`}
            >
              Out of Stock
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden border">
            <table className="w-full text-sm text-left">
              <thead className="bg-green-100 text-green-800 text-base">
                <tr>
                  <th className="px-6 py-4 border-b">#</th>
                  <th className="px-6 py-4 border-b">Name</th>
                  <th className="px-6 py-4 border-b">Code</th>
                  <th className="px-6 py-4 border-b">Quantity</th>
                  <th className="px-6 py-4 border-b">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((med, index) => (
                    <tr key={med.id || med.code} className={`border-b ${getRowClass(med)}`}>
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{med.name}</td>
                      <td className="px-6 py-3">{med.code}</td>
                      <td className="px-6 py-3">
                        {med.quantity} {unitLabels[med.type] || 'units'}
                      </td>
                      <td className="px-6 py-3">{med.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No medicines found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
