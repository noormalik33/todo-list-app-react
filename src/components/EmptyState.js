import React from 'react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center py-12 text-gray-500 dark:text-gray-400">
      <span className="text-6xl mb-4" aria-hidden="true">📝</span>
      <h3 className="text-xl font-semibold mb-2">No todos yet</h3>
      <p className="text-center">Get started by adding your first todo above.<br />Stay organized and productive!</p>
    </div>
  );
};

export default EmptyState;