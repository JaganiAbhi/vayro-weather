import { useState, useEffect } from "react";
import { getWeather, getWeatherByCoords, getForecast, getForecastByCoords } from "../services/weatherService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Header from "./Header";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import WeatherDetails from "./WeatherDetails";
import SkeletonLoader from "./SkeletonLoader";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import SearchModal from "./SearchModal";
import AntiGravityBackground from "./AntiGravityBackground";

function Weather() {
    const [city, setCity] = useLocalStorage("lastCity", "");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [units, setUnits] = useState("metric");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        try {
            const stored = localStorage.getItem('darkMode');
            return stored ? JSON.parse(stored) : false;
        } catch {
            return false;
        }
    });

    // Calculate isDay based on API timestamps + timezone (User Strict Logic)
    const isDay = weather
        ? (() => {
            const dt = weather.dt;
            const sunrise = weather.sys.sunrise;
            const sunset = weather.sys.sunset;
            const timezone = weather.timezone;

            const adjustedTime = (dt + timezone) * 1000;
            const adjustedSunrise = (sunrise + timezone) * 1000;
            const adjustedSunset = (sunset + timezone) * 1000;

            console.log("Day/Night Debug:", { adjustedTime, adjustedSunrise, adjustedSunset });

            return adjustedTime >= adjustedSunrise && adjustedTime < adjustedSunset;
        })()
        : (new Date().getHours() >= 6 && new Date().getHours() < 18);

    // Sync Dark Mode with Day/Night state automatically
    useEffect(() => {
        setDarkMode(!isDay);
    }, [isDay]);

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Fetch weather on mount if city exists
    useEffect(() => {
        if (city) {
            fetchWeather();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Re-fetch when units change
    useEffect(() => {
        if (weather && weather.name) {
            handleFetch(weather.name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [units]);

    const handleFetch = async (queryCity) => {
        try {
            setLoading(true);
            setError("");
            setWeather(null);
            setForecast(null);

            const [weatherResponse, forecastResponse] = await Promise.all([
                getWeather(queryCity, units),
                getForecast(queryCity, units)
            ]);

            setWeather(weatherResponse.data);
            setForecast(forecastResponse.data);
            setCity(queryCity);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 404) {
                setError("City not found");
            } else if (err.response && err.response.status === 401) {
                setError("Invalid API Key");
            } else {
                setError("Something went wrong. Please try again.");
            }
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeather = () => {
        if (!city) return;
        handleFetch(city);
    };

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const [weatherResponse, forecastResponse] = await Promise.all([
                        getWeatherByCoords(latitude, longitude, units),
                        getForecastByCoords(latitude, longitude, units)
                    ]);
                    setWeather(weatherResponse.data);
                    setForecast(forecastResponse.data);
                    setCity(weatherResponse.data.name);
                    setError("");
                } catch (err) {
                    setError("Location access denied or error fetching data.");
                } finally {
                    setLoading(false);
                }
            }, () => {
                setError("Location permission denied.");
                setLoading(false);
            });
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    };

    const toggleUnits = () => {
        setUnits(prev => prev === "metric" ? "imperial" : "metric");
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const handleRetry = () => {
        if (city) {
            handleFetch(city);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
            {/* Anti-Gravity Background */}
            <AntiGravityBackground isDay={isDay} />

            {/* Content Layer */}
            <div className="relative z-10">
                <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
                    {/* Top Bar with Logo and Controls */}
                    <div className="flex items-center justify-between mb-6">
                        {/* VAYRO Logo */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-gray-800 dark:text-white mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0L14.25 15.3m-4.5 0l-1.402 1.402c-1.232 1.232-3.228 1.232-4.46 0s-1.232-3.228 0-4.46L5 14.5" />
                                </svg>
                                <span className="text-lg md:text-xl font-semibold tracking-wider text-gray-900 dark:text-white">
                                    VAYRO
                                </span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3">
                            {/* Unit Toggle */}
                            <button
                                onClick={toggleUnits}
                                className="px-4 py-2 rounded-xl bg-white dark:bg-[#1F2937] shadow-md hover:shadow-lg transition-shadow text-sm font-medium text-gray-700 dark:text-[#E5E7EB]"
                            >
                                {units === "metric" ? "°C" : "°F"}
                            </button>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full bg-white dark:bg-[#1F2937] shadow-md hover:shadow-lg transition-shadow"
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Header */}
                    <Header
                        city={weather?.name}
                        country={weather?.sys?.country}
                        timezone={weather?.timezone}
                        sunrise={weather?.sys?.sunrise}
                        sunset={weather?.sys?.sunset}
                        onSearchClick={() => setIsSearchOpen(true)}
                        onLocationClick={handleGeolocation}
                        loading={loading}
                    />

                    {/* Loading State */}
                    {loading && <SkeletonLoader />}

                    {/* Error State */}
                    {error && !loading && (
                        <ErrorState message={error} onRetry={handleRetry} />
                    )}

                    {/* Empty State */}
                    {!weather && !loading && !error && (
                        <EmptyState onSearchClick={() => setIsSearchOpen(true)} />
                    )}

                    {/* Weather Content */}
                    {weather && !loading && (
                        <>
                            <CurrentWeather weather={weather} units={units} />
                            <HourlyForecast forecast={forecast} units={units} />
                            <DailyForecast forecast={forecast} units={units} />
                            <WeatherDetails weather={weather} units={units} />
                        </>
                    )}

                    {/* Search Modal */}
                    <SearchModal
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)}
                        onSearch={(query) => {
                            setCity(query);
                            handleFetch(query);
                        }}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}

export default Weather;
