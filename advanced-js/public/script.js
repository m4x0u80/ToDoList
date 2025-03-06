function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let taskName = prompt("Nom de la tâche :");
    if (taskName) {
        let tasks = getTasks();
        tasks.push({ name: taskName, completed: false });
        saveTasks(tasks);
        renderTasks();
    }
}

function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function editTask(index) {
    let tasks = getTasks();
    let newName = prompt("Modifier la tâche :", tasks[index].name);
    if (newName) {
        tasks[index].name = newName;
        saveTasks(tasks);
        renderTasks();
    }
}

function filterTasks() {
    renderTasks();
}

function renderTasks() {
    const filter = document.getElementById("filter").value;
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = getTasks();
    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        let taskDiv = document.createElement("div");
        taskDiv.className = "task-container";
        if (task.completed) taskDiv.classList.add("completed");
        taskDiv.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
            <span>${task.name}</span>
            <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
            <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
        `;
        taskList.appendChild(taskDiv);
    });
}

document.addEventListener("DOMContentLoaded", renderTasks);