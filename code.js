const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    window.onload = function () {
      tasks.forEach(task => {
        renderTask(task.text, task.completed);
      });
    };

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask(text, completed = false) {
      const taskItem = document.createElement('li');
      taskItem.innerText = text;
      if (completed) {
        taskItem.classList.add('task', 'completed');
        const hideBtn = document.createElement('button');
        hideBtn.innerText = 'Hide';
        hideBtn.classList.add('hide-btn');
        hideBtn.onclick = hideTask;
        taskItem.appendChild(hideBtn);
      } else {
        taskItem.classList.add('task');
        taskItem.onclick = toggleTask;
      }
      taskList.appendChild(taskItem);
    }

    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;

      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTask(taskText);
      taskInput.value = '';
    }

    function toggleTask(event) {
      const taskItem = event.target;
      taskItem.classList.toggle('completed');
      const taskText = taskItem.innerText;
      tasks = tasks.map(task => {
        if (task.text === taskText) {
          task.completed = !task.completed;
        }
        return task;
      });
      saveTasks();
    }

    function hideTask(event) {
      const taskItem = event.target.parentNode;
      const taskText = taskItem.innerText;
      tasks = tasks.filter(task => task.text !== taskText);
      taskList.removeChild(taskItem);
      saveTasks();
    }