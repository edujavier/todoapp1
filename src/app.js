// importabamos express
const express = require('express');
const db = require("./utils/database");//exportando base de datos
const initModels = require('./models/init.models');
const Users = require('./models/users.model');
const Todos = require('./models/todos.models');
///const { Where } = require('sequelize/types/utils');
// crear una instancia de express
const app = express();

app.use(express.json()); 

const PORT =8000;
//localhost: 8000/

//probando la conexion a la base de datos
db.authenticate()
.then(()=> console.log('Autenticaion exitosa')) // verifica si esta funcionando la conexion
.catch((error)=>console.log(error)); //nos dice que no esta funcionado

initModels();
//usar el metodo sync para sincronizar la informacion de la base de datos
//devueve una promesa y la resolvemos con then
//alter true
db.sync({force: false})//devuelve una promesa
.then(()=> console.log('Base de datos sincronizada'))
.catch((error)=> console.log(error))

app.get('/', (req, res)=> {
  res.status(200).json({message: 'Bienvenido al servidor'});
})

//definir las rutas de nuestros endpoints (de ahor adelante ep endpoints)
//para todas las consultas de usuarion 
// locahost:8000/users ->todo para usuarios
//localhost:8000/todos -> todo para tareas

//GET a /users
app.get('/users', async(req, res)=>{
try{
//vamos a obtener el resultado de consultar a todos los usuarios de la DB
const result = await Users.findAll(); //SELECT * FROM users;
res.status(200).json(result);
}catch(error){
  console.log(error);
}
});
//Obtener un usuario sabiendo su id
app.get("/users/:id", async (req, res) => {
  try {
    //console.log(req.params);
    const { id } = req.params;
    const result = await Users.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

// obtener un usuario por username
app.get("/users/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await Users.findOne({ where: { username } }); // SELECT * FROM users WHERE username = iannacus
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//Creando usuario
app.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const result = await Users.create(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
});

//actualizar un usuario, solo podemos cambiar password 
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // { id: 2 }
    const field = req.body;
    const result = Users.update(field, {
      where: { id },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


//eliminar un usuario -> id
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.destroy({
      where: { id },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//Obtener todas las Tareas 
app.get('/todos', async(req, res)=>{
  try{
  //vamos a obtener el resultado de consultar a todos los usuarios de la DB
  const result = await Todos.findAll(); //SELECT * FROM users;
  res.status(200).json(result);
  }catch(error){
    console.log(error);
  }
  });
//Obtener Tarea sabiendo su id
app.get("/todos/:id", async (req, res) => {
  try {
    //console.log(req.params);
    const { id } = req.params;
    const result = await Todos.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//Creando nuevo todo
app.post("/todos", async (req, res) => {
  try {
    const user = req.body;
    const result = await Todos.create(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
});

//actualizar todo, solo podemos cambiar propiedad isCompleted 
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // { id: 2 }
    const field = 'is_complete';
    const result = Todos.update(field, {
      where: { id },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//eliminar una tarea -> id
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todos.destroy({
      where: { id },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// /users/1, users/2....
app.listen(PORT, ()=>{
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})

//vamos a terminar los modelos -> rapuido