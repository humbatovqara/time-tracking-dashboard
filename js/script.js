let timeframe = 'weekly'; // Active Element

const menuDiv = document.querySelector(".menu");
let menuItems; // Work, Study ...

// 1. Initialize Menu
const mapLink = document.querySelectorAll(".list__link");

mapLink.forEach(element => {
    element.addEventListener('click', mapLinkClick);
});



// 2. GET data from JSON
let data = {};

fetch("js/data.json")
    .then(response => response.json())
    .then(jsonData => {

        // Create menu item
        jsonData.forEach(element => {
            menuDiv.insertAdjacentHTML('beforeend', createMenuItem(element, timeframe));
        });

        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });

        menuItems = document.querySelectorAll(".menu-items");
    })





/* --- Functions --- */
function mapLinkClick(e) {
    timeframe = e.target.innerText.toLowerCase();

    updateMenuItems(timeframe);
}

function updateMenuItems(timeframe) {
    menuItems.forEach(item => {
        updateMenuItem(item, timeframe);
    })
}

function updateMenuItem(item, timeframe) {
    const title = item.querySelector(".menu__name").innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    }

    const hours = item.querySelector(".menu__hour");
    hours.innerText = `${current}hrs`;
    const msg = item.querySelector(".menu__last");
    msg.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createMenuItem(element, timeframe) {
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    }

    return `
        <div class="menu-items menu__${title.toLowerCase().replace(/\s/g, '')}">
            <div class="menu__cover"></div>
            <div class="menu__content">
                <div class="menu__title">
                    <p class="menu__name">${title}</p>
                    <i><a href="#"><img src="img/icon-ellipsis.svg" alt="Dots" class="menu__icon"></a></i>
                </div>
                <div class="menu__body">
                    <p class="menu__hour">${current}hrs</p>
                    <p class="menu__last">${timeframeMsg[timeframe]} - ${previous}hrs</p>
                </div>
            </div>
        </div>
    `
}