const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'test'
})
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
