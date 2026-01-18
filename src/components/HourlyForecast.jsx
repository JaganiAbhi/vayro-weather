import React from 'react';

const HourlyForecast = ({ forecast, units }) => {
  if (!forecast || !forecast.list) return null;

  // Get next 24 hours (8 items, 3-hour intervals)
  const hourlyData = forecast.list.slice(0, 8);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Hourly Forecast
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-24 bg-white dark:bg-[#1F2937] rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <p className="text-sm text-gray-600 dark:text-[#9CA3AF] mb-2">
              {index === 0 ? 'Now' : formatTime(item.dt)}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="w-12 h-12 mx-auto mb-2"
            />
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {Math.round(item.main.temp)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;

