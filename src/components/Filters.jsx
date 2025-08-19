import React from 'react';
import PropTypes from 'prop-types';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

const Filters = ({ filter, onFilterChange, query, onQueryChange, onClearCompleted, hasCompleted }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
      <div className="flex space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <input
        type="search"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
        placeholder="Search todos or tags..."
        className="flex-1 md:flex-none w-full md:w-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />
      <button
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear Completed
      </button>
    </div>
  );
};

Filters.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  hasCompleted: PropTypes.bool.isRequired
};

export default Filters;