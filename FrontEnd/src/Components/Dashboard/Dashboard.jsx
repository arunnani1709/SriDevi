import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import ClinicImg1 from "../../Photos/Home1.jpg";
import ClinicImg2 from "../../Photos/Home2.jpg";
import ClinicImg3 from "../../Photos/Home3.jpg";
import BackPain from "../../Photos/backpain.jpg";
import Asthma from "../../Photos/astama.jpg";
import Cold from "../../Photos/cold.jpg";
import Cough from "../../Photos/cough.jpg";
import Knewpain from "../../Photos/knewpain.jpg";
import Diabites from "../../Photos/Diabites.jpg";
import Infertility from "../../Photos/Infertility.jpg";
import Neuromuscular from "../../Photos/Neuromuscular.jpg";
import Anorectal from "../../Photos/Anorectal.jpg"
import cancer from "../../Photos/Cancer.jpg"

const Dashboard = () => {
  const sliderImages = [ClinicImg1, ClinicImg2, ClinicImg3];
  const [currentImage, setCurrentImage] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col flex-1">
        {/* Top Image Slider */}
        <div className="relative h-64 overflow-hidden">
          {sliderImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className={`absolute w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                index === currentImage ? "top-0 opacity-100" : "-top-full opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Main Section */}
        <div className="flex-1 px-6 py-10">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-6">
            {/* Left */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to Sri Devi Ayurveda Clinic
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Welcome to our Ayurveda Clinic – your destination for authentic Ayurvedic
                medicines and transformative Panchakarma procedures! We are dedicated to
                offering holistic solutions for a range of health concerns like Autism, Diabetes,
                Knee pain, Asthma, Cold, Cough, Menstrual problems, and Infertility.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 border-t-4 border-green-500 bg-white shadow-md text-center">
                  <p className="text-3xl font-bold text-purple-700">100%</p>
                  <p className="text-sm mt-2">Satisfied Treatments</p>
                </div>
                <div className="p-4 border-t-4 border-green-500 bg-white shadow-md text-center">
                  <p className="text-3xl font-bold text-purple-700">100%</p>
                  <p className="text-sm mt-2">Ayurvedic Medicines</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="lg:w-1/2 flex flex-col md:flex-row gap-4 justify-center items-center">
              <img
                src={ClinicImg1}
                alt="Ayurveda"
                className="w-60 h-60 object-cover rounded-md shadow-lg"
              />
              <img
                src={ClinicImg2}
                alt="Treatment"
                className="w-60 h-60 object-cover rounded-md shadow-lg"
              />
            </div>
          </div>

          {/* Treatments We Provide */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Treatments We Provide
            </h3>

            <div className="w-full flex justify-center overflow-hidden">
              <div className="w-[100%] max-w-6xl overflow-hidden">
                <div className="flex animate-slide gap-6">
                  {[
                    { src: BackPain, title: "Back Pain" },
                    { src: Asthma, title: "Asthma" },
                    { src: Cold, title: "Cold" },
                    { src: Cough, title: "Cough" },
                    { src: Knewpain, title: "Knee Pain" },
                    { src: Diabites, title: "Diabetes" },
                    { src: Infertility, title: "Infertility" },
                    { src: Neuromuscular, title: "Neuromuscular" },
                    { src: Anorectal, title: "Anorectal" },
                    { src: cancer, title: "Cancer" }
                  ].map(({ src, title }, index) => (
                    <div
                      key={index}
                      className="relative w-52 h-72 flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
                    >
                      <img
                        src={src}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 w-full bg-green-800 bg-opacity-80 text-white text-center py-2 text-sm font-semibold">
                        {title}
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
