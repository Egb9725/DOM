const tasksForm = document.querySelector("form")
const tasks = document.querySelector("#tasks")


function createElement(type, properties = {}) {
    const element = document.createElement(type);
    Object.assign(element, properties);
    return element;
}

function createButton(text, clickHandler) {
    return createElement('button', {
        textContent: text,
        onclick: clickHandler
    });
}

function createTask(taskName) {
    const taskId = crypto.randomUUID();
    const checkBoxId = `tache${taskId}`;

    const taskCheckInput = createElement('input', {
        type: 'checkbox',
        id: checkBoxId
    });

    const taskLabel = createElement('label', {
        htmlFor: checkBoxId,
        textContent: taskName
    });

    const deleteBtn = createButton('Supprimer', function () {
        deleteTask(taskId)
    });
    const updateBtn = createButton('Modifier', function () {
        updateTask(taskId)
    });

    const task = createElement('div', {
        className: 'task',
        id: taskId
    });

    task.append(taskCheckInput, taskLabel, document.createElement('br'), deleteBtn, updateBtn, document.createElement('hr'));

    tasks.appendChild(task);
}

function deleteTask(taskId) {
    const task = document.getElementById(taskId)

    const confirmDeletion = confirm("Voulez-vous supprimer cette tache ?")

    if (confirmDeletion) {
        task.remove();
    }
}

function updateTask(taskId) {
    const task = document.getElementById(taskId);
    const taskLabel = task.querySelector("label");
    const newTaskName = prompt("Enter the new task name", taskLabel.textContent);

    if (newTaskName) {
        const taskLabel = task.querySelector("label");
        taskLabel.textContent = newTaskName;
    }
}

function addTask(event) {
    const data = new FormData(event.target)

    const {task} = Object.fromEntries(data.entries())

    if (task) {
        createTask(task)
        event.target.reset()
    }


    event.preventDefault();
}


tasksForm.addEventListener("submit", addTask)

