let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

for (let year = 2024; year <= 2030; year++) {
    let option = document.createElement("option");
    option.value = year;
    option.text = year;
    selectYear.appendChild(option);
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    if (currentYear > 2024 || (currentYear === 2024 && currentMonth > 0)) {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        showCalendar(currentMonth, currentYear);
    }
}

function jump() {
    let selectedYear = parseInt(selectYear.value);
    if (selectedYear >= 2024) {
        currentYear = selectedYear;
        currentMonth = parseInt(selectMonth.value);
        showCalendar(currentMonth, currentYear);
    }
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendarBody");
    tbl.innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellButton = document.createElement("button");
                cellButton.disabled = true;
                cell.appendChild(cellButton);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellButton = document.createElement("button");
                cellButton.textContent = date;
                cellButton.addEventListener("click", (event) => openModal(event.target, month, year));
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cellButton.classList.add("bg-info");
                }
                cell.appendChild(cellButton);
                row.appendChild(cell);
                date++;
            }
        }

        tbl.appendChild(row);
    }
}

function openModal(button, month, year) {
    let modal = document.getElementById("confirmationModal");
    let dateInfo = document.getElementById("dateInfo");
    let selectedDate = document.getElementById("selectedDate");
    
    let date = button.textContent;
    selectedDate.value = `${date}-${month + 1}-${year}`;
    dateInfo.textContent = `Dia selecionado: ${date} de ${months[month]} de ${year}`;
    modal.style.display = "block";
}

function closeModal() {
    let modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
}

function confirmReservation() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let hour = document.getElementById("hour").value;
    let selectedDate = document.getElementById("selectedDate").value;

    if (name && email && hour) {
        alert(`Reserva confirmada para o dia ${selectedDate} às ${hour}. Até lá!!`);
        closeModal();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

window.onclick = function(event) {
    let modal = document.getElementById("confirmationModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let hour = document.getElementById("hour").value;
    let selectedDate = document.getElementById("selectedDate").value;
}
