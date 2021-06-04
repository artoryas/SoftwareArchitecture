const { Client } = require('pg');
const express = require('express')
const app = express()
const port = 3000

const client = new Client({
    host: process.env.host || 'localhost',
    port: '5432',
    user: process.env.user || 'postgres',
    password: process.env.password || 'password123',
    database: process.env.db || 'test'
});

client.connect();
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    status: process.env.greeting
  })
})
app.get('/employees', (req, res) => {
  client.query(`select * from employees`,(err, result) => {
      if (!err){
          return res.json(result.rows);
      }
      return res.json({
        userMessage: 'Error occured'
      });
  })
})
app.post('/employees/add', (req, res) => {
  client.query(`insert into employees (name, salary) values ('${req.body.name}', '${req.body.salary}')`,(err, result) => {
      if (!err){
        return res.sendStatus(200);
      }
      return res.json({
        userMessage: 'Error occured'
      });
  })
});
app.put('/employees/edit', (req, res) => {
  client.query(`update employees set name = '${req.body.name}', salary = ${req.body.salary} where id = ${req.body.id}`, (err, result) => {
    if (!err){
      return res.sendStatus(200);
    }
    return res.json({
      userMessage: 'Error occured'
    });
  })
})
app.delete('/employees/:id', (req, res) => {
  client.query(`delete from employees where id = ${req.params.id}`, (err, result) => {
    if (!err){
      return res.sendStatus(200);
    }
    return res.json({
      userMessage: 'Error occured'
    });
  })
})
app.listen(port, () => {
  console.log(`APP IS ONLINE`)
})



