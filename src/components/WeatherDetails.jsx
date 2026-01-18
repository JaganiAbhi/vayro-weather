import React from 'react';

const WeatherDetails = ({ weather, units }) => {
  if (!weather) return null;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const details = [
    {
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      label: 'Wind Speed',
      value: `${Math.round(weather.wind.speed)} ${units === 'metric' ? 'm/s' : 'mph'}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: 'Visibility',
      value: weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      label: 'Sunrise',
      value: formatTime(weather.sys.sunrise),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      label: 'Sunset',
      value: formatTime(weather.sys.sunset),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Weather Details
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {details.map((detail, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1F2937] rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-blue-500 dark:text-blue-400 mb-2">
                {detail.icon}
              </div>
              <p className="text-xs text-gray-500 dark:text-[#9CA3AF] mb-1">
                {detail.label}
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {detail.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;

