DROP TABLE IF EXISTS employees;

CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(255), salary int);

INSERT INTO employees (name, salary) VALUES ('John', 5000), ('Alex', 10000), ('Martha', 7000);