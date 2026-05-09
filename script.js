let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let includeEndDate = document.getElementById("includeEndDate");

let calculateBtn = document.getElementById("calculateBtn");
let clearBtn = document.getElementById("clearBtn");

let messageBox = document.getElementById("messageBox");

let totalDays = document.getElementById("totalDays");
let resultText = document.getElementById("resultText");

let weekResult = document.getElementById("weekResult");
let monthResult = document.getElementById("monthResult");
let yearResult = document.getElementById("yearResult");

let startDay = document.getElementById("startDay");
let endDay = document.getElementById("endDay");

let dateDirection = document.getElementById("dateDirection");
let dateStatus = document.getElementById("dateStatus");

function resetResults() {

    totalDays.innerText = "--";

    resultText.innerText = "Your result will appear here.";

    weekResult.innerText = "--";

    monthResult.innerText = "--";

    yearResult.innerText = "--";

    startDay.innerText = "--";

    endDay.innerText = "--";

    dateDirection.innerText = "--";

    dateStatus.innerText = "Waiting";

}

function showMessage(text, color) {

    messageBox.innerText = text;

    messageBox.style.background = color;

}

function getWeekDay(dateValue) {

    let date = new Date(dateValue);

    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday","Friday","Saturday"
    ];

    return days[date.getDay()];

}

function validateDates() {

    if (startDate.value === "" || endDate.value === "") {

        showMessage(
            "Please select both dates first.",
            "#fee2e2"
        );

        resetResults();

        return false;
    }

    return true;
}

calculateBtn.onclick = function () {

    let isValid = validateDates();

    if (isValid === false) {
        return;
    }

    let start = new Date(startDate.value);

    let end = new Date(endDate.value);

    if (start.getTime() === end.getTime()) {

        showMessage(
            "Both selected dates are the same.",
            "#dbeafe"
        );

        totalDays.innerText = "0";

        resultText.innerText = "No difference between dates.";

        dateDirection.innerText = "Same Date";

        dateStatus.innerText = "Completed";

    }
    else if (start > end) {

        showMessage(
            "Start date is after the end date.",
            "#fee2e2"
        );

        dateDirection.innerText = "Backward";

        dateStatus.innerText = "Invalid Range";

    }
    else {

        showMessage(
            "Dates look good. Ready for calculation.",
            "#dcfce7"
        );

        dateDirection.innerText = "Forward";

        dateStatus.innerText = "Ready";

    }

    startDay.innerText = getWeekDay(startDate.value);

    endDay.innerText = getWeekDay(endDate.value);

};

clearBtn.onclick = function () {

    startDate.value = "";

    endDate.value = "";

    includeEndDate.checked = false;

    showMessage(
        "Choose two dates to start.",
        "#eef2ff"
    );

    resetResults();

};