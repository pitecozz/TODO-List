let tasks = [];

// Carregar tarefas do armazenamento local
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.textContent = task.text;
    taskElement.classList.add('task');
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    
    // Marcar como concluído ou não concluído
    taskElement.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });
    
    // Editar tarefa
    taskElement.addEventListener('dblclick', () => {
      const newText = prompt('Editar tarefa:', task.text);
      if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    });
    
    // Excluir tarefa
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#128465;'; // Lixeira emoji
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Evitar que a tarefa seja marcada como concluída ao clicar no botão de excluir
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
    taskElement.appendChild(deleteButton);
    
    taskList.appendChild(taskElement);
  });
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
}

function hideCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

renderTasks();
