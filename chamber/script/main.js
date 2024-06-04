const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    updateYear();
    updateLastModified();
    handleMenuToggle();
    displayWeather();
    displaySpotlights();
    displayBanner();
});

// Update year in footer
function updateYear() {
    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}

// Update last modified date in footer
function updateLastModified() {
    const lastModifiedParagraph = document.getElementById("lastModified");
    lastModifiedParagraph.textContent = "Last modified: " + document.lastModified;
}

// Toggle navigation menu
function handleMenuToggle() {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

// Display weather information
async function displayWeather() {
    const apiKey = '2b5de9b438883849eae854aa42890fb7';
    const city = 'Osogbo';
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();
        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        // Current weather
        document.getElementById('city-name').textContent = weatherData.name;
        document.getElementById('current-date').textContent = new Date().toLocaleDateString();
        document.getElementById('temperature').textContent = `Temperature: ${weatherData.main.temp}°C`;
        document.getElementById('weather-condition').textContent = `Condition: ${weatherData.weather[0].description}`;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        document.getElementById('weather-icon').alt = weatherData.weather[0].description;

        // 3-day forecast
        const forecastContainer = document.getElementById('forecast');
        const forecastDays = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 3);
        forecastDays.forEach(day => {
            const forecastElement = document.createElement('div');
            forecastElement.className = 'forecast-day';
            forecastElement.innerHTML = `
                <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
                <p>Temperature: ${day.main.temp}°C</p>
                <p>Condition: ${day.weather[0].description}</p>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            `;
            forecastContainer.appendChild(forecastElement);
        });

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Display spotlight ads
function displaySpotlights() {
    const members = [
        { name: "Company Name 1", description: "Company 1 is a leader in the tech industry.", url: "https://www.company1.com", image: "images/company1.jpg", level: "gold" },
        { name: "Company Name 2", description: "Company 2 specializes in sustainable products.", url: "https://www.company2.com", image: "images/company2.jpg", level: "silver" },
        { name: "Company Name 3", description: "Company 3 offers top-notch financial services.", url: "https://www.company3.com", image: "images/company3.jpg", level: "bronze" },
        { name: "Company Name 4", description: "Company 4 provides excellent healthcare services.", url: "https://www.company4.com", image: "images/company4.jpg", level: "gold" },
        { name: "Company Name 5", description: "Company 5 delivers fast and reliable logistics.", url: "https://www.company5.com", image: "images/company5.jpg", level: "silver" }
    ];

    const qualifiedMembers = members.filter(member => member.level === 'gold' || member.level === 'silver');
    const spotlights = qualifiedMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    const spotlightContainer = document.querySelector('.spotlight-container');
    spotlightContainer.innerHTML = '';
    spotlights.forEach(member => {
        const spotlightElement = document.createElement('div');
        spotlightElement.className = 'spotlight';
        spotlightElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="spotlight-img">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <a href="${member.url}" target="_blank">Learn More</a>
        `;
        spotlightContainer.appendChild(spotlightElement);
    });
}

// Display banner
function displayBanner() {
    const banner = document.getElementById('banner');
    const closeBannerButton = document.getElementById('close-banner');
    const today = new Date().getDay();
    if (today >= 1 && today <= 3) {
        banner.style.display = 'block';
    }

    closeBannerButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}
