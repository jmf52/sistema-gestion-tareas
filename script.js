// Selección de elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const totalTasksElem = document.getElementById('total-tasks');
const completedTasksElem = document.getElementById('completed-tasks');

// Arreglo para almacenar las tareas
let tasks = [];

// Función para actualizar las estadísticas de tareas
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  totalTasksElem.textContent = total;
  completedTasksElem.textContent = completed;
}

// Función para renderizar la lista de tareas en el HTML
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    const span = document.createElement('span');
    span.textContent = task.title;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    // Botón para marcar/desmarcar como completada
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn-complete';
    toggleBtn.textContent = task.completed ? 'Deshacer' : 'Completar';
    toggleBtn.addEventListener('click', () => toggleTask(index));

    // Botón para eliminar tarea
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    actionsDiv.appendChild(toggleBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actionsDiv);

    taskList.appendChild(li);
  });

  updateStats();
}

// Función para agregar una nueva tarea
function addTask(event) {
  event.preventDefault();

  const title = taskInput.value.trim();
  if (title === '') return;

  const newTask = {
    id: Date.now(),
    title: title,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
}

// Función para cambiar el estado de completado
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Event Listeners
taskForm.addEventListener('submit', addTask);