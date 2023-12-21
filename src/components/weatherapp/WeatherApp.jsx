import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../assets/search.png";
import location_icon from "../assets/location.png";

import clearday_icon from "../assets/clearday.png";
import clearnight_icon from "../assets/clearnight.png";
import cloudyday_icon from "../assets/cloudyday.png";
import cloudynight_icon from "../assets/cloudynight.png";
import rainyday_icon from "../assets/rainyday.png";
import rainynight_icon from "../assets/rainynight.png";
import snowy_icon from "../assets/snowy.png";

import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

export const WeatherApp = () => {
  let api_key = "dd43b562d491a6145ad10b606a7ac157";

  const [wicon, setWicon] = useState(cloudyday_icon);
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lon: null,
  });

  const handleSearchClick = () => {
    const cityInput = document.querySelector(".cityInput").value;
    search(cityInput);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        search(null, position.coords);
      },
      (err) => console.log(err)
    );
  };

  const search = async (city = null, coords = null) => {
    let url;
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
    } else if (coords) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=Metric&appid=${api_key}`;
    } else {
      return;
    }

    const response = await fetch(url);
    const data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d") {
      setWicon(clearday_icon);
    } else if (data.weather[0].icon === "01n") {
      setWicon(clearnight_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "04d"
    ) {
      setWicon(cloudyday_icon);
    } else if (
      data.weather[0].icon === "02n" ||
      data.weather[0].icon === "03n" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(cloudynight_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "11d"
    ) {
      setWicon(rainyday_icon);
    } else if (
      data.weather[0].icon === "09n" ||
      data.weather[0].icon === "10n" ||
      data.weather[0].icon === "11n"
    ) {
      setWicon(rainynight_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snowy_icon);
    } else {
      setWicon(clearday_icon);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={handleSearchClick}>
          <img src={search_icon} alt="" />
        </div>
        <div className="location-icon" onClick={getLocation}>
          <img src={location_icon} alt="" />
        </div>
      </div>

      <div className="main-info">
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="temperature-location">
          <div className="weather-temp"></div>
          <div className="weather-location"></div>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent"></div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate"></div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
