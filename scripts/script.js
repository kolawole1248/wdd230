const yearSpan = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;


const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = "Last modified: " + document.lastModified;



const hamButton = document.querySelector('#menu');
const navielement = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navielement.classList.toggle('open');
    hamButton.classList.toggle('open');
});