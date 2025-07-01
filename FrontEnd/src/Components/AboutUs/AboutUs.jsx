import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Doctor1 from '../../Photos/Shivu.jpg';
import Doctor2 from '../../Photos/Adi.jpg';

const doctorData = [
  {
    id: 1,
    name: 'Dr. Shivakumar.N',
    degree: 'BAMS, MD (Ayu-Panchakarma)',
    working: 'Consultant Physician and Assistant Professor, Dept. of Panchakarma, Amrutha Ayurvedic Medical College & Hospital',
    specialization:
      'Expert in all therapies and treating various diseases effectively through Ayurvedic medicine and Panchakarma.',
    image: Doctor1,
  },
  {
    id: 2,
    name: 'Dr. Adivishwanatha Gupta C B',
    degree: 'B.A.M.S, M.S, F.MAS, D.MAS,(PhD)',
    working: ' Consultant Physician and Assistant Professor, Dept. of shalya Laparoscopic and General Surgeon (Shalya Tantra), Amrutha Ayurvedic Medical College & Hospital',
    specialization:'Comparative study of Ropana Ghrita Vikeshika and Jatyadi Ghrita Vikeshika in Dushta Vrana. ACHIEVEMENTS: SDM AGNIVESHA - Best Student Award (2023), Runner-up in National Photography Competition by R.A.Y.M (2017)',
    image: Doctor2,
  },
];

const AboutUs = () => {
  const [expandedDoctorId, setExpandedDoctorId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedDoctorId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50">
        <Sidebar />

        <div className="min-h-screen flex-1 bg-green-50 p-6">
          <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
              About Us
            </h1>

            <p className="text-gray-700 leading-relaxed mb-6 text-center">
              Welcome to <strong>Sri Devi Ayurveda Clinic</strong>. We specialize in authentic Ayurvedic treatment with experienced doctors, natural remedies, and personalized care for chronic diseases and overall well-being.
            </p>

            <h2 className="text-2xl font-semibold text-green-700 mb-6">Our Doctors</h2>

            <div className="flex flex-col gap-8">
              {doctorData.map((doc) => (
                <div
                  key={doc.id}
                  className="relative bg-white-100 rounded-lg shadow-md p-4 overflow-hidden"
                >
                  <div className="flex items-start gap-4 cursor-pointer" onClick={() => toggleExpand(doc.id)}>
                    <div className="relative w-52 h-52 flex-shrink-0">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover rounded"
                      />
                      <div
                        className={`absolute top-0 left-0 h-full w-[calc(100%+13rem)] bg-white px-4 py-3 transition-transform duration-500 ease-in-out z-10
                          ${expandedDoctorId === doc.id ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}
                        `}
                      >
                        <p className="text-gray-700 text-sm font-semibold">{doc.degree}</p>
                        {doc.working && (
                          <p className="text-gray-700 text-sm mt-1">
                            <strong>Working:</strong> {doc.working}
                          </p>
                        )}
                        <p className="text-gray-700 text-sm mt-1"><strong>Expert:</strong> {doc.specialization}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-green-800 leading-tight">
                        {doc.name.includes('Gupta C B') ? (
                          <>
                            Dr. Adivishwanatha<br />
                            Gupta C B
                          </>
                        ) : (
                          doc.name
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm italic mt-1">Know Me More</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-green-700 mt-12 mb-4">Panchakarma Treatments We Provide</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center text-sm text-gray-800">
              {[
                'virechana', 'Basti', 'Nasya', 'Agni Karma',
                'Abhyanga', 'Kati Basti','Tami Basti', 'Greera Basti','Sero Basti', 'Udvarthana', 'Jalukavacharana','Bashpasweda',
              ].map((treatment, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-200 p-3 rounded shadow"
                >
                  {treatment}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">Contact Us</h2>
              <p className="text-gray-700">📍 Doreswamy Complex, Opp Kiran Nursing Home, Huliyar Road, Hiriyur</p>
              <p className="text-gray-700">📞 +91-8971859788</p>
              <p className="text-gray-700">✉️ shivunagaraj44@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
