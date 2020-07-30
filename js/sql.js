const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: 'remain.sytes.net',
  user: 'MySite',
  password: '1QsAziJ1jhCkj5Ho',
  database: 'mysite',
  multipleStatements: true
});