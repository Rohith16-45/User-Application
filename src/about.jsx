import React from "react";
import { Info } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
          <Info className="text-blue-600" size={26} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">About This Application</h2>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Welcome to our User Management Dashboard — a simple and efficient platform 
        designed to help you manage users, update profiles, and maintain your 
        application data with ease. This system is built with a focus on 
        usability, speed, and clean UI experience.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        With this dashboard, you can create, edit, delete, and view users, update 
        your own profile, and navigate through different sections effortlessly. 
        The design is responsive and works smoothly across both desktop and mobile 
        devices.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Our goal is to provide a simple, modern, and intuitive interface that 
        allows you to focus on what matters — managing your data effectively.  
        More features and improvements will be added continuously to enhance your 
        experience.
      </p>

      <div className="mt-8 text-gray-700 text-sm border-t pt-4">
        © {new Date().getFullYear()} My Application. All rights reserved.
      </div>
    </div>
  );
};

export default About;
