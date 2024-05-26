// Year and last modified date
const yearSpan = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = "Last modified: " + document.lastModified;

// Hamburger menu
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Dark mode toggle
const modeButton = document.querySelector("#mode");
const header = document.querySelector("header");

modeButton.addEventListener("click", () => {
    if (modeButton.textContent.includes("🕶️")) {
        header.style.background = "#000";
        header.style.color = "#fff";
        modeButton.textContent = "🔆";
    } else {
        header.style.background = "#eee";
        header.style.color = "#000";
        modeButton.textContent = "🕶️";
    }
});

// Visitor count
const visitsDisplay = document.querySelector(".visits");
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

if (numVisits !== 0) {
    visitsDisplay.textContent = numVisits;
} else {
    visitsDisplay.textContent = `This is your first visit. 🥳 Welcome!`;
}

numVisits++;
localStorage.setItem("numVisits-ls", numVisits);

// Fetching learning activity links
const baseURL = "https://kolawole1248.github.io/wdd230/";
const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        const data = await response.json();
        displayLinks(data.weeks);
    } catch (error) {
        console.error('Error fetching links data:', error);
    }
}

function displayLinks(weeks) {
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = '';

    weeks.forEach(week => {
        const weekSection = document.createElement('section');
        const weekHeader = document.createElement('h3');
        weekHeader.textContent = week.week;
        weekSection.appendChild(weekHeader);

        const linkList = document.createElement('ul');
        week.links.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = baseURL + link.url;
            anchor.textContent = link.title;
            listItem.appendChild(anchor);
            linkList.appendChild(listItem);
        });

        weekSection.appendChild(linkList);
        linksContainer.appendChild(weekSection);
    });
}

document.addEventListener('DOMContentLoaded', getLinks);

// Fetching weather data
const apiKey = '431f2861e18b991a98fe1f4b1c79402c';
const city = 'Osogbo';
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherURL);
        const data = await response.json();

        document.getElementById('temp-value').textContent = `${data.main.temp} °C`;
        document.getElementById('desc-value').textContent = data.weather[0].description;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.getElementById('weather-icon').alt = data.weather[0].description;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchWeather);
