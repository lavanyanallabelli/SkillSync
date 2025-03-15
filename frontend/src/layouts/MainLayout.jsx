import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-xl font-bold text-gray-800">SkillSync</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SkillSync. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;