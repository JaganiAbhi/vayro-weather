import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-10 bg-gray-300 dark:bg-[#374151] rounded-lg w-48 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-[#374151] rounded w-32"></div>
      </div>

      {/* Current Weather Skeleton */}
      <div className="rounded-3xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 p-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-white/30 dark:bg-[#374151]/30 rounded-full mb-4"></div>
          <div className="h-20 bg-white/30 dark:bg-[#374151]/30 rounded w-48 mb-4"></div>
          <div className="h-6 bg-white/30 dark:bg-[#374151]/30 rounded w-32 mb-2"></div>
          <div className="h-4 bg-white/30 dark:bg-[#374151]/30 rounded w-40"></div>
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-gray-300 dark:bg-[#374151] rounded w-40 mb-4"></div>
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-24 bg-gray-300 dark:bg-[#374151] rounded-2xl p-4">
              <div className="h-4 bg-gray-400 dark:bg-[#374151] rounded w-12 mb-2"></div>
              <div className="h-12 w-12 bg-gray-400 dark:bg-[#374151] rounded-full mx-auto mb-2"></div>
              <div className="h-5 bg-gray-400 dark:bg-[#374151] rounded w-8"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Forecast Skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40 mb-4"></div>
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`flex items-center justify-between py-3 ${
              i !== 6 ? 'border-b border-gray-200 dark:border-[#374151]' : ''
            }`}>
              <div className="h-4 bg-gray-300 dark:bg-[#374151] rounded w-24"></div>
              <div className="h-8 w-8 bg-gray-300 dark:bg-[#374151] rounded-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-[#374151] rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Details Skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-gray-300 dark:bg-[#374151] rounded w-40 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-300 dark:bg-[#374151] rounded-2xl p-4">
              <div className="h-6 w-6 bg-gray-400 dark:bg-[#374151] rounded mx-auto mb-2"></div>
              <div className="h-3 bg-gray-400 dark:bg-[#374151] rounded w-16 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-400 dark:bg-[#374151] rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

