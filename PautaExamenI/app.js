const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

const libros = [{"id":1,"titulo":"La comunidad del anillo","autor":"Jrr tolkien","anioPublicacion":1955,"estado":"Disponible"}]

app.get("/libros",(req,res)=>{
    res.json({status:200,message:'Success',data:libros});

});

app.post("/libros",(req,res)=>{
const{titulo,autor,anioPublicacion,estado} = req.body;

if( titulo && autor && anioPublicacion && estado){
    const nuevoLibro = {
        id: libros.length + 1,
        titulo,
        autor,
        anioPublicacion,
        estado
     }
}

libros.push(nuevoLibro);
res.json({status:201,message:'Libro agregado',data:nuevoLibro});
})

app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}/`);
});