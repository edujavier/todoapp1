const {Sequelize} = require('sequelize');

// crear una instancia con parametros de configuatrcion de nuestra base de datos
// un objeto de conficuracion --> 
const db = new Sequelize({
database: "todoapp",
username: "postgres", //nombre de usuario
host: "localhost", //127.0.0.1
port: "5432", //puerto que sale ne el psql pilas
password: "root", 
dialect: "postgres"// define la base de datos que estamos usuando
})

module.exports = db;