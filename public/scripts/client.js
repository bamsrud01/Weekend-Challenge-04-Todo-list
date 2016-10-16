$(document).ready(function() {
  console.log('Document loaded');

  //  Create a new task
  $('#create-task').on('click', '#submit', function(){
    var newTask = $(this).siblings('#task-name').val();
    createTask(newTask);
    $(this).siblings('#task-name').val('');
  });

  //  Delete button
  $('#task-display').on('click', '.delete', deleteTask);

  //  Update button
  $('#task-display').on('click', '.update', updatePrep);

  //  Checkbox handler
  $('#task-display').on('click', '.check', updatePrep);
    /*  Test function for checkboxes!  */
    // $('#test').click(function(){
    //   console.log('clicked!');
    //   if ($(this).prop('checked')) {
    //     console.log('Checked');
    //   } else {
    //     console.log('Not checked');
    //   }
    // });
    /*  End test function  */

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
//  These arrays will hold objects for each complete and incomplete task
//////  Move inside a function later!
var incompleteTasks = [];
var completeTasks = [];

//  GET request for tasks
function getTasks() {
  $('#task-display').empty();
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: showTasks
  });
}

function showTasks(response) {
  console.log(response);
  response.forEach(function(task) {
    var $taskDiv = $('<div class="task" id="' + task.id + '"></div>');
    var $checkbox = $('<input class="check" type="checkbox"></input>');
    if (task.status =='complete') {
      $checkbox.prop('checked', true);
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

  $.ajax({
    type: 'DELETE',
    url: 'tasks/' + taskId,
    success: getTasks
  });
}

function updatePrep() {
  var taskId = $(this).parent().attr('id');
  var task = $(this).siblings('.task-name').val();
  var status;
  var $isChecked = $(this).parent().find('.check');
  console.log('Checked:', $isChecked);
  if ($isChecked.prop('checked')) {
    status = 'complete';
  } else if (!$isChecked.prop('checked')) {
    status = 'incomplete';
  } else {
    console.log('error');
  }
  console.log('ID:', taskId, 'Name:', task, 'Status:', status);
  updateTask(taskId, task, status);
}

function updateTask(taskId, taskName, taskStatus) {
  var taskToUpdate = {
    id: taskId,
    task: taskName,
    status: taskStatus
  }
  console.log(taskToUpdate);
  $.ajax({
    type: 'PUT',
    url: 'tasks/' + taskId,
    data: taskToUpdate,
    complete: getTasks
  });
}
//  NOTES

// if($("#checkSurfaceEnvironment-1").prop('checked') == true){
//     //do something
// }
