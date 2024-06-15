import React from 'react';

const WeatherIcons = ({ weather }) => {
  const { icon, text } = weather.current.condition;
  return (
    <div className="weather-icon">
      {/* Ensure the icon path is correct and use the alt attribute for accessibility */}
      <img src={`http:${icon}`} alt={text} />
    </div>
  );
};

export default WeatherIcons;
