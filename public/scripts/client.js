$(document).ready(function() {

  //  Create a new task
  $('#create-task').on('click', '#submit', function(){
    var newTask = $(this).siblings('#task-name').val();
    createTask(newTask);
    $(this).siblings('#task-name').val('');
  });

  //  Delete button handler
  $('#task-display').on('click', '.delete', deleteTask);

  //  Update button handler
  $('#task-display').on('click', '.update', updatePrep);

  //  Checkbox handler
  $('#task-display').on('click', '.check', updatePrep);

  //  Display starting tasks
  getTasks();
});

function createTask(sentTask) {
  taskObj = {status: 'incomplete'};
  taskObj.task = sentTask;
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskObj,
    success: getTasks
  });
}

//  GET request for tasks
function getTasks() {
  $('#task-display').empty();
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: showTasks
  });
}

//  Function to create and append divs for each task in the database
function showTasks(response) {
  response.forEach(function(task) {
    var $taskDiv = $('<div class="task" id="' + task.id + '"></div>');
    var $checkbox = $('<input class="check" type="checkbox"></input>');
    if (task.status == 'complete') {
      $checkbox.prop('checked', true);
      $taskDiv.addClass('completed');
    } else if (task.status == 'incomplete') {
      $taskDiv.removeClass('completed');
    }
    $taskDiv.append($checkbox);
    $taskDiv.append('<input class="task-name" type="text" value="' + task.task + '"></input>');
    // $taskDiv.append('<p>' + task.status + '</p>')
    $taskDiv.append('<button class="update btn btn-sm btn-warning" type="button">Update Task</button>');
    $taskDiv.append('<button class="delete btn btn-sm btn-danger" type="button">X</button>')
    $('#task-display').append($taskDiv);
  });
}

//  DELETE request for tasks
function deleteTask(event) {
  event.preventDefault();
  var taskId = $(this).parent().attr('id');

  if (confirm('Are you sure you want to delete this task?')) {
    $.ajax({
      type: 'DELETE',
      url: 'tasks/' + taskId,
      success: getTasks
    });
  }
}

//  Function to set values before updating
function updatePrep() {
  var taskId = $(this).parent().attr('id');
  var task = $(this).siblings('.task-name').val();
  var status;
  var $isChecked = $(this).parent().find('.check');
  if ($isChecked.prop('checked')) {
    status = 'complete';
  } else if (!$isChecked.prop('checked')) {
    status = 'incomplete';
  }
  updateTask(taskId, task, status);
}

//  PUT request to update tasks
function updateTask(taskId, taskName, taskStatus) {
  var taskToUpdate = {
    id: taskId,
    task: taskName,
    status: taskStatus
  }
  $.ajax({
    type: 'PUT',
    url: 'tasks/' + taskId,
    data: taskToUpdate,
    complete: getTasks
  });
}
