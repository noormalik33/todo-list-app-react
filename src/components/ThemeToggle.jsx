import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`p-2 rounded-full text-white transition ${
        theme === 'light'
          ? 'bg-blue-400 hover:bg-blue-500'
          : 'bg-teal-600 hover:bg-teal-700'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;