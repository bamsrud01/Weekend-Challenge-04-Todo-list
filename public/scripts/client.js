$(document).ready(function() {
  console.log('Document loaded');

  $('#create-task').on('click', '#submit', function(){
    var newTask = $(this).siblings('#task-name').val();
    createTask(newTask);
    $(this).siblings('#task-name').val('');
  })

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

  //getTasks();
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
    $taskDiv.append('<p>' + task.task + '</p>');
    $taskDiv.append('<p>' + task.status + '</p>')
    console.log($taskDiv.attr('id'));
    $('#task-display').append($taskDiv);
  });
}
//  NOTES

// if($("#checkSurfaceEnvironment-1").prop('checked') == true){
//     //do something
// }
