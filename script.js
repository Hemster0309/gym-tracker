console.log("script.js is running");

let currentRow = null;
let currentEntry = null;

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

/* ⭐ INLINE EDIT MODE */
function editSet(row, entry) {
    currentRow = row;
    currentEntry = entry;

    row.cells[1].innerHTML = `<input class="edit-input" value="${entry.exercise}">`;
    row.cells[2].innerHTML = `<input class="edit-input" value="${entry.weight}" type="number">`;
    row.cells[3].innerHTML = `<input class="edit-input" value="${entry.reps}" type="number">`;

    row.cells[4].innerHTML = `
        <button class="save-btn">Save</button>
        <button class="cancel-btn">Cancel</button>
    `;

    row.querySelector(".save-btn").onclick = () => {
        const newExercise = row.cells[1].querySelector("input").value;
        const newWeight = row.cells[2].querySelector("input").value;
        const newReps = row.cells[3].querySelector("input").value;

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

        restoreMenu(row, updatedEntry);
    };

    row.querySelector(".cancel-btn").onclick = () => {
        row.cells[1].innerText = entry.exercise;
        row.cells[2].innerText = entry.weight;
        row.cells[3].innerText = entry.reps;

        restoreMenu(row, entry);
    };
}

function restoreMenu(row, entry) {
    row.cells[4].innerHTML = "";

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
    row.cells[4].appendChild(dropdown);

    btn.onclick = (e) => {
        e.stopPropagation();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    };

    document.addEventListener("click", () => {
        menu.style.display = "none";
    });
}

window.onload = () => {
    console.log("onload fired");

    loadLogs();

    const toggle = document.getElementById("themeToggle");
    console.log("toggle element:", toggle);

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        if (toggle) toggle.checked = true;
    }

    if (!toggle) return; // prevent crash if not found

    toggle.addEventListener("change", () => {
        console.log("toggle changed, checked:", toggle.checked);

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
};

