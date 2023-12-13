let tasks = [];

const handletask = () => {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    tasks.push({ title: taskText, completed: false });
    handledisplay();
    taskInput.value = '';
  }
}
const handleRemove = (index) => {
  tasks.splice(index, 1);
  handledisplay();
}

const handleEdit = (index) => {
  const newTitle = document.getElementById("taskInput").value = tasks[index].title;
  if (newTitle !== null) {
    tasks[index].title = newTitle;
    handledisplay();
  }
}

const toggleCompleted = (index) => {
  tasks[index].completed = !tasks[index].completed;
  handledisplay();
}

const handledisplay = () =>{
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    tasks.forEach((task, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="checkbox" onchange="toggleCompleted(${index})" ${task.completed ? 'checked' : ''}>
        <span>${task.title}</span>
        <button onclick="handleEdit(${index})">Edit</button>
        <button onclick="handleRemove(${index})">Delete</button>
      `;
      taskList.appendChild(listItem);
    });
  }

window.onload = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks) {
    tasks = storedTasks;
    handledisplay();
  }
};

window.onbeforeunload = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
