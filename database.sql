CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task varchar(100) NOT NULL,
  status varchar(20) NOT NULL
);
