import React from 'react';

const CurrentWeather = ({ weather, units }) => {
  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const minTemp = Math.round(weather.main.temp_min);
  const maxTemp = Math.round(weather.main.temp_max);
  const condition = weather.weather[0].main.toLowerCase();
  const description = weather.weather[0].description;
  const icon = weather.weather[0].icon;

  // Determine gradient based on weather condition
  const getGradient = () => {
    if (condition.includes('clear')) {
      return 'from-yellow-400 via-orange-400 to-yellow-500';
    } else if (condition.includes('cloud')) {
      return 'from-gray-300 via-blue-300 to-gray-400';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'from-blue-400 via-gray-500 to-blue-500';
    } else if (condition.includes('snow')) {
      return 'from-blue-200 via-gray-300 to-blue-300';
    } else if (condition.includes('thunderstorm')) {
      return 'from-gray-600 via-blue-600 to-gray-700';
    } else {
      return 'from-blue-300 via-blue-400 to-blue-500';
    }
  };

  // Check if it's night (icon ends with 'n')
  const isNight = icon.endsWith('n');
  const nightGradient = 'from-blue-800 via-indigo-900 to-blue-900';

  return (
    <div className={`rounded-3xl shadow-xl p-6 md:p-8 mb-6 bg-gradient-to-br ${
      isNight ? nightGradient : getGradient()
    } text-white`}>
      <div className="flex flex-col items-center text-center">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="w-32 h-32 md:w-40 md:h-40 mb-4 drop-shadow-lg"
        />
        <div className="mb-2">
          <span className="text-7xl md:text-8xl font-extrabold tracking-tight">
            {temp}°
          </span>
        </div>
        <p className="text-xl md:text-2xl font-semibold mb-4 capitalize">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
          <span className="opacity-90">Feels like {feelsLike}°</span>
          <span className="opacity-75">•</span>
          <span className="opacity-90">
            {minTemp}° / {maxTemp}°
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

