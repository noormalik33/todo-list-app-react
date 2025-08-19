import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-blue-700 text-white py-2 sm:py-3 shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 flex justify-center items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">Todo List App</h1>
      </div>
    </header>
  );
};

export default Header;