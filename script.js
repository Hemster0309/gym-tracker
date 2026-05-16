body {
    font-family: Arial;
    padding: 20px;
    background: #f5f5f5;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    padding: 8px;
    font-size: 16px;
}

button {
    padding: 10px;
    background: black;
    color: white;
    border: none;
    font-size: 16px;
}

table {
    width: 100%;
    margin-top: 20px;
    background: white;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

// Theme toggle
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
