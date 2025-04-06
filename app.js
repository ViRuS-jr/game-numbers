const random = Math.floor(Math.random() * 100 + 1);
//console.log(random); 
const number = document.getElementById("number");
const button = document.getElementById("button");
const resBut = document.getElementById("listResetButton");
const answear = document.getElementById("answear");
const results = document.getElementById("results");
results.innerHTML = `<h1>TOP 10</h1>`;
let attempt = 0;
let topTen = (JSON.parse(localStorage.getItem("topTen")) || []).filter(p => p !== null);

function tableFill() {
    let counter = 0;
    topTen.forEach(person => {
        if (person) {
            counter++
            results.innerHTML += `<p>${counter}. ${person.name} in ${person.score}</p>`
        }
    })
}

tableFill();


document.addEventListener('DOMContentLoaded', function () {
    number.focus();
});

function check() {

    if (!isNaN(number.value) && number.value.trim() !== "") {
        attempt++

        if (number.value == random) {
            const firstChild = answear.firstChild;
            const message = document.createElement("h2");
            const reset = document.createElement("button");
            message.innerHTML = `<p>CONGRATULATIONS!!! <br> YOU WON <br> ---- ${random} ----</p>`;
            if (attempt === 1) {
                message.innerHTML += `<p>It took ${attempt} try!</p>`
            } else {
                message.innerHTML += `<p>It took ${attempt} tries!</p>`
            }
            addWinner();
            answear.insertBefore(message, firstChild);
            number.value = "";
            button.textContent = "Try Again";
            button.onclick = reload;
            reset.onclick = reload;
            reset.textContent = "Try Again";
            message.appendChild(reset);
            number.addEventListener('keypress', enterReload);
        }
        else if (number.value < random) {
            const firstChild = answear.firstChild;
            const message = document.createElement("p");
            message.textContent = attempt + ":   " + number.value + " - is not enough!";
            answear.insertBefore(message, firstChild);
        }
        else if (number.value > random) {
            const firstChild = answear.firstChild;
            const message = document.createElement("p");
            message.textContent = attempt + ":   " + number.value + " - is too high!";
            answear.insertBefore(message, firstChild);
        }
    } else if (number.value === "") { //dodane doesn't show double win meessage just before reload the page

    } else {
        answear.innerHTML += `<h2>Enter the correct number</h2> `
    }
    number.select();
}

button.onclick = check;

function reload() {
    location.reload();
}

function enterCheck(event) {
    if (event.key === 'Enter') {
        check();
    }
}

function enterReload(event) {
    if (event.key === 'Enter') {
        reload();
    }
}

number.addEventListener('keypress', enterCheck);

function addWinner() {

    //add winner to score list
    topTen.push({ name: "Won", score: attempt })

    //sort
    topTen.sort(function (a, b) {
        return a.score - b.score;
    });

    //max length of table
    topTen.length = 10;

    //save table in localstorage
    localStorage.setItem("topTen", JSON.stringify(topTen)) || [];

    //display on the winnings board page
    let counter = 0;
    results.innerHTML = `<h1>TOP 10</h1>`;
    topTen.forEach(person => {
        //console.log(`${counter}: ${person.name} : ${person.score}`);
        counter++
        results.innerHTML += `<p>${counter}. ${person.name} in ${person.score}</p>`
    });
}

function listReset() {
    const sure = confirm("Are You sure?");
    if (sure) {
        localStorage.removeItem("topTen");
        topTen = [];
        reload();
    }
}

resBut.onclick = listReset;