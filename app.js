const number = document.getElementById("number");
const button = document.getElementById("button");
const answear = document.getElementById("answear");
let attempt = 0;

const random = Math.floor(Math.random() * 100 + 1);
//console.log(random);

function check() {

    if (!isNaN(number.value) && number.value.trim() !== "") {
        attempt++

        if (number.value == random) {
            const message = document.createElement("h1");
            message.textContent = "CONGRATULATIONS!!! YOU WON";
            answear.appendChild(message);
            answear.innerHTML += `<p>It took ${attempt} tries!</p>`
            button.textContent = "Try Again";
            button.onclick = reload;
        }
        else if (number.value < random) {
            const message = document.createElement("p");
            message.textContent = number.value + " - is not enough!";
            answear.appendChild(message);
        }
        else if (number.value > random) {
            const message = document.createElement("p");
            message.textContent = number.value + " - is too high";
            answear.appendChild(message);
        }
    } else {
        answear.innerHTML += `<h2>Enter the correct number</h2> `
    }

}

button.onclick = check;

function reload() {
    location.reload();
}
