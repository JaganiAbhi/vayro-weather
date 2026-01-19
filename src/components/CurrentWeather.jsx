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
    <div className="flex flex-col items-center justify-center p-6 text-white drop-shadow-md w-full">
      <div className="ios-glass w-full max-w-md min-h-[500px] flex flex-col items-center justify-center rounded-3xl shadow-lg p-8 transform transition-all hover:scale-105 duration-500 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
        <div className="flex flex-col items-center text-center z-10">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt={description}
            className="w-32 h-32 md:w-48 md:h-48 mb-2 drop-shadow-lg filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
          <div className="mb-2">
            <span className="text-8xl md:text-9xl font-extrabold tracking-tight drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              {temp}°
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-medium mb-6 capitalize tracking-wide drop-shadow-md text-blue-50 dark:text-blue-100">
            {description}
          </p>
          <div className="flex items-center justify-center gap-8 text-xl md:text-2xl font-medium drop-shadow-md">
            <span className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest opacity-70 mb-1">High</span>
              {maxTemp}°
            </span>
            <div className="w-px h-8 bg-white/30"></div>
            <span className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest opacity-70 mb-1">Low</span>
              {minTemp}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

