document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const weatherInfo = document.getElementById('weather-info');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8eaa52d58bb955b72cc8e5112a4fc784&units=metric`);
        if (!response.ok) {
            throw new Error(`City not found!`);
        }

        const data = await response.json();
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        document.getElementById('weather-icon').src = icon;
        document.getElementById('weather-description').innerText = `Weather: ${weatherDescription}`;
        document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
        document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
        document.getElementById('wind-speed').innerText = `Wind Speed: ${windSpeed} m/s`;
        document.getElementById('error-message').innerText = '';

        weatherInfo.classList.add('active'); // Make weather info visible
    } catch (error) {
        document.getElementById('error-message').innerText = error.message;
        weatherInfo.classList.remove('active');
    }
});
