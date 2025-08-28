import React from 'react';
import PropTypes from 'prop-types';

const Stats = ({ total, active, completed, completionRate }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      <div className="text-center">
        <span className="block text-2xl font-bold">{total}</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">Total</span>
      </div>
      <div className="text-center">
        <span className="block text-2xl font-bold text-blue-500">{active}</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">Active</span>
      </div>
      <div className="text-center">
        <span className="block text-2xl font-bold text-green-500">{completed}</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">Completed</span>
      </div>
      <div className="text-center">
        <span className="block text-2xl font-bold text-purple-500">{completionRate}%</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">Rate</span>
      </div>
    </div>
  );
};

Stats.propTypes = {
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  completionRate: PropTypes.number.isRequired
};

export default Stats;