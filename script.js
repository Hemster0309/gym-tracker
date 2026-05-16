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

    const menuCell = row.insertCell(4);
    menuCell.classList.add("menu-cell");

    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    const btn = document.createElement("button");
    btn.className = "menu-btn";
    btn.innerText = "⋮";

    const menu = document.createElement("div");
    menu.className = "dropdown-menu";

    const editItem = document.createElement("div");
    editItem.className = "dropdown-item";
    editItem.innerText = "Edit Set";
    editItem.onclick = () => editSet(row, entry);

    const deleteItem = document.createElement("div");
    deleteItem.className = "dropdown-item";
    deleteItem.innerText = "Delete Set";
    deleteItem.onclick = () => {
        if (confirm("Delete this set?")) {
            row.remove();
            deleteFromStorage(entry);
        }
    };

    menu.appendChild(editItem);
    menu.appendChild(deleteItem);

    dropdown.appendChild(btn);
    dropdown.appendChild(menu);
    menuCell.appendChild(dropdown);

    btn.onclick = (e) => {
        e.stopPropagation();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    };

    document.addEventListener("click", () => {
        menu.style.display = "none";
    });
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

function editSet(row, entry) {
    const newExercise = prompt("Exercise:", entry.exercise);
    const newWeight = prompt("Weight:", entry.weight);
    const newReps = prompt("Reps:", entry.reps);

    if (!newExercise || !newWeight || !newReps) return;

    row.cells[1].innerText = newExercise;
    row.cells[2].innerText = newWeight;
    row.cells[3].innerText = newReps;

    deleteFromStorage(entry);

    const updatedEntry = {
        date: entry.date,
        exercise: newExercise,
        weight: newWeight,
        reps: newReps
    };

    let logs = JSON.parse(localStorage.getItem("gymLogs")) || [];
    logs.push(updatedEntry);
    localStorage.setItem("gymLogs", JSON.stringify(logs));
}

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
