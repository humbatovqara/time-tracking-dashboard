// Buttonlara klikləmək üçün
/*
const listBtns = document.querySelectorAll(".list__link");

for (const btn of listBtns) {
    btn.addEventListener('click', function (e) {
        if (e.target.textContent === "Daily") {
            console.log("Daily klikləndi");
        }
        if (e.target.textContent === "Weekly") {
            console.log("Weekly klikləndi");
        }
        if (e.target.textContent === "Monthly") {
            console.log("Monthly klikləndi");
        }
    })
}
*/


// JSON fayldan Data-ları çəkmək üçün - Click
/*
const btn = document.querySelectorAll(".list__link")[0].addEventListener("click", getData);

function getData() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "js/data.json", true);

    xhr.onload = function () {
        let hours = document.querySelectorAll(".hours")[0];

        if (this.status == 200) {
            const times = JSON.parse(this.responseText);

            times.forEach(function (time) {
                console.log(typeof time.title);
            })
        }
    }
    xhr.send();
}
*/


// JSON fayldan Data-ları çəkmək üçün - Onload
document.addEventListener("DOMContentLoaded", getTitle);

function getTitle() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "js/data.json", true);

    xhr.onload = function () {
        let titles = document.querySelectorAll(".menu__name")[0];


        if (this.status == 200) {
            const times = JSON.parse(this.responseText);

            times.forEach(function (time) {
                titles.innerHTML = time.title;
            })
        }
    }
    xhr.send();
}