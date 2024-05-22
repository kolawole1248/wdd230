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
