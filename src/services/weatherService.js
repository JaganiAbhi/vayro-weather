import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeather = (city, units = "metric") => {
    return axios.get(BASE_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: units,
        },
    });
};

export const getWeatherByCoords = (lat, lon, units = "metric") => {
    return axios.get(BASE_URL, {
        params: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: units,
        },
    });
};

export const getForecast = (city, units = "metric") => {
    return axios.get(FORECAST_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: units,
        },
    });
};

export const getForecastByCoords = (lat, lon, units = "metric") => {
    return axios.get(FORECAST_URL, {
        params: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: units,
        },
    });
};
