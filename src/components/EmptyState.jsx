import React from 'react';

const EmptyState = ({ onSearchClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        Search for a City
      </h3>
      <p className="text-sm text-gray-500 dark:text-[#9CA3AF] italic mb-2">
        Weather, refined.
      </p>
      <p className="text-gray-600 dark:text-[#9CA3AF] mb-6 max-w-md">
        Enter a city name to see the current weather and forecast information.
      </p>
      {onSearchClick && (
        <button
          onClick={onSearchClick}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg"
        >
          Search City
        </button>
      )}
    </div>
  );
};

export default EmptyState;

