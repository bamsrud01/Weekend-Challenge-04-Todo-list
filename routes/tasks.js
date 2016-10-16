//  Declare the file as a router
var router = require('express').Router();

//  Import postgres
var pg = require('pg');

//  Use the 'rho' database
var config = {
  database: 'rho'
};

//  Initialize connection pool
var pool = new pg.Pool(config);

//  GET function - to display tasks
router.get('/', function(req, res){
  pool.connect(function(err, client, done){
    try {
      if (err){
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM tasks ORDER BY status DESC, id;', function(err, result){
        if (err){
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from Database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  POST function - to create a new task
router.post('/', function(req, res){
  pool.connect(function(err, client, done){
    try {
      if(err){
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO tasks (task, status) VALUES ($1, $2) RETURNING *;', [req.body.task, req.body.status], function(err, result){
        if (err){
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  PUT function - to update existing tasks
router.put('/:id', function(req, res){
  //  Variables for updated values
  var id = req.params.id;
  var task = req.body.task;
  var status = req.body.status;
  pool.connect(function(err, client, done){
    try {
      if (err){
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE tasks SET task=$1, status=$2 WHERE id=$3 RETURNING *;', [task, status, id], function(err, result){
        if (err){
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

// DELETE function - to delete a task
router.delete('/:id', function(req, res){
  var id = req.params.id;
  pool.connect(function(err, client, done){
    try {
      if (err){
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM tasks WHERE id=$1', [id], function(err){
        if (err){
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

//  Export as a module
module.exports = router;
