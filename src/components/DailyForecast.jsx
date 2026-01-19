import React from 'react';

const DailyForecast = ({ forecast, units }) => {
  if (!forecast || !forecast.list) return null;

  // Group forecast by day and get daily min/max
  const dailyData = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    const hour = date.getHours();

    if (!dailyData[dayKey]) {
      dailyData[dayKey] = {
        date: date,
        temps: [],
        weather: item.weather[0],
        icon: item.weather[0].icon,
        middayItem: null,
      };
    }
    dailyData[dayKey].temps.push(item.main.temp);
    dailyData[dayKey].temps.push(item.main.temp_min);
    dailyData[dayKey].temps.push(item.main.temp_max);

    // Use weather from midday (12:00 PM) for better representation
    if (hour >= 12 && hour < 15 && !dailyData[dayKey].middayItem) {
      dailyData[dayKey].middayItem = item;
      dailyData[dayKey].weather = item.weather[0];
      dailyData[dayKey].icon = item.weather[0].icon;
    }
  });

  // Get next 7 days, skip today if it's already passed
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Object.values(dailyData)
    .filter(day => {
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);
      return dayDate >= today;
    })
    .slice(0, 7);

  const formatDay = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        7-Day Forecast
      </h2>
      <div className="ios-glass rounded-2xl shadow-lg overflow-hidden">
        {days.map((day, index) => {
          const minTemp = Math.round(Math.min(...day.temps));
          const maxTemp = Math.round(Math.max(...day.temps));
          const dayKey = day.date.toDateString();

          return (
            <div
              key={dayKey}
              className={`flex items-center justify-between p-4 ${index !== days.length - 1
                ? 'border-b border-white/20 dark:border-white/10'
                : ''
                } hover:bg-white/10 transition-colors`}
            >
              <div className="flex items-center gap-4 flex-1">
                <p className="text-base font-medium text-white drop-shadow-md w-24">
                  {formatDay(day.date)}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.weather.description}
                  className="w-10 h-10 drop-shadow-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-white drop-shadow-md">
                  {maxTemp}°
                </span>
                <span className="text-base text-gray-200 drop-shadow-sm">
                  {minTemp}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;

