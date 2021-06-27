let password = document.getElementById("password");
let buttonOk = document.getElementById("button-ok");
let buttonLaunch = document.getElementById("button-launch");

let checkboxes = document.querySelectorAll("input[type=checkbox]");
let ranges = document.querySelectorAll("input[type=range]");

let rocket = document.querySelector(".rocket");

let controlPanelInner = document.querySelector(".control-panel__inner");

initialize();

function initialize() {
    disableInputs();
    controlPanelInner.onchange = enableLaunch;
    controlPanelInner.addEventListener("change", enableLaunch);
    for (const checkbox of checkboxes) {
        checkbox.onchange = enableLaunch;
        checkbox.addEventListener("change", enableLaunch);
    }
    for (const range of ranges) {
        range.onchange = enableLaunch;
        range.addEventListener("change", enableLaunch);
    }
}

function disableInputs() {
    for (const checkbox of checkboxes) {
        checkbox.disabled = true;
    }
    for (const range of ranges) {
        range.disabled = true;
    }
    buttonLaunch.disabled = true;
}

function enableLaunch() {
    for (const checkbox of checkboxes) {
        if (!checkbox.checked) {
            return false;
        }
    }
    for (const range of ranges) {
        if (range.value !== "100") {
            return false;
        }
    }
    buttonLaunch.removeAttribute("disabled");
}

buttonOk.addEventListener("click", () => {
    if (password.value === "TrustNo1") {
        for (const checkbox of checkboxes) {
            checkbox.removeAttribute("disabled");
        }
        for (const range of ranges) {
            range.removeAttribute("disabled");
        }
    }
});

buttonLaunch.addEventListener("click", () => {
    rocketMove(200, 800);
});


function rocketMove(leftDestination, bottomDestination) {
    let startLeft = computedStyleToNumber(getComputedStyle(rocket).left);
    let startBottom = computedStyleToNumber(getComputedStyle(rocket).bottom);

    let timerLeft = setInterval(function () {
        let currentLeft = computedStyleToNumber(getComputedStyle(rocket).left);
        let newLeft = currentLeft + 1;
        rocket.style.left = newLeft + "px";

        if (currentLeft - startLeft >= leftDestination) {
            clearInterval(timerLeft);
        }

    }, 10);

    let timerBottom = setInterval(function () {
        let currentBottom = computedStyleToNumber(getComputedStyle(rocket).bottom);
        let newBottom = currentBottom + 5;
        rocket.style.bottom = newBottom + "px";

        if (currentBottom - startBottom >= bottomDestination) {
            clearInterval(timerBottom);
        }
    }, 10);
}

function computedStyleToNumber(computedStyleString) {
    return Number(computedStyleString.substring(0, computedStyleString.length - 2));
}
