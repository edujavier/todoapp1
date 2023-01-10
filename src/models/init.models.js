// VAMOS A IMPORTAR TODOS NUESTROS MODELOS CREADOS
const Users =  require('./users.model');
const Todos = require("./todos.models");
const Categories = require('./categories.models');
const TodosCategories = require('./todos-categories');

const initModels = () =>{
  
  Categories;
  TodosCategories;
  
  //vamos a crear las relaciones
  //hasOne -> para indicar que tiene una tarea- 
  //hasMany -> tiene muchos
  //belongsTo -> pertenece a

  //relacion
  Todos.belongsTo(Users, {as: 'author', foreignKey: 'user_id'});//LA TAREA pertenece al modelo de Users
  Users.hasMany(Todos, {as: 'task', foreignKey:'user_id'}); //UN USUARIO TIENE MUCHAS TAREAS
  //ASI CREAMOS RELACION DE UNO A MUCHOS

  // relacion M-M
  TodosCategories.belongsTo(Todos, {as: 'task', foreignKey: 'todo_id'});
  Todos.hasMany(TodosCategories, {as: 'category', foreignKey: 'todo_id'});

  TodosCategories.belongsTo(Categories, {as: 'category', foreignKey: 'category_id'});
  Categories.hasMany(TodosCategories, {as: 'task', foreignKey:'category_id'});

};

module.exports = initModels;