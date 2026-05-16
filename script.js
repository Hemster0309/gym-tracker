console.log("script.js is running");
function addSet() {
    const exercise = document.getElementById("exercise").value;
    const weight = document.getElementById("weight").value;
    const reps = document.getElementById("reps").value;

    if (!exercise || !weight || !reps) return;

    const entry = {
        date: new Date().toLocaleDateString(),
        exercise,
        weight,
        reps
    };

    // Save to localStorage
    let logs = JSON.parse(localStorage.getItem("gymLogs")) || [];
    logs.push(entry);
    localStorage.setItem("gymLogs", JSON.stringify(logs));

    addRow(entry);
}

function addRow(entry) {
    const table = document.getElementById("logTable");
    const row = table.insertRow(-1);

    row.insertCell(0).innerText = entry.date;
    row.insertCell(1).innerText = entry.exercise;
    row.insertCell(2).innerText = entry.weight;
    row.insertCell(3).innerText = entry.reps;

    // Add delete menu
    const menuCell = row.insertCell(4);
    menuCell.classList.add("menu-cell");

    const btn = document.createElement("button");
    btn.className = "menu-btn";
    btn.innerText = "⋮";

    btn.onclick = () => {
        if (confirm("Delete this set?")) {
            row.remove();
            deleteFromStorage(entry);
        }
    };

    menuCell.appendChild(btn);
}

function deleteFromStorage(entry) {
    let logs = JSON.parse(localStorage.getItem("gymLogs")) || [];

    logs = logs.filter(
        log =>
            !(
                log.date === entry.date &&
                log.exercise === entry.exercise &&
                log.weight === entry.weight &&
                log.reps === entry.reps
            )
    );

    localStorage.setItem("gymLogs", JSON.stringify(logs));
}

function loadLogs() {
    const logs = JSON.parse(localStorage.getItem("gymLogs")) || [];
    logs.forEach(addRow);
}

// Theme toggle + load logs
window.onload = () => {
    loadLogs();

    const toggle = document.getElementById("themeToggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
};
