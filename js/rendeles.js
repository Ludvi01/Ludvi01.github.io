function calcAmount() {
    let price = 1000;
    let amountInput = document.querySelector("#amountinput");
    let amountNumber = parseInt(amountInput.value);
    amountNumber = isNaN(amountNumber) ? 0 : amountNumber;

    showSumPrice(price, amountNumber);
}

function showSumPrice(price, amountNumber) {
    let amount = amountNumber * price;
    let showAmount = document.querySelector("span.show-amount");
    showAmount.innerHTML = amount;
}

function feltetSmall() {
    let helpText = document.createElement("small");
    helpText.className = "form-text text-muted";
    helpText.innerHTML = "Adja meg a feltéteket.";
    helpText.id = "helpText";
    let parent = document.querySelector("div.form-group:nth-child(1)");
    parent.appendChild(helpText);
}
feltetSmall();

let feltetek = [
    "Szalonna",
    "Hagyma",
    "Csipős szósz",
    "Extra sonka",
    "Dupla hús",
    "Dupla sajt",
]
let feltetekSelect = document.querySelector("#feltetSelect")
let felteti = 0;
while (felteti < feltetek.length) {
    let option = document.createElement("option");
    option.value = felteti;
    option.innerHTML = feltetek[felteti];
    feltetekSelect.appendChild(option);
    felteti++;
}