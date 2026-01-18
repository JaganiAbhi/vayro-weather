import React from 'react';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {message || 'Something went wrong'}
      </h3>
      <p className="text-gray-600 dark:text-[#9CA3AF] mb-6 max-w-md">
        {message === 'City not found' 
          ? 'We couldn\'t find the city you\'re looking for. Please try another search.'
          : 'Please check your connection and try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;

