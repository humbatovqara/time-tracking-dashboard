let timeframe = 'weekly';
const container = document.querySelector(".menu");
let regularCards;

// Menu
const menu = document.querySelectorAll(".list__link");

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
})

// GET JSON Data
let data = {};

fetch("js/data.json")
    .then(response => response.json())
    .then(jsonData => {
        // Create Card
        jsonData.forEach(element => {
            container.insertAdjacentHTML('beforeend', createRegularCard(element, timeframe));
        });

        //
        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });

        regularCards = document.querySelectorAll('.regular-cards');
    });


// Functions
function menuOnClick(event) {
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

function updateCards(timeframe) {
    regularCards.forEach(card => {
        updateCard(card,timeframe);
    })
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.menu__name').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily' : 'Yesterday',
        'weekly' : 'Last Week',
        'monthly' : 'Last Month'
    }

    const hoursElement = card.querySelector(".menu__hour");
    hoursElement.innerText = `${current}hrs`;
    const msgElement = card.querySelector(".menu__last");
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element, timeframe) {
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];

    const timeframeMsg = {
        'daily' : 'Yesterday',
        'weekly' : 'Last Week',
        'monthly' : 'Last Month'
    }

    return `
    <div class="regular-cards menu__${title.toLowerCase().replace(/\s/g, '')}">
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