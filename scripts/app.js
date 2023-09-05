// Adapted JavaScript code for Task Manager

// Function to create a new task item
function createTask() {
  var taskName = document.getElementById("taskName").value;
  var taskDescription = document.getElementById("taskDescription").value;
  var taskDueDate = document.getElementById("taskDueDate").value;
  var taskPriority = document.getElementById("taskPriority").value;

  if (taskName === '' || taskDescription === '' || taskDueDate === '' || taskPriority === '') {
    alert("Please fill in all fields.");
    return;
  }

  var taskList = document.querySelector('.task-list ul');
  var li = document.createElement("li");

  var taskHTML = `
    <h3>${taskName}</h3>
    <p>${taskDescription}</p>
    <p>${taskDueDate}</p>
    <p>${taskPriority}</p>
    <button class="complete">Mark as Completed</button>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;

  li.innerHTML = taskHTML;
  taskList.appendChild(li);

  // Clear input fields
  document.getElementById("taskName").value = '';
  document.getElementById("taskDescription").value = '';
  document.getElementById("taskDueDate").value = '';
  document.getElementById("taskPriority").value = '';

  // Attach event listeners for new task buttons
  li.querySelector(".complete").addEventListener('click', completeTask);
  li.querySelector(".edit").addEventListener('click', editTask);
  li.querySelector(".delete").addEventListener('click', deleteTask);
}

// Function to mark a task as completed
function completeTask() {
  this.parentElement.classList.toggle('completed');
  //remove the completed task from the list
  var completedTask = this.parentElement;
  completedTask.remove();
  //add the completed task to the completed task list
  //var completedTaskList = document.querySelector('.completed-task-list ul');
  //completedTaskList.appendChild(completedTask);

}

// Function to edit a task
function editTask() {
  var li = this.parentElement;
  var taskName = li.querySelector('h3');
  var taskDescription = li.querySelector('p');
  var taskDueDate = li.querySelector('p');
  var taskPriority = li.querySelector('p');

  var taskNameInput = document.createElement('input');
  taskNameInput.type = 'text';
  taskNameInput.value = taskName.innerText;

  var taskDescriptionInput = document.createElement('input');
  taskDescriptionInput.type = 'text';
  taskDescriptionInput.value = taskDescription.innerText;

  var taskDueDateInput = document.createElement('input');
  taskDueDateInput.type = 'text';
  taskDueDateInput.value = taskDueDate.innerText;

  var taskPriorityInput = document.createElement('input');
  taskPriorityInput.type = 'text';
  taskPriorityInput.value = taskPriority.innerText;

  li.insertBefore(taskNameInput, taskName);
  li.insertBefore(taskDescriptionInput, taskDescription);
  li.insertBefore(taskDueDateInput, taskDueDate);
  li.insertBefore(taskPriorityInput, taskPriority);

  taskName.remove();
  taskDescription.remove();
  taskDueDate.remove();
  taskPriority.remove();

  this.innerText = 'Save';
  this.removeEventListener('click', editTask);
  this.addEventListener('click', saveTask);
}

// Function to delete a task
function deleteTask() {
  var li = this.parentElement;
  li.remove();
}

// Function to save a task 
function saveTask() {
  var li = this.parentElement;
  var taskNameInput = li.querySelector('input');
  var taskDescriptionInput = li.querySelector('input');
  var taskDueDateInput = li.querySelector('input');
  var taskPriorityInput = li.querySelector('input');

  var taskName = document.createElement('h3');
  taskName.innerText = taskNameInput.value;

  var taskDescription = document.createElement('p');
  taskDescription.innerText = taskDescriptionInput.value;

  var taskDueDate = document.createElement('p');
  taskDueDate.innerText = taskDueDateInput.value;

  var taskPriority = document.createElement('p');
  taskPriority.innerText = taskPriorityInput.value;

  li.insertBefore(taskName, taskNameInput);
  li.insertBefore(taskDescription, taskDescriptionInput);
  li.insertBefore(taskDueDate, taskDueDateInput);
  li.insertBefore(taskPriority, taskPriorityInput);

  taskNameInput.remove();
  taskDescriptionInput.remove();
  taskDueDateInput.remove();
  taskPriorityInput.remove();

  this.innerText = 'Edit';
  this.removeEventListener('click', saveTask);
  this.addEventListener('click', editTask);
}
// Add event listener to the form for adding tasks
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  createTask();
});

// Add event listeners for existing tasks
var taskButtons = document.querySelectorAll('.task-list .delete');
taskButtons.forEach(function (button) {
  button.addEventListener('click', deleteTask);
});
