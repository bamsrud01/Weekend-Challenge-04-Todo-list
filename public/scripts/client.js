$(document).ready(function() {
  console.log('Document loaded');

  $('#create-task').on('click', '#submit', function(){
    var newTask = $(this).siblings('#task-name').val();
    createTask(newTask);
    $(this).siblings('#task-name').val('');
  });

  $('#task-display').on('click', '.delete', deleteTask);

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
    $taskDiv.append('<input type="text" value="' + task.task + '"></input>');
    // $taskDiv.append('<p>' + task.status + '</p>')
    $taskDiv.append('<button class="update btn btn-sm btn-warning" type="button">Update Task</button>');
    $taskDiv.append('<button class="delete btn btn-sm btn-danger" type="button">X</button>')
    console.log($taskDiv.attr('id'));
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
//  NOTES

// if($("#checkSurfaceEnvironment-1").prop('checked') == true){
//     //do something
// }
