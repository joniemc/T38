const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000; 

app.use(express.json());

function obtenerProductos(){
    const data = fs.readFileSync('productos.json','utf-8');
    return JSON.parse(data);
}

function guardarProducto(productos){
    fs.writeFileSync('productos.json',JSON.stringify(productos,null,2));
}

// Crear una función para generar el ID incremental

app.get('/productos',(req, res)=>{
    
    const productos = obtenerProductos();
    return res.status(200).json({status:200, message:'Success', data:productos});
    
});

app.post('/productos',(req,res)=>{
    const producto = req.body;
    let productos = obtenerProductos();
    //agregar validaciones: que no pueda ingresar un producto con el mismo id
    //hazcer uso de la función que genera ID autoincremental
    productos.push(producto);
    guardarProducto(productos);
    return res.status(201).json({status:201,message:'Resgistro exitoso'});
});

app.put('/productos',(req, res)=>{
    const producto = req.body;
    //agregar validaciones, el id que se desea modificar debe existir
    //Completar el PUT
    res.status(200).json({status:200,message:'Success',data:producto.id});
});

//Completar el DELETE
//Agregar validaciones

app.listen(PORT, ()=>{
    console.log(`El servidor escucha en http://localhost:${PORT}`);
});