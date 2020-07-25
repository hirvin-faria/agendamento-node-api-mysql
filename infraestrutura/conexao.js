const mysql = require('mysql');
require('dotenv/config');

console.log(process.env.HOST);
console.log(process.env.PORT);
console.log(process.env.USERDB);
console.log(process.env.PASS);
console.log(process.env.DATABASE);

const conexao = mysql.createConnection({
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    user: process.env.USERDB,
    password: process.env.PASS,
    database: process.env.DATABASE,
});

module.exports = conexao;