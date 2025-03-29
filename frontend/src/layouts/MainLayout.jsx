// src/layouts/MainLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow relative">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              SkillSync
            </Link>
            <div className="ml-6">
              <Navigation />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/notifications"
              className="text-gray-600 hover:text-gray-800"
              title="Notifications"
            >
              🔔
            </Link>
            <Link
              to="/logout"
              className="bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SkillSync. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;

// import React from 'react';

// const MainLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-4 px-6">
//           <h1 className="text-xl font-bold text-gray-800">SkillSync</h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="py-6 px-4 sm:px-6 lg:px-8">
//         {children}
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t mt-8 py-4 text-center text-gray-500 text-sm">
//         © {new Date().getFullYear()} SkillSync. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default MainLayout;
