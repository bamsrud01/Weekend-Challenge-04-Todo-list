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



//  Export as a module
module.exports = router;
