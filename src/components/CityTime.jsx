import React, { useState, useEffect } from 'react';

const CityTime = ({ timezone, sunrise, sunset }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Update immediately to avoid delay
        setTime(new Date());

        // Update time every second to align perfectly with minutes, 
        // though we only display minutes. This ensures the change happens exactly on the minute.
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [timezone]); // Reset if timezone changes

    // Helper to format time with AM/PM
    const formatCityTime = (date, timezoneOffset) => {
        // Get UTC time in milliseconds
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);

        // Create new date object for the city's time
        const cityDate = new Date(utc + (timezoneOffset * 1000));

        return {
            hours: cityDate.getHours(),
            minutes: cityDate.getMinutes(),
            day: cityDate.getDay(),
            date: cityDate.getDate(),
            fullDate: cityDate
        };
    };

    // Calculate relative day (Today/Tomorrow/Yesterday)
    const getRelativeDay = (cityDate) => {
        const userNow = new Date();

        // Reset hours to compare just the calendar days
        const userToday = new Date(userNow.getFullYear(), userNow.getMonth(), userNow.getDate());
        const cityDay = new Date(cityDate.getFullYear(), cityDate.getMonth(), cityDate.getDate());

        const diffTime = cityDay.getTime() - userToday.getTime();
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";
        if (diffDays === -1) return "Yesterday";

        // Fallback for extreme cases or if logic misses
        return cityDay.toLocaleDateString(undefined, { weekday: 'short' });
    };

    const cityTimeData = formatCityTime(time, timezone);
    const { hours, minutes, fullDate } = cityTimeData;

    // Determine AM/PM and 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Strict Day/Night Logic based on API sunrise/sunset
    // We need current city time timestamp to compare with sunrise/sunset (which are UTC timestamps usually, but API returns unix timestamp)
    // The 'timezone' offset applies to the visual clock.
    // For sunrise/sunset comparisons, we need to compare the absolute UTC timestamps ideally, 
    // OR shift everything to the same reference. 
    // API 'dt', 'sunrise', 'sunset' are usually UNIX UTC timestamps.
    // Let's rely on standard comparison:
    const currentUnix = Math.floor(Date.now() / 1000); // Current UTC in seconds
    // But wait, the icons should match the *visual* time we see? 
    // Actually, simplest is: Is current UTC > sunrise and < sunset? 
    // BUT sunrise/sunset are for the specific day.
    // We'll trust the prop passed down or simple check if standard API values are passed.
    // Ideally, use the check logic from Weather.jsx if possible, or repeat it here.
    // Let's assume sunrise/sunset are valid Unix timestamps for the current day cycle of that city.

    // However, `sunrise` and `sunset` from standard OpenWeatherMap are for the *current* day cycle.
    // So comparing strictly current UTC timestamp works.
    const isDay = currentUnix >= sunrise && currentUnix < sunset;


    return (
        <div className="flex flex-col items-start font-medium text-white drop-shadow-md mt-1">
            <div className="flex items-center gap-3 text-2xl md:text-3xl font-light tracking-wide font-numeric">
                {/* Time Display with Subtle Animation */}
                <div className="flex items-baseline relative overflow-hidden">
                    <span className="tabular-nums">
                        {displayHours}:{displayMinutes}
                    </span>
                    <span className="text-base md:text-lg ml-1 opacity-80 uppercase">{ampm}</span>
                </div>

                {/* Day/Night Icon */}
                <div className="text-xl md:text-2xl animate-fade-in transition-all duration-700 ease-out flex items-center">
                    {isDay ? (
                        <span role="img" aria-label="Day" title="Daytime">☀️</span>
                    ) : (
                        <span role="img" aria-label="Night" title="Nighttime">🌙</span>
                    )}
                </div>
            </div>

            {/* Relative Day Label */}
            <div className="text-xs md:text-sm font-medium opacity-75 tracking-wider uppercase mt-0.5">
                {getRelativeDay(fullDate)}
            </div>
        </div>
    );
};

export default CityTime;
