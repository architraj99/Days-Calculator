let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let includeEndDate = document.getElementById("includeEndDate");

let calculateBtn = document.getElementById("calculateBtn");
let clearBtn = document.getElementById("clearBtn");

let todayBtn = document.getElementById("todayBtn");
let tomorrowBtn = document.getElementById("tomorrowBtn");
let nextWeekBtn = document.getElementById("nextWeekBtn");
let nextMonthBtn = document.getElementById("nextMonthBtn");

let historyList = document.getElementById("historyList");

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

let startFullDate = document.getElementById("startFullDate");
let endFullDate = document.getElementById("endFullDate");

function resetResults() {

    totalDays.innerText = "--";

    resultText.innerText = "Your result will appear here";

    weekResult.innerText = "--";

    monthResult.innerText = "--";

    yearResult.innerText = "--";

    startDay.innerText = "--";

    endDay.innerText = "--";

    dateDirection.innerText = "--";

    dateStatus.innerText = "Waiting";

    startFullDate.innerText = "--";

    endFullDate.innerText = "--";

}

function showMessage(text, color) {

    messageBox.innerText = text;

    messageBox.style.background = color;

}

function getWeekDay(dateValue) {

    let date = new Date(dateValue);

    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    return days[date.getDay()];

}

function formatFullDate(dateValue) {

    let date = new Date(dateValue);

    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

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

function calculateDifference(start, end) {

    let oneDay = 1000 * 60 * 60 * 24;

    let difference = end.getTime() - start.getTime();

    let finalDays = Math.floor(difference / oneDay);

    if (includeEndDate.checked) {

        finalDays = finalDays + 1;

    }

    return finalDays;

}

function updateMainResult(days) {

    totalDays.innerText = days;

    if (days === 0) {

        resultText.innerText =
            "There is no difference between these dates.";

    }
    else if (days === 1) {

        resultText.innerText =
            "There is 1 day between the selected dates.";

    }
    else {

        resultText.innerText =
            days + " Days were found between the selected dates.";

    }

    if (includeEndDate.checked) {

        resultText.innerText =
            resultText.innerText +
            " End date was included.";

    }

}

function updateBreakdown(days) {

    let weeks = Math.floor(days / 7);

    let remainingDays = days % 7;

    let months = (days / 30.44).toFixed(1);

    let years = (days / 365.25).toFixed(1);

    if (weeks <= 0) {

        weekResult.innerText =
            remainingDays + " Days";

    }
    else {

        weekResult.innerText =
            weeks + "W " + remainingDays + "D";

    }

    monthResult.innerText = months;

    yearResult.innerText = years;

}

function formatInputDate(date) {

    return date.toISOString().split("T")[0];

}

function addHistory(start, end, days) {

    let historyItem = document.createElement("div");

    historyItem.className = "history-item";

    historyItem.innerHTML =
        `
        <strong>${days} Days</strong>
        <span>${start} → ${end}</span>
        `;

    if (historyList.children[0].className === "empty-history") {

        historyList.innerHTML = "";

    }

    historyList.prepend(historyItem);

    localStorage.setItem(
        "daysHistory",
        historyList.innerHTML
    );

}

function loadHistory() {

    let savedHistory =
        localStorage.getItem("daysHistory");

    if (savedHistory) {

        historyList.innerHTML = savedHistory;

    }

}

calculateBtn.onclick = function () {

    let isValid = validateDates();

    if (isValid === false) {
        return;
    }

    let start = new Date(startDate.value);

    let end = new Date(endDate.value);

    startDay.innerText = getWeekDay(startDate.value);

    endDay.innerText = getWeekDay(endDate.value);

    startFullDate.innerText =
        formatFullDate(startDate.value);

    endFullDate.innerText =
        formatFullDate(endDate.value);

    if (start > end) {

        showMessage(
            "Start date cannot be after end date.",
            "#fee2e2"
        );

        resetResults();

        dateDirection.innerText = "Backward";

        dateStatus.innerText = "Invalid";

        return;
    }

    let totalDifference = calculateDifference(start, end);

    updateMainResult(totalDifference);

    updateBreakdown(totalDifference);

    addHistory(
        formatFullDate(startDate.value),
        formatFullDate(endDate.value),
        totalDifference
    );

    if (totalDifference === 0) {

        dateDirection.innerText = "Same Date";

    }
    else {

        dateDirection.innerText = "Forward";

    }

    dateStatus.innerText = "Calculated";

    showMessage(
        "Date difference calculated successfully.",
        "#dcfce7"
    );

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

todayBtn.onclick = function () {

    let today = new Date();

    startDate.value = formatInputDate(today);

    endDate.value = formatInputDate(today);

};

tomorrowBtn.onclick = function () {

    let today = new Date();

    today.setDate(today.getDate() + 1);

    startDate.value = formatInputDate(today);

    endDate.value = formatInputDate(today);

};

nextWeekBtn.onclick = function () {

    let today = new Date();

    let nextWeek = new Date();

    nextWeek.setDate(today.getDate() + 7);

    startDate.value = formatInputDate(today);

    endDate.value = formatInputDate(nextWeek);

};

nextMonthBtn.onclick = function () {

    let today = new Date();

    let nextMonth = new Date();

    nextMonth.setMonth(today.getMonth() + 1);

    startDate.value = formatInputDate(today);

    endDate.value = formatInputDate(nextMonth);

};

loadHistory();