var express = require('express');
var ControlTarea = require('./controlador/tarea');
var bodyParser = require('body-parser');
var autenticacion = require('./controlador/autenticacion');

var middleware = require('./middleware/auth');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log('Servidor corriendo en puerto 3005');
});

app.get('/',(req,res)=>{
    res.status(200).send({message : 'Index'});
});

app.get('/tareas',ControlTarea.mostrarTareas);
app.get('/tareas/:idTarea',middleware.isAuth,ControlTarea.mostrarTarea);
app.post('/tareas',middleware.isAuth,ControlTarea.insertarTarea);
app.put('/tareas/:idTarea',middleware.isAuth,ControlTarea.modificarTarea);
app.delete('/tareas/:idTarea',ControlTarea.eliminarTarea);
app.post('/registrar',autenticacion.registrar);
app.put('/tareas/finalizar/:idTarea',ControlTarea.finalizarTarea);
app.get('/login',(req,res)=>{
    res.send({mensaje:"Acceso permitido",usuario : req.payload});
});

//app.post('/login',autenticacion.ingresar);
