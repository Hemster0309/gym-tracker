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
}

function loadLogs() {
    const logs = JSON.parse(localStorage.getItem("gymLogs")) || [];
    logs.forEach(addRow);
}

// Theme toggle
window.onload = () => {
    loadLogs();

    const toggleBtn = document.getElementById("themeToggle");

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    toggleBtn.onclick = () => {
        document.body.classList.toggle("dark");

        // Save preference
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    };
};

// Theme toggle
window.onload = () => {
    loadLogs();

    const toggle = document.getElementById("themeToggle");

    // Load saved theme
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

