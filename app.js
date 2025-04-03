const number = document.getElementById("number");
const button = document.getElementById("button");
const answear = document.getElementById("answear");
let attempt = 0;
// add delay for safari browser :-/
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const numberInput = document.getElementById('number');
        if (numberInput) {
            numberInput.focus();
        }
    }, 50); // delay to 50ms
});
const random = Math.floor(Math.random() * 100 + 1);
//console.log(random);

function check() {

    if (!isNaN(number.value) && number.value.trim() !== "") {
        attempt++

        if (number.value == random) {
            const firstChild = answear.firstChild;
            const message = document.createElement("h1");
            const reset = document.createElement("button");
            message.textContent = "CONGRATULATIONS!!! YOU WON";
            message.innerHTML += `<p>It took ${attempt} tries!</p>`
            answear.insertBefore(message, firstChild);
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
            message.textContent = number.value + " - is not enough!";
            answear.insertBefore(message, firstChild);
        }
        else if (number.value > random) {
            const firstChild = answear.firstChild;
            const message = document.createElement("p");
            message.textContent = number.value + " - is too high";
            answear.insertBefore(message, firstChild);
        }
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