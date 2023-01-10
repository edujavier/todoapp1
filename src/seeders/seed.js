const db = require('../utils/database');//traer el archivo de confiduracion de la base de datos.
const Users = require('../models/users.model');//traer modelo de usuarios
const Todos = require('../models/todos.models');//
//const Todos = require=("../models/")

//arreglos para insertar informaciion
const users = [//esta info ponemos el del diagrama de relaciones del base de datos
  {username:'Iannacus',email:'ian@gmail.com', password:1234,}, //id:1
  {username:'Jhorman',email:'jhorman@gmail.com', password:1234,},//id:2
  {username:'Lucero',email:'lucero@gmail.com', password:1234,},//id:3
];

const todos = [
  {title: 'Tarea1', description: 'shala shalala 1', userId: 1},
  {title: 'Tarea2', description: 'shala shalala 2', userId: 1},
  {title: 'Tarea imposible', userId: 2},
  {title: 'Dormir zzzzZZ', description: 'porque no me deja', userId: 3},
];

//const categories = [];

//const TodosCategories = [];

//tiene metodo 
//create -> sirve para insertar informacion
//metodo findOne-> encontrar un unico elemento, findAll -> select all from - Select * from, findByPk(find primary key)-> busca un elemento de la tabla por su llave primaria
//update -> actualizar
//destroy -> eliminar
db.sync({force: true})
.then(() =>{
  console.log("Iniciando con el sembradio malicioso")
  users.forEach((user) => Users.create(user)); //inserta informacon del usuario de users arreglo linea 7 a 11
  setTimeout(() => {
    todos.forEach((todo)=> Todos.create(todo));
  }, 100)//100milisegundos
})
.catch((error) => console.log(error));