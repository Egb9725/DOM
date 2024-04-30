const tasksForm = document.querySelector("form")
const tasks = document.querySelector("#tasks")

// creer un element en DOM
function createElement(type, properties = {}) {
    const element = document.createElement(type); 
    Object.assign(element, properties); // ajoute les proprietés de l'objet properties dans l'objet element
    return element;
}

// creer le bouton en DOM
function createButton(text, clickHandler) {
    return createElement('button', {
        textContent: text,
        onclick: clickHandler
    });
}
// creer les taches en DOM
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

 // supprimer une tache dans DOM
function deleteTask(taskId) {
    const task = document.getElementById(taskId)
    
    const confirmDeletion = confirm("Voulez-vous supprimer cette tache ?")

    // Message de confirmation
    if (confirmDeletion) {
        task.remove(); 
    }
}

// Modifier un element
function updateTask(taskId) {
    const task = document.getElementById(taskId);
    const taskLabel = task.querySelector("label");
    const newTaskName = prompt("Enter the new task name", taskLabel.textContent);

    if (newTaskName) {
        const taskLabel = task.querySelector("label");
        taskLabel.textContent = newTaskName;
    }
}
// ajouter une tache en DOM
function addTask(event) {
    const data = new FormData(event.target)

    const {task} = Object.fromEntries(data.entries())

    if (task) {
        createTask(task)
        event.target.reset() //réinitialise le formulaire à son état initial, effaçant ainsi le contenu saisi par l'utilisateur.
    }

    event.preventDefault(); //empêche le comportement par défaut du formulaire lorsqu'il est soumis, ce qui empêche la page de se recharger.
}


tasksForm.addEventListener("submit", addTask)

